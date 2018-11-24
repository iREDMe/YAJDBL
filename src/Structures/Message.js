const ENDPOINTS = require('../Rest/Endpoints');

/**
 * @class Represents a Message
 */

class Message
{
    constructor(client, data, channel, guild)
    {
        Object.defineProperty(this, '_client', { value: client });

        /**
         * The Message ID
         */
        
        this.id = data.id;

        /**
         * The channel the message is sent in
         */

        this.channel = channel;

        /**
         * The guild the message is sent in
         */

        this.guild = guild;

        /**
         * The timestamp the message was created
         */

        this.createdTimestamp = data.timestamp;

        /**
         * The timestamp the message was edited
         */

        this.editedTimestamp = data.edited_timestamp;

        /**
         * The author of the message
         */

        this.author = this._client.users.get(data.author.id);

        /**
         * The message content
         */

        this.content = data.content;

        /**
         * An array of message embed object
         */

        this.embeds = data.embeds;

        if (this.guild)
        {            
            /**
             * Represents the author of the message as a guild member
             */

            this.member = data.member;
            this.member.user = this.author;
        }

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

        return this._client.rest.request("POST", ENDPOINTS.CHANNEL_MESSAGE(this.channel.id, this.id),
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
};

module.exports = Message;