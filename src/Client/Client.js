const ConnectionHandler = require('../WebSocket/ConnectionHandler');

const Collection = require('../Util/Collection');
const Request = require('../Rest/Request');

/**
 * @class
 * @example
 * new Client(
 * {
 *     disableEveryone: true,
 *     wsOptions:
 *     {
 *         fetchAllMembers: true
 *     }
 * });
 * @param {Object} options Client Options
 * @param {Boolean} options.disableEveryone Whether or not to disable everyone mention
 * @param {Object} options.http HTTP Options
 * @param {Number} options.http.version Discord REST API Version to use
 * @param {String} options.http.api The base URL of Discord's API
 * @param {String} options.http.cdn The base URL of Discord's CDN
 * @param {String} options.http.invite The Base URL of Discord's Invites
 * @param {Object} options.wsOptions The options of Discord's Websocket
 * @param {Boolean} options.wsOptions.fetchAllMembers Whether or not to fetch all members ( Will take longer )
 */

class Client extends ConnectionHandler
{
    constructor(options = {})
    {
        super(options);

        /**
         * The client's Token
         */

        this.token = null;

        /**
         * The Channels Collection
         */

        this.channels = new Collection();

        /**
         * The Client
         */

        this.client = this;

        /**
         * This will disable Mentions for the bot.
         * @example
         * <Message>.channel.send('@everyone');
         * // This would disable the mention for "@everyone"
         */

        this.disableEveryone = options.disableEveryone || false;

        /**
         * The Guilds Collection
         */

        this.guilds = new Collection();

        /**
         * HTTP Options
         */

        this.http = options.httpOptions || {};

        /**
         * The API Version to use
         */

        this.http.version = this.http.version || 7;

        /**
         * Base Url of the API
         */

        this.http.api = this.http.api || `https://discordapp.com/api/v${this.http.version}`;

        /**
         * Base Url of CDN
         */

        this.http.cdn = this.http.cdn || 'https://cdn.discordapp.com';

        /**
         * Base Url of Invites
         */

        this.http.invite = this.http.invite || 'https://discord.gg';

        /**
         * The REST API Handler for this Library
         */

        this.rest = new Request(this);

        /**
         * The Users Collection
         */

        this.users = new Collection();

        /**
         * Websocket Options
         */

        this.wsOptions = options.wsOptions || {};

        /**
         * Wheter or not to fetch all guild members
         */

        this.wsOptions.fetchAllMembers = this.wsOptions.fetchAllMembers || false;

        /**
         * Timeout for the guildCreate event to be fired
         */

        this.wsOptions.guildCreateTimeout = this.wsOptions.guildCreateTimeout || 200;
    }

    /**
     * Makes the bot connect to the Gateway with Token
     * @param {String} token The bot token
     * @example
     * // Require the package
     * const Discord = require('YAJDBL');
     * const client = new Discord.Client();
     *
     * client.login('YOUR BOT TOKEN');
     *
     * client.on('ready', () =>
     * {
     *     console.log(`Logged in as ${client.user.tag}`);
     * });
     */

    login(token)
    {
        this.token = token;
        this.connect(token);
    }

    /**
     * Disconnects the Client from Discord
     */

    disconnect()
    {
        this.ws.close();
        return process.exit(0);
    }

    /**
     * Prints something to the console
     * @param {String} message The message to log
     * @example
     * <Client>.print('Logged In!');
     * // Will Return: [2018-11-18 05:41:29]: Logged in!
     */

    print(message)
    {
        var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

        return console.log(`[${date}]: ${message}`);
    }
};

module.exports = Client;
