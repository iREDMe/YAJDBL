const User = require('./User');
const { OPCODES } = require('../Util/Constants');
const { ENDPOINTS } = require('../Rest/Endpoints');

/**
 * Represents the logged in Client on Discord as a User
 * @extends User
 */

class ClientUser extends User
{
    constructor(client, data)
    {
        super(client, data);
        Object.defineProperty(this, '_client', { value: client });

        /**
         * Client's Email, or null if it's a Bot
         */

        this.email = data.email || null;

        /**
         * Whether or not the Account is Verified or not
         */

        this.verified = !!data.verified;

        /**
         * Whether or not the Client has MFA Enabled
         */


        this.mfa = !!data.mfa_enabled;

        /**
         * A collection of Guilds that the Client is in
         */
        
        this.guilds = this._client.guilds;

        this.since = null;
        this.game = null;
        this.status = "online";
        this.afk = false;
    }

    /**
     * Update the client's activity
     * @param {Object} options The options for the new user activity
     */

    setActivity(options = {})
    {
        var status = ["online", "dnd", "idle", "offline"];
        if (!status.includes(options.status) && options.status) return this._client.emit('error', new Error('Please give a proper Status!'));

        this.since = options.since || null;
        this.game = options.game || null;
        this.afk = options.afk || false;

        this._client.send(
        {
            op: OPCODES.statusUpdate,
            d:
            {
                since: this.since,
                game: this.game,
                status: this.status,
                afk: this.afk
            }
        });
    }

    /**
     * Sets the status of the Client
     * @param {String} status The new status
     */

    setStatus(status)
    {
        var statuses = ["online", "dnd", "idle", "offline"];
        if (!statuses.includes(status)) return this._client.emit('error', new Error('Please give a proper Status!'));

        this.status = status;
        this._client.send(
        {
            op: OPCODES.statusUpdate,
            d:
            {
                since: this.since,
                status: status,
                afk: this.afk,
                game: this.game
            }
        });
    }

    /**
     * Sets the user's username
     * @param {String} username New Username
     */

    setUsername(username)
    {
        if (username.includes('@') || username.includes('#') || username.includes(':') || username.includes('```') || username === 'discordtag' || username === 'everyone' || username === 'here')
        {
            return this._client.emit('error', new Error('Invalid username'));
        }

        return this._client.rest.request("PATCH", ENDPOINTS.USER(this._client.http.api, '@me'),
        {
            data:
            {
                username: username,
                avatar: null
            },

            headers:
            {
                Authorization: `Bot ${this._client.token}`
            }
        }).then(res =>
        {
            return new ClientUser(this._client, res.data);
        });
    }
};

module.exports = ClientUser;
