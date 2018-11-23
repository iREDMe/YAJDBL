module.exports =
{
    /* User */
    USER: (userID) => `users/${userID}`,
    USER_CHANNELS: (userID) => `users/${userID}/channels`,
    USERS: `users`,

    /* Channels */
    CHANNELS: (channelID) => `channels/${channelID}`,
    CHANNEL_INVITES: (channelID) => `channels/${channelID}/invites`,
    CHANNEL_MESSAGE: (channelID, messageID) => `channels${channelID}/messages/${messageID}`,
    CHANNEL_MESSAGES: (channelID) => `channels/${channelID}/messages`,
    CHANNEL_PIN_MESSAGES: (channelID, messageID) => `channels/${channelID}/pins/${messageID}`,
    CHANNEL_PINNED_MESSAGES: (channelID) => `channels/${channelID}/pins`,
    CHANNEL_WEBHOOKS: (channelID) => `channels/${channelID}/webhooks`,
    CHANNEL_TYPING: (channelID) => `channels/${channelID}/typing`,

    /* Guild */
    GUILD_BAN: (guildID, userID) => `guilds/${guildID}/bans${userID}`,
    GUILD_BANS: (guildID) => `guilds/${guildID}/bans`,
    GUILD_CHANNELS: (guildID) => `guilds/${guildID}/channels`,
    GUILD_INVITES: (guildID) => `guilds/${guildID}/invites`,
};
