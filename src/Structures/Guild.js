const Collection = require('../Util/Collection');
const ENDPOINTS = require('../Rest/Endpoints');
const TextChannel = require('./TextChannel');
const GuildChannel = require('./GuildChannel');

/**
 * @class Represents a Guild
 */

class Guild
{
    constructor(client, data)
    {
        Object.defineProperty(this, '_client', { value: client });

        /**
         * The Guild name
         */

        this.name = data.name;

        /**
         * The Guild Icon
         */

        this.icon = data.icon || null;

        /**
         * The guild splash
         */

        this.splash = data.splash || null;

        /**
         * Guild Owner ID
         */

        this.ownerID = data.owner_id;

        /**
         * Guild owner ( User Object )
         */

        this.owner = this._client.users.get(this.ownerID);

        /**
         * The Guild region
         */

        this.region = data.region;

        /**
         * The Guild AFK Timeout
         */
        this.afkTimeout = data.afk_timeout;

        /**
         * Guild verification level
         */

        this.verificationLevel = data.verification_level;

        /**
         * Guild message notification level
         */

        this.messageNotifications = data.default_message_notifications;

        /**
         * Whether the guild is large or not
         */

        this.large = data.large;
        this.lazy = data.lazy;

        /**
         * Guild explicit content filter
         */

        this.explicitContentFilter = data.explicit_content_filter;

        /**
         * Guild MFA Level
         */

        this.mfaLevel = data.mfa_level;

        /**
         * Whether the guild is available or not
         */

        this.available = !data.unavailable;

        /**
         * The Guild Member Count
         */

        this.memberCount = data.member_count;

        /**
         * The time the client user joined the guild
         */

        this.joinedAt = Date.parse(data.joined_at);

        /**
         * An array of guild Features
         */

        this.features = data.features;

        /**
         * The Guild ID
         */

        this.id = data.id;

        /* Collections */

        /**
         * A Collection of Guild Channels
         */

        this.channels = new Collection();

        /**
         * A Collection of Guild Members
         */

        this.members = new Collection();

        data.channels.forEach(channel =>
        {
            if (channel.type === 0)
            {
                this._client.channels.set(channel.id, new TextChannel(this._client, channel));
                this.channels.set(channel.id, new TextChannel(this._client, channel));
            }
            else {
                this.channels.set(channel.id, new GuildChannel(this._client, channel));
                this._client.channels.set(channel.id, new GuildChannel(this._client, channel));
            }
        });

        data.members.forEach(member =>
        {
            member.guild = this;
            this.members.set(member.user.id, member);
            this._client.users.set(member.user.id, member.user);
        });
    }

    /**
     * Bans a guild member
     * @param {String} user The user ID of the member to ban
     * @param {Object} options Ban options
     */

    ban(user, options = {})
    {
        return this._client.rest.request("PUT", `${ENDPOINTS.GUILD_BAN(this.id, user)}?delete-message-days=${options.days}&reason=${options.reason}`,
        {
            headers:
            {
                Authorization: `Bot ${this._client.token}`
            }
        }).then(() =>
        {
            return this._client.users.get(user);
        });
    }

    createChannel(options = {})
    {
        if (options.type === 'text') options.type === 0;
        if (options.type === 'voice') options.type === 2;
        if (options.type === 'category') options.type === 4;

        return this._client.rest.request("POST", ENDPOINTS.GUILD_CHANNELS(this.id),
        {
            data:
            {
                name: options.name,
                type: options.type,
                permission_overwrites: options.overwrites
            }
        })
    }

    /**
     * Fetches the guild bans of the guild
     */

    fetchBans()
    {
        return this._client.rest.request("GET", ENDPOINTS.GUILD_BANS(this.id),
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
     * Fetches invites on the Guild
     */

    fetchInvites()
    {
        return this._client.rest.request("GET", ENDPOINTS.GUILD_INVITES(this.id),
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

module.exports = Guild;
