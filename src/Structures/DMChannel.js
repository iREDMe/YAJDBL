const Channel = require('./Channel');
const Collection = require('../Util/Collection');
const Constants = require('../Util/Constants');
const Message = require('./Message');
const ENDPOINTS = require('../Rest/Endpoints');

/**
 * Represents a DM Channel
 * @extends Channel
 */

class DMChannel extends Channel
{
    constructor(client, data)
    {
        super(client, data);
        Object.defineProperty(this, '_client', { value: client });

        /**
         * The id of the DM Channel
         */

        this.id = data.id;

        /**
         * The type of the Channel
         */

        this.type = Constants.CHANNEL_TYPE[data.type];

        /**
         * The id of the last message sent
         */

        this.lastMessageID = data.last_message_id;

        /**
         * A Collection of DM Recipients
         */
        this.recipients = new Collection();

        data.recipients.forEach(user =>
        {
            this.recipients.set(user.id, this._client.users.get(user.id));
        });
    }

    /**
     * Gets a single message in the channel
     * @param {String} messageID The message id to fetch
     * @returns {Promise<Message>}
     */

    fetchMessage(messageID)
    {
        return this._client.rest.request("GET", ENDPOINTS.CHANNEL_MESSAGE(this.id, messageID),
        {
            headers:
            {
                Authorization: `Bot ${this._client.token}`
            }
        }).then(res =>
        {
            return new Message(this._client, res.data, this, this.guildID);
        });
    }

    /**
     * 
     * @param {Object} options Query parameters to pass in
     * @param {Number} [options.limit=50] The limit of messages to get `2 - 100`
     * @param {String} [options.before] ID of a message to get the messages that were posted before it
     * @param {String} [options.after] ID of a message to get the messages that were posted after it
     * @param {String} [options.around] ID of a message to get the messages that were posted around it
     * @returns {Promise<Array<Message>>}
     */

    fetchMessages(options = {})
    {
        var query = [];

        if (options.before && typeof options.before === 'string')
        {
            query.push(`&before=${options.before}`)
        }

        if (options.after && typeof options.after === 'string')
        {
            query.push(`&after=${options.after}`)
        }

        if (options.around && typeof options.around === 'string')
        {
            query.push(`&around=${options.around}`)
        }

        return this._client.rest.request("GET", `${ENDPOINTS.CHANNEL_MESSAGES(this.id)}?limit=${options.limit || 50}${query.join('')}`,
        {
            headers:
            {
                Authorization: `Bot ${this._client.token}`
            }
        }).then(res =>
        {
            return res.data.map(r =>
            {
                return new Message(this._client, r, this, this.guildID);
            });
        });
    }

    /**
     * Fetches all the Pinned Messages in the Channel
     * @returns {Promise<Array<Message>>}
     */

    fetchPinnedMessages()
    {
        return this._client.rest.request("GET", ENDPOINTS.CHANNEL_PINNED_MESSAGES(this.id),
        {
            headers:
            {
                Authorization: `Bot ${this._client.token}`
            }
        }).then(res =>
        {
            return res.data.map(r =>
            {
                return new Message(this._client, r, this, this.guildID);
            });
        });
    }
};

module.exports = DMChannel;