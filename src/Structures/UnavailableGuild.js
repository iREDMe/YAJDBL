class UnavailableGuild
{
    constructor(client, data)
    {
        Object.defineProperty(this, '_client', { value: client });

        this.available = !data.unavailable;
    }
};

module.exports = UnavailableGuild;