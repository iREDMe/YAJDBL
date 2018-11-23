/**
 * @class Represents an Unavailable Guild
 */

class UnavailableGuild
{
    constructor(client, data)
    {
        Object.defineProperty(this, '_client', { value: client });

        /**
         * Whether or not the Guild is available
         */

        this.available = !data.unavailable;

        /**
         * Guild ID
         */
        
        this.id = data.id;
    }
};

module.exports = UnavailableGuild;
