const { DEFAULTAVATARS } = require('../Util/Constants');
const ENDPOINTS = require('../Rest/Endpoints');
require('../Util/Prototypes');

/**
 * @class User
 */

class User
{
    constructor(client, data)
    {
        Object.defineProperty(this, '_client', { value: client });

        /**
         * The user's avatar
         */

        this.avatar = data.avatar;

        /**
         * The user's avatar URL
         */

        this.avatarURL = null;

        /**
         * The user's default Avatar
         */

        this.defaultAvatar = DEFAULTAVATARS[data.discriminator % DEFAULTAVATARS.length];

        /**
         * The user's default Avatar url
         */

        this.defaultAvatarURL = `https://discordapp.com/assets/${this.defaultAvatar}.png`;

        /**
         * User's discriminator
         */

        this.discriminator = data.discriminator;

        /**
         * User's ID
         */

        this.id = data.id;

        /**
         * User's tag
         */

        this.tag = `${data.username}#${this.discriminator}`;

        /**
         * User's Username
         */

        this.username = data.username;

        /**
         * Add a check for the avatarURL if it is the default or not
         */

        if (!this.avatar)
        {
            this.avatar = this.defaultAvatar;
            this.avatarURL = this.defaultAvatarURL;
        }
        else {
            this.avatarURL = `${this._client.http.cdn}/avatars/${this.id}/${this.avatar}`;
        }
    }

    /**
     * This will create a DM Channel between the client and the user
     */

    createDM()
    {
        return this._client.rest.request("POST", ENDPOINTS.USER_CHANNELS(this._client.http.api, '@me'),
        {
            data:
            {
                recipient_id: this.id
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
     * Send a message to the User
     * @param {String} content The content you will send
     * @param {Options} options The options for the message
     * @param {EmbedObject} options.embed The {@link https://google.com|Options for the embed}
     */

    async send(content, options)
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

        var channel = await this.createDM();

        return this._client.rest.request("POST", ENDPOINTS.CHANNEL_MESSAGES(this._client.http.api, channel.id),
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
};

module.exports = User;
