const ENDPOINTS = require('../Rest/Endpoints');

/**
 * @class Represents a Message
 */

class Message
{
    constructor(client, data, channel, guildID)
    {
        Object.defineProperty(this, '_client', { value: client });

        /**
         * The Message ID.
         */
        
        this.id = data.id;

        /**
         * The channel the message is sent in.
         */

        this.channel = channel;

        /**
         * The time the message was created
         */

        this.createdAt = data.timestamp;

        /**
         * The timestamp the message was created
         */

        this.createdTimestamp = new Date(data.timestamp).getTime();

        /**
         * The time the message was edited
         */

        this.editedAt = data.edited_timestamp;

        /**
         * The timestamp the message was created
         */

        this.editedTimestamp = new Date(data.edited_timestamp).getTime() || null;

        /**
         * The author of the message
         */

        this.author = this._client.users.get(data.author.id);


        /*
         * The guild the message was sent it
         */

        this.guild = this._client.guilds.get(guildID) || null;

        if (this.guild)
        {

            /**
             * The guild member
             */
        
            this.member = this.guild.members.get(this.author.id);
        }

        /**
         * The message content
         */

        this.content = data.content;

        /**
         * An array of message embed object
         */

        this.embeds = data.embeds;

        /**
         * An array of user mentions
         */

        this.mentions = data.mentions;

        /**
         * An array of reaction objects
         */

        this.reactions = data.reactions || [];

        /**
         * Whether or not this message mentioned everyone
         */

        this.everyone = data.mention_everyone;

        /**
         * The webhook that sent this message
         */

        this.webhookID = data.webhook_id || null;
    }
    
    /**
     * Deletes a message
     * @param {Number} [timeout=0] The amount of ms to delete the message
     * @returns {Promise<Message>}
     */

    delete(timeout = 0)
    {
        setTimeout(() =>
        {
            return this._client.rest.request("DELETE", ENDPOINTS.CHANNEL_MESSAGE(this.channel.id, this.id),
            {
                headers:
                {
                    Authorization: `Bot ${this._client.token}`
                }
            }).then(() =>
            {
                return this;
            });
        }, timeout);
    }

    /**
     * Edits a message
     * @param {String} content The content of the Message
     * @param {Object} [options={}] The options for the embed
     * @param {Object} [options.embed] The embed options for the Message
     * @returns {Promise<Message>}
     */

    edit(content, options)
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

        return this._client.rest.request("PATCH", ENDPOINTS.CHANNEL_MESSAGE(this.channel.id, this.id),
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
        }).then(() =>
        {
            return this;
        });
    }

    /**
     * Pins a message
     * @return {Promise<Message>}
     */

    pin()
    {
        this._client.rest.request("PUT", ENDPOINTS.CHANNEL_PIN_MESSAGES(this.channel.id, this.id),
        {
            headers:
            {
                Authorization: `Bot ${this._client.token}`
            }
        }).then(res =>
        {
            return this;
        });
    }

    /**
     * Replies to the User
     * @param {String} content The content you will send
     * @param {Options} [options={}] The options for the message
     * @param {EmbedObject} options.embed The {@link https://google.com|Options for the embed}
     * @returns {Promise<Message>}
     */

    reply(content, options)
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

        return this._client.rest.request("POST", ENDPOINTS.CHANNEL_MESSAGES(this.channel.id),
        {
            data:
            {
                content: typeof content === 'string' ? `${this.author.mention}, ${content}` : content,
                embed: options.embed
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
     * Unpins a message
     * @return {Promise<Message>}
     */

    unpin()
    {
        this._client.rest.request("DELETE", ENDPOINTS.CHANNEL_PIN_MESSAGES(this.channel.id, this.id),
        {
            headers:
            {
                Authorization: `Bot ${this._client.token}`
            }
        }).then(res =>
        {
            return this;
        });
    }
};

module.exports = Message;