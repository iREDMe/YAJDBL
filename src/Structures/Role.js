const ENDPOINTS = require('../Rest/Endpoints');

/**
 * @class Represents a guild role
 */

class Role
{
    constructor(client, data, guild)
    {
        Object.defineProperty(this, '_client', { value: client });

        /**
         * The role ID
         */

        this.id = data.id;

        /**
         * The role Name
         */

        this.name = data.name;

        /**
         * The role Color
         */

        this.color = data.color;

        /**
         * If true, users that are part of this role will appear in a separate category in the users list
         */

        this.hoist = data.hoist;

        /**
         * The position of the Role
         */

        this.position = data.position;

        /**
         * Permissions for the Role
         */

        this.permissions = data.permissions;

        /**
         * The guild the role is in
         */

        this.guild = guild;

        /**
         * Whether or not the role is mentionable
         */

        this.mentionable = data.mentionable;

        if (this.mentionable)
        {
            /**
             * The mention for the role
             */
            
            this.mention = `<@&${this.id}>`
        }
    }

    /**
     * The hexColor of the role
     * @readonly
     */

    get hexColor()
    {
        let color = this.color.toString(16);

        while (color < 6) color = `0${color}`;
        return `#${color}`
    }

    /**
     * Deletes a role
     * @returns {Promise<Role>}
     */

    delete()
    {
        return this._client.rest.request("DELETE", ENDPOINTS.GUILD_ROLE(this.guild.id, this.id),
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
     * Edits the role, for permissions, [click here](https://discordapi.com/permissions.html) to calculate permissions
     * @param {Object} [options={}] The options for the Role
     * @param {String} [options.name] The new name of the role
     * @param {Number|String} [options.color] The new color of the Role
     * @param {Number} [options.permissions] The new permissions of the Role
     * @param {Boolean} [options.hoist] Whether the role should be displayed separately in the sidebar 
     * @param {Boolean} [options.mentionable] Whether the role should be mentionable
     * @returns {Promise<Role>}
     */

    edit(options = {})
    {
        if (options.color && typeof options.color === "string")
        {
            var hex = options.color.substring(1);
            var decimal = "0x" + hex;

            options.color = parseInt(decimal.substring(2), 16)
        }

        return this._client.rest.request("DELETE", ENDPOINTS.GUILD_ROLE(this.guild.id, this.id),
        {
            data:
            {
                name: options.name || this.name,
                permissions: options.permissions || this.permissions,
                color: options.color || this.color,
                hoist: options.hoist || this.hoist,
                mentionable: options.mentionable || this.mentionable
            }
        }).then(res =>
        {
            return this;
        });
    }
};

module.exports = Role;