const Collection = require('../Util/Collection');

class Guild
{
    constructor(client, data)
    {
        Object.defineProperty(this, '_client', { value: client });

        this.name = data.name;
        this.icon = data.icon || null;
        this.splash = data.splash || null;
        this.ownerID = data.owner_id;
        this.owner = this._client.users.get(this.ownerID);
        this.region = data.region;
        this.afkTimeout = data.afk_timeout;
        this.verificationLevel = data.verification_level;
        this.messageNotifications = data.default_message_notifications;
        this.large = data.large;
        this.lazy = data.lazy;
        this.explicitContentFilter = data.explicit_content_filter;
        this.mfaLevel = data.mfa_level;
        this.available = !data.unavailable;
        this.memberCount = data.member_count;
        this.joinedAt = Date.parse(data.joined_at);
        this.features = data.features;
        this.id = data.id;

        /* Collections */
        this.channels = new Collection();
        this.members = new Collection();

        data.channels.forEach(channel =>
        {
            this._client.channels.set(channel.id, channel);
        });

        data.members.forEach(member =>
        {
            member.guild = this;
            this.members.set(member.user.id, member);
            this._client.users.set(member.user.id, member.user);
        });
    }
};

module.exports = Guild;