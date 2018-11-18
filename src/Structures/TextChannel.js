const GuildChannel = require('./GuildChannel');

class TextChannel extends GuildChannel
{
    constructor(client, data)
    {
        super(client, data);
    }

    /**
     * Send a message to the User
     * @param {String} content The content you will send
     * @param {Options} options The options for the message
     * @param {EmbedObject} options.embed The {@link https://google.com|Options for the embed}
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

        return this._client.rest.request("POST", ENDPOINTS.CHANNEL_MESSAGES(this._client.http.api, this.id),
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

module.exports = TextChannel;
