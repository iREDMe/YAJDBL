const GuildChannel = require('./GuildChannel');
const ENDPOINTS = require('../Rest/Endpoints');

/**
 * Represents a TextChannel
 * @extends GuildChannel
 */

class TextChannel extends GuildChannel
{
    constructor(client, data)
    {
        super(client, data);

        /**
         * The channel topic
         */

        this.topic = data.topic;

        /**
         * The channel type ( Text )
         */

        this.type = 'text';

        /**
         * Whether the channel is nsfw or not
         */

        this.isNSFW = data.nsfw;

        /**
         * The last Message ID
         */

        this.lastMessageID = data.last_message_id;
    }

    /**
     * Creates a Channel Webhook
     * @param {Object} options Options for the Webhook
     * @param {String} options.name Name of the Webhook
     * @param {String} options.avatar [Avatar data](https://discordapp.com/developers/docs/resources/user#avatar-data)
     * @returns {Promise<Webhook>}
     */

    createWebhook(options = {})
    {
        return this._client.rest.request("POST", ENDPOINTS.CHANNEL_WEBHOOKS(this.id),
        {
            data:
            {
                name: options.name || null,
                avatar: options.avatar
            },

            headers:
            {
                Authorization: `Bot ${this._client.token}`
            }
        }).then(res =>
        {
            return res.data;
        });
    }

    /**
     * Edits the current channel
     * @param {Object} options Options for the new channel
     * @param {String} options.name The name of the channel
     * @param {Number} [options.position] The new position of the channel
     * @param {String} [options.topic] The new topic of the Channel
     * @param {Boolean} [options.isNSFW] Whether or not the Channel will be NSFW
     * @param {Number} [options.rateLimitPerUser] Amount of seconds a user has to wait before sending another message (0-120)
     * @param {Snowflake} [options.parentID] The new Parent(Category) ID
     * @returns {Promise<TextChannel>}
     */

    edit(options = {})
    {
        return this._client.rest.request("PATCH", ENDPOINTS.CHANNELS(this.id),
        {
            data:
            {
                name: options.name || null,
                position: options.position,
                topic: options.topic,
                nsfw: options.isNSFW,
                rate_limit_per_user: options.rateLimitPerUser,
                parent_id: options.parentID
            },

            headers:
            {
                Authorization: `Bot ${this._client.token}`
            }
        }).then(() =>
        {
            return this;
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
            return res.data;
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
        return this._client.rest.request("GET", `${ENDPOINTS.CHANNEL_MESSAGES(this.id)}?limit=${options.limit || 50}&before=${options.before || null}&after=${options.after || null}&around=${options.around || null}`,
        {
            headers:
            {
                Authorization: `Bot ${this._client.token}`
            }
        }).then(res =>
        {
            return res.data;
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
            return res.data;
        });
    }

    /**
     * Pins a single Message
     * @param {String} messageID The ID of the message to pin
     */

    pin(messageID)
    {
        this._client.rest.request("PUT", ENDPOINTS.CHANNEL_PIN_MESSAGES(this.id, messageID),
        {
            headers:
            {
                Authorization: `Bot ${this._client.token}`
            }
        }).then(res =>
        {
            return res.data;
        });
    }

    /**
     * Send a message to the User
     * @param {String} content The content you will send
     * @param {Options} options The options for the message
     * @param {EmbedObject} options.embed The {@link https://google.com|Options for the embed}
     * @returns {Promise<Message>}
     */

    send(content, options)
    {
        if (typeof content === 'object' && !options)
        {
            options = content;
            content = null;
        };

        if (!options) options = {};

        // We add a check if it's a string because mentions on embeds doesn't work
        if (this._client.disableEveryone && typeof content === 'string')
        {
            content = content.replaceAll('@everyone', '@\u200beveryone').replaceAll('@here', '@\u200bhere');
        };

        return this._client.rest.request("POST", ENDPOINTS.CHANNEL_MESSAGES(this.id),
        {
            data:
            {
                content: content,
                embed: options.embed
            },

            headers:
            {
                Authorization: `Bot ${this._client.token}`
            }
        }).then(res =>
        {
            return res.data;
        });
    }

    /**
     * Unpins a single Message
     * @param {String} messageID The ID of the message to unpin
     */

    unpin(messageID)
    {
        this._client.rest.request("DELETE", ENDPOINTS.CHANNEL_PIN_MESSAGES(this.id, messageID),
        {
            headers:
            {
                Authorization: `Bot ${this._client.token}`
            }
        }).then(res =>
        {
            return res.data;
        });
    }
};

module.exports = TextChannel;
