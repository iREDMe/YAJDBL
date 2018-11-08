const ConnectionHandler = require('./WebSocket/ConnectionHandler');

const Collection = require('./Util/Collection');
const Request = require('./Rest/Request');

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
         * @type {Collection}
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
         * @type {Collection}
         */

        this.guilds = new Collection();

        /**
         * @type {Object} The options for the HTTP/Rest to interact with Discord
         */

        this.http = options.httpOptions || {};

        /**
         * The API Version to use
         * @type {Number} The number of the Version to use for the REST Api
         */

        this.http.version = this.http.version || 7;

        /**
         * Base Url of the API
         * @type {String} The base URL of Discord's API
         */

        this.http.api = this.http.api || `https://discordapp.com/api/v${this.http.version}`;

        /**
         * Base Url of CDN
         * @type {String} The base URL of Discord's Images (CDN)
         */

        this.http.cdn = this.http.cdn || 'https://cdn.discordapp.com';

        /**
         * Base Url of Invites
         * @type {String} The base URL of Discord Invites
         */

        this.http.invite = this.http.invite || 'https://discord.gg';

        /**
         * The REST API Handler for this Library
         * @type {Function}
         */

        this.rest = new Request(this);

        /**
         * The Users Collection
         * @type {Collection}
         */

        this.users = new Collection();

        /**
         * Websocket Options
         * @type {Object}
         */

        this.wsOptions = options.wsOptions || {};

        /**
         * Wheter or not to fetch all guild members
         * @type {Boolean}
         */

        this.wsOptions.fetchAllMembers = this.wsOptions.fetchAllMembers || false;

        /**
         * Timeout for the guildCreate event to be fired
         * @type {Number}
         */

        this.wsOptions.guildCreateTimeout = this.wsOptions.guildCreateTimeout || 200;
    }

    /**
     * Makes the bot connect to the Gateway with Token
     * @param {String} token The bot token
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
};

module.exports = Client;