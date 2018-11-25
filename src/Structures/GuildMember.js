const Collection = require('../Util/Collection');
const Permissions = require('../Util/Permissions');

/**
 * @class Represents a GuildMember
 */

class GuildMember
{
    constructor(client, data, guild)
    {
        Object.defineProperty(this, '_client', { value: client });

        /**
         * The user object of the Member
         */

        this.user = this._client.users.get(data.user.id);

        /**
         * The guild the Member is in
         */

        this.guild = guild;

        /**
         * A collection of roles that the Member has
         */

        this.roles = new Collection();

        /**
         * An array of role IDs
         * @readonly
         * @private
         */

        Object.defineProperty(this, '_roleArray', { value: [] });

        data.roles.map(role =>
        {
            var roles = this.guild.roles.get(role);
            this.roles.set(roles.id, roles);

            this._roleArray.push(roles.id, role);
        });
    }

    /**
     * Adds a user a role
     * @param {String} role The role id
     * @returns {Promise<GuildMember>}
     */

    addRole(role)
    {
        return this.guild.addRole(this.user.id, role);
    }

    /**
     * Bans a guild member
     * @param {String} days The amount of days to delete the message of the user
     * @param {String} reason Ban reason
     * @returns {Promise<GuildMember>}
     */

    ban(days, reason)
    {
        return this.guild.ban(this.user.id, { days: days, reason: reason });
    }

    /**
     * Kicks a User
     * @returns {Promise<GuildMember>}
     */

    kick()
    {
        return this.guild.kick(this.user.id);
    }

    /**
     * The permission Class
     * @returns {Permissions}
     */

    get permission()
    {
        return new Permissions(this.guild.owner.id === this.user.id ? 8 : this.roles.reduce((acc, val) => acc | val.permissions, 0));
    }

    /**
     * Checks if the member has the Specified Permission or not
     * @param {String<Permission>} key The permission to check
     */

    hasPermission(key)
    {
        return new Permissions(this.guild.owner.id === this.user.id ? 8 : this.roles.reduce((acc, val) => acc | val.permissions, 0)).has(key);
    }

    /**
     * Removes a role from a user
     * @param {String} role The role id
     * @returns {Promise<GuildMember>}
     */

    removeRole(role)
    {
        return this.guild.removeRole(this.user.id, role);
    }

    /**
     * Softbans a user
     * @param {String} [reason] The reason of the softban
     * @returns {Promise<GuildMember>}
     */

    softban(reason)
    {
        return this.guild.softban(this.user.id, reason);
    }

    /**
     * Unbans a member
     * @returns {Promise<GuildMember>}
     */

    unban()
    {
        return this.guild.unban(this.user.id);
    }
};

module.exports = GuildMember;