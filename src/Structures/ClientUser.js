const User = require('./User');

class ClientUser extends User
{
    constructor(client, data)
    {
        super(client, data);
        Object.defineProperty(this, '_client', { value: client });

        this.email = data.email || null;
        this.verified = !!data.verified;
        this.mfa = !!data.mfa_enabled;
        this.guilds = this._client.guilds;
    }
};

module.exports = ClientUser;