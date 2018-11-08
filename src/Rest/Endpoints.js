module.exports =
{
    /* User */
    USER: (baseurl, userID) => `${baseurl}/users/${userID}`,
    USER_CHANNELS: (baseurl, userID) => `${baseurl}/users/${userID}/channels`,
    USERS: (baseurl) => `${baseurl}/users`,

    /* Channels */
    CHANNEL_MESSAGES: (baseurl, channelID) => `${baseurl}/channels/${channelID}/messages`
};