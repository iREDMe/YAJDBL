let EventEmitter = require("events").EventEmitter;

const WebSocket = require("ws");
const { GATEWAY_URL, GATEWAY_VERSION, GATEWAY_CLOSE, OPCODES, WEBSOCKET_ERROR } = require('../Util/Constants');

/* Structures */
const ClientUser = require('../Structures/ClientUser');
const User = require('../Structures/User');
const UnavailableGuild = require('../Structures/UnavailableGuild');
const Guild = require('../Structures/Guild');
const Message = require('../Structures/Message');

class ConnectionHandler extends EventEmitter
{
    constructor()
    {
        super();

        this.ws = new WebSocket(`${GATEWAY_URL}/?v=${GATEWAY_VERSION}&encoding=json`);
    }

    /**
     * Connects to the Gateway
     * @param {String} token The client's token
     */

    connect(token)
    {
        this.onError();
        return this.onMessage(token);
    }

    /**
     * Sends heartbeats to the Gateway
     * @param {Number} time The amount of time in ms to make an interval when heartbeating
     * @param {String} token The client's token
     */

    heartbeat(time, token)
    {
        setInterval(() =>
        {
            this.send({ op: OPCODES.heartbeat, d: null });
        }, time)

        this.send({
            op: OPCODES.identify,
            d:
            {
                token: token,
                properties:
                {
                    $os: process.platform,
                    $browser: 'YAJDBL',
                    $device: 'YAJDBL'
                }
            }
        });
    }

    /**
     * Detects if the client has received an event
     * @param {Object} packet The packet data
     */

    onEvent(packet)
    {
        this.seq = packet.s;

        switch (packet.t)
        {
            case 'READY':
                this.client.user = new ClientUser(this.client, packet.d.user);

                packet.d.guilds.forEach(g =>
                {
                    this.client.guilds.set(g.id, new UnavailableGuild(this.client, g));
                });

                this.guildLength = packet.d.guilds.length;
                break;

            case 'MESSAGE_CREATE':
                packet.d = new Message(this, packet.d, this.channels.get(packet.d.channel_id), this.guilds.get(packet.d.guild_id))

                this.emit('message', packet.d);
                break;

            case 'GUILD_CREATE':
                this.guild = new Guild(this.client, packet.d);
                this.client.guilds.set(this.guild.id, this.guild);

                this.guildLength  = this.guildLength - 1;

                if (this.client.wsOptions.fetchAllMembers)
                {
                    this.fetchAllMembers(
                    {
                        guildID: this.guild.id
                    });
                }

                if (this.guildLength === 0)
                {
                    this.emit('ready');
                };

                this.emit('guildCreate', this.guild);
                break;

            case 'GUILD_MEMBERS_CHUNK':
                var guild = this.client.guilds.get(packet.d.guild_id);

                packet.d.members.forEach(m =>
                {
                    guild.members.set(m.user.id, m);
                });

                this.client.guilds.set(guild.id, guild);

                this.emit('guildMembersChunk');
                break;

            case 'ERROR':
                this.emit('error', packet.d);
                break;
        }
    }

    /**
     * Detects if the client received a message
     * @param {String} token The client's token
     */

    onMessage(token)
    {
        this.ws.addEventListener("message", (event) =>
        {
            const packet = JSON.parse(event.data);

            switch (packet.op)
            {
                case OPCODES.dispatch:
                    this.onEvent(packet)
                    break;

                case OPCODES.hello:
                    this.heartbeat(packet.d.heartbeat_interval, token);
                    break;
            }
        });
    }

    /**
     * Sends data to the Gateway
     * @param {Object} data The data to send to the Gateway
     */

    send(data)
    {
        this.ws.send(JSON.stringify(data));
    }

    /**
     * Fetches all members on the Guild
     * @param {Object} options The options on getting all Members
     */

    fetchAllMembers(options = {})
    {
        return this.send(
        {
            op: OPCODES.requestGuildMembers,
            d:
            {
                guild_id: options.guildID,
                query: options.query || "",
                limit: options.limit || 0
            }
        });
    }

    /**
     * Listens for errors, then emits it in the error event
     */

    onError()
    {
        this.ws.onclose = (event) =>
        {
            switch (event.code)
            {
                case GATEWAY_CLOSE.unknownError:
                    this.emit('error', new Error(`Unknwon error: ${event.reason ? event.reason : ''}`))
                    break;

                case GATEWAY_CLOSE.unknownOPCode:
                    this.emit('error', new Error('Gateway received an unknown opcode'));
                    break;

                case GATEWAY_CLOSE.decodeError:
                    this.emit('error', new Error('Gateway received an invalid message'));
                    break;

                case GATEWAY_CLOSE.notAuthenticated:
                    this.emit('error', new Error('Client not authenticated'));
                    break;

                case GATEWAY_CLOSE.authenticationFailed:
                    this.emit('error', new Error('Client authentication failed'));
                    break;

                case GATEWAY_CLOSE.alreadyAuthenticated:
                    this.emit('error', new Error('Client already authenticated'));
                    break;

                case GATEWAY_CLOSE.invalidSequence:
                    this.emit('error', new Error(`Invalid Sequence number: ${this.seq}`));
                    this.seq = 0;
                    break;

                case GATEWAY_CLOSE.rateLimited:
                    this.emit('error', new Error('Gateway is being rate limited'));
                    break;

                case 1005:
                    this.emit('debug', 'Gateway connection was closed');
                    break;
            };
        };
    }
};

module.exports = ConnectionHandler;
