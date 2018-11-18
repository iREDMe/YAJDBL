module.exports =
{
    /* User */
    USER: (baseurl, userID) => `${baseurl}/users/${userID}`,
    USER_CHANNELS: (baseurl, userID) => `${baseurl}/users/${userID}/channels`,
    USERS: (baseurl) => `${baseurl}/users`,

    /* Channels */
    CHANNELS: (baseurl, channelID) => `${baseurl}/channels/${channelID}`,
    CHANNEL_INVITES: (baseurl, channelID) => `${baseurl}/channels/${channelID}/invites`,
    CHANNEL_MESSAGES: (baseurl, channelID) => `${baseurl}/channels/${channelID}/messages`,

    /* Guild */
    GUILD_BAN: (baseurl, guildID, userID) => `${baseurl}/guilds/${guildID}/bans${userID}`,
    GUILD_BANS: (baseURL, guildID) => `${baseurl}/guilds/${guildID}/bans`,
    GUILD_INVITES: (baseURL, guildID) => `${baseurl}/guilds/${guildID}/invites`
};
