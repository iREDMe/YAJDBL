const ENDPOINTS = require('../Rest/Endpoints');
const CONSTANTS = require('../Util/Constants');
const Channel = require('./Channel');

/**
 * Represents a Guild Channel
 * @extends Channel
 */

class GuildChannel extends Channel
{
    constructor(client, data)
    {
        super(client, data);
        Object.defineProperty(this, '_client', { value: client });

        /**
         * The Position of the Channel
         */

        this.position = data.position;

        /**
         * An array of permission Overwrites
         */

        this.permissionOverwrites = data.permission_overwrites;

        /**
         * The Channel Name
         */

        this.name = data.name;

        /**
         * The channel topic
         */

        this.topic = data.topic;

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
     * Creates an Invite
     * @returns {Promise<Invite>}
     * @param {Object} options Invite Options
     * @param {Number} options.maxAge Duration of the Invite in seconds before expiration
     * @param {Number} options.maxUses The max uses for the Invite, 0 for unlimited
     * @param {Boolean} options.temporary Whether this invite only grants temporary membership
     * @param {Boolean} options.unique if true, don't try to reuse a similar invite (useful for creating many unique one time use invites)
     * @example
     * <Channel>.createInvite({ maxAge: 0 })
     *     .then(inv => console.log(inv))
     *     .catch(console.error);
     */

    createInvite(options = {})
    {
        return this._client.res.request("POST", ENDPOINTS.CHANNEL_INVITES(this._client.http.api, this.id),
        {
            data:
            {
                max_age: options.maxAge || 86400,
                max_uses: options.maxUses || 0,
                temporary: options.temporary || false,
                unique: options.unique || false
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
     * Deletes a Guild Channel
     * @returns {Promise<Channel>}
     * @example
     * <Channel>.delete()
     *     .then(channel => console.log(`Deleted ${channel.name}`))
     *     .catch(console.error);
     */

    delete()
    {
        return this._client.rest.request("DELETE", ENDPOINTS.CHANNELS(this._client.http.api, this.id),
        {
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
     * Edits the Guild Channel
     * @returns {Promise<Channel>}
     * @param {Object} options The options for the Channel
     * @param {String} options.name The new channel Name
     * @param {Number} options.position The new Channel position
     * @param {String} options.topic The new channel Topic
     * @param {Boolean} options.isNSFW Whether or not the channel will be NSFW
     */

    edit(options = {})
    {
        return this._client.rest.request("PATCH", ENDPOINTS.CHANNELS(this._client.http.api, this.id),
        {
            data:
            {
                name: options.name || this.name,
                position: options.position || this.position,
                topic: options.topic || this.topic,
                nsfw: options.isNSFW || this.isNSFW
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
     * Fetches the an array of Invites for the Channel
     * @returns {Promise<Array<Object>>}
     * @example
     * <Channel>.fetchInvites()
     *     .then(invites => console.log(invites))
     *     .catch(console.error);
     */

    fetchInvites()
    {
        return this._client.rest.request("GET", ENDPOINTS.CHANNEL_INVITES(this._client.http.api, this.id),
        {
            Authorization: `Bot ${this._client.token}`
        }).then(res =>
        {
            return res.data;
        });
    }

    /**
     * Edit permissions for the Channel
     * @returns {Promise<Channel>}
     * @param {Object} Options for the Permissions
     * @param {Array} options.overwrites An array of permission overwrites
     */

    overwritePermissions(options = {})
    {
        options.overwrites.forEach(perms =>
        {
            if (perms.allow)
            {
                var perm = CONSTANTS.TEXT_PERMISSIONS[perms.allow];

                perms.allow = perm;
                return this._client.rest.request("PATCH", ENDPOINTS.CHANNELS(this._client.http.api, this.id),
                {
                    data:
                    {
                        permission_overwrites: options.overwrites
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
            else if (perms.deny)
            {
                var perm = CONSTANTS.TEXT_PERMISSIONS[perms.deny];

                perms.deny = perm;
                return this._client.rest.request("PATCH", ENDPOINTS.CHANNELS(this._client.http.api, this.id),
                {
                    data:
                    {
                        permission_overwrites: options.overwrites
                    },

                    headers:
                    {
                        Authorization: `Bot ${this._client.token}`
                    }
                }).then(() =>
                {
                    return this;
                });
            };
        });
    }

    /**
     * Sets the new Channel name
     * @param {String} name The new Channel Name
     * @example
     * <Channel>.setName('new_name')
     *     .then(channel => console.log(`New name is ${channel.name}`))
     *     .catch(console.error);
     */

    setName(name)
    {
        return this._client.rest.request("PATCH", ENDPOINTS.CHANNELS(this._client.http.api, this.id),
        {
            data:
            {
                name: options.name
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

module.exports = GuildChannel;
