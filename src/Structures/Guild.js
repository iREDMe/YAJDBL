const Collection = require('../Util/Collection');
const ENDPOINTS = require('../Rest/Endpoints');
const TextChannel = require('./TextChannel');
const GuildChannel = require('./GuildChannel');
const GuildMember = require('./GuildMember');
const User = require('./User');
const Role = require('./Role');

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

        /**
         * A collection of Guild Roles
         */

        this.roles = new Collection();

        data.roles.forEach(role =>
        {
            this.roles.set(role.id, new Role(this._client, role, this));
        });

        data.channels.forEach(channel =>
        {
            if (channel.type === 0)
            {
                this._client.channels.set(channel.id, new TextChannel(this._client, channel, data));
                this.channels.set(channel.id, new TextChannel(this._client, channel, data));
            }
            else {
                this.channels.set(channel.id, new GuildChannel(this._client, channel, data));
                this._client.channels.set(channel.id, new GuildChannel(this._client, channel, data));
            }
        });

        data.members.forEach(member =>
        {
            this._client.users.set(member.user.id, new User(this._client, member.user));
            this.members.set(member.user.id, new GuildMember(this._client, member, this));

            /**
             * The guild Owner
             */

            this.owner = this._client.users.get(data.owner_id);
        });
    }

    /**
     * Adds a user a role
     * @param {String} user The id of the user
     * @param {String} role The role id
     * @returns {Promise<GuildMember>}
     */

    addRole(user, role)
    {
        return this._client.rest.request("PUT", ENDPOINTS.GUILD_MEMBER_ROLE(this.id, user, role),
        {
            headers:
            {
                Authorization: `Bot ${this._client.token}`
            }
        }).then(() =>
        {
            return this.members.get(user);
        });
    }

    /**
     * Bans a guild member
     * @param {String} user The user ID of the member to ban
     * @param {Object} options Ban options
     * @returns {Promise<GuildMember>}
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
            return this.members.get(user);
        });
    }

    /**
     * Modify this guild.
     * @param {GuildUpdateData} [data] Guild update options/data
     * @returns {Promise<Guild>}
     */
    edit(data = {})
    {
        let resolvedData = {};

        if (data.name) resolvedData.name = data.name;

        if (data.region) resolvedData.region = data.region;

        if (typeof data.verificationLevel !== 'undefined') resolvedData.verification_level = Number(data.verificationLevel);
        
        if (typeof data.afkChannelId !== 'undefined') resolvedData.afk_channel_id = data.afkChannelId;
        
        if (typeof data.systemChannelId !== 'undefined') resolvedData.system_channel_id = data.systemChannel;
        
        if (data.afkTimeout) resolvedData.afk_timeout = Number(data.afkTimeout);
        
        if (typeof data.icon !== 'undefined') resolvedData.icon = data.icon;
        
        if (data.ownerId) resolvedData.owner_id = data.ownerId;
        
        if (data.splash) resolvedData.splash = data.splash;
        
        if (typeof data.explicitContentFilter !== 'undefined') resolvedData.explicit_content_filter = Number(data.explicitContentFilter);

        return this._client.rest.request('PATCH', ENDPOINTS.GUILDS(this.id),
        {
            data: resolvedData,
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
     * Creates a channel
     * @param {Object} options Options for creating a channel
     * @param {String} options.name The name of the Channel
     * @param {String} options.type The type of the Channel
     * @param {Array} options.overwrites An array of Permission Overwrites
     * @returns {Promise<GuildChannel>}
     */

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
     * @returns {Promise<Array<Bans>>}
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
     * @returns {Promise<Array<Invites>>}
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

    /**
     * Fetches a member inside the guild
     * @param {String} user The ID of the Member to get
     * @returns {Promise<Member>}
     */

    fetchMember(user)
    {
        return this._client.rest.request("GET", ENDPOINTS.GUILD_MEMBER(this.id, user),
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
     * Fetches Guild Members
     * @param {Object} options The options for fetching the Guild Members
     * @param {Number} [options.limit=1] The limit of members to fetch
     * @param {String} [options.after=null] The highest user id in the previous page
     * @returns {Promise<Array<Members>>}	
     */

    fetchMembers(options = {})
    {
        return this._client.rest.request("GET", `${ENDPOINTS.GUILD_MEMBERS(this.id)}?limit=${options.limit || 1}&after=${options.after || null}`,
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
     * Fetch available voice regions.
     * @returns {Promise<Array<VoiceRegions>>}
     */

    fetchVoiceRegions()
    {
        return this._client.rest.request("GET", ENDPOINTS.GUILD_REGIONS(this.id),
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
     * Kicks a User
     * @param {String} user The id of the User to Kick
     * @returns {Promise<Member>}
     */

    kick(user)
    {
        return this._client.rest.request("DELETE", ENDPOINTS.GUILD_MEMBER(this.id, user),
        {
            headers:
            {
                Authorization: `Bot ${this._client.token}`
            }
        }).then(() =>
        {
            return this.members.get(user);
        });
    }

    /**
     * Makes the client leave the guild
     * @returns {Promise<Guild>}
     */

    leave()
    {
        return this._client.rest.request("DELETE", ENDPOINTS.USER_GUILD(this.id),
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
     * Begin a prune operation
     * @param {Number} [days=1] Number of days to prune
     * @returns {Promise<Number>}
     */

    prune(days = 1)
    {
        return this._client.rest.request("POST", `${ENDPOINTS.GUILD_PRUNE(this.id)}?days=${days}`,
        {
            headers:
            {
                Authorization: `Bot ${this._client.token}`
            }
        }).then(res =>
        {
            return res.data.pruned;
        });
    }

    /**
     * Removes a role from a user
     * @param {String} user The id of the user
     * @param {String} role The role id
     * @returns {Promise<GuildMember>}
     */

    removeRole(user, role)
    {
        return this._client.rest.request("DELETE", ENDPOINTS.GUILD_MEMBER_ROLE(this.id, user, role),
        {
            headers:
            {
                Authorization: `Bot ${this._client.token}`
            }
        }).then(() =>
        {
            return this.members.get(user);
        });
    }

    /**
     * Softbans a user
     * @param {String} user The ID of the User to softban
     * @param {String} [reason] The reason of the softban
     * @returns {Promise<GuildMember>}
     */

    async softban(user, reason)
    {
        this.ban(user, { days: 7, reason: reason });
        this.unban(user);

        return this.members.get(user);
    }

    /**
     * Unbans a member
     * @param {String} user The UserID to unban
     * @returns {Promise<GuildMember>}
     */

    unban(user)
    {
        return this._client.rest.request("DELETE", ENDPOINTS.GUILD_BAN(this.id, user),
        {
            headers:
            {
                Authorization: `Bot ${this._client.token}`
            }
        }).then(() =>
        {
            return this.members.get(user);
        });
    }
};

module.exports = Guild;