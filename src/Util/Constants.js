module.exports =
{
    /* Gateway */
    GATEWAY_URL: 'wss://gateway.discord.gg/',
    GATEWAY_VERSION: 6,

    /* Opcodes */
    OPCODES:
    {
        dispatch: 0,
        heartbeat: 1,
        identify: 2,
        statusUpdate: 3,
        /* Not Used Yet
        voiceStatusUpdate: 4,
        voiceServerPing: 5,*/
        resume: 6,
        reconnect: 7,
        requestGuildMembers: 8,
        invalidSession: 9,
        hello: 10,
        heartbeatAck: 11
    },

    /* Gateway Close Error Codes */
    GATEWAY_CLOSE:
    {
        unknownError: 4000,
        unknownOPCode: 4001,
        decodeError: 4002,
        notAuthenticated: 4003,
        authenticationFailed: 4004,
        alreadyAuthenticated: 4005,
        invalidSequence: 4006,
        rateLimited: 4007,
        sessionTimeout: 4008,
        invalidShard: 4009,
        shardingRequired: 4011
    },

    /* Websocket Errors */
    WEBSOCKET_ERROR:
    {
        exists: "Websocket is already Connected!",
        doesntExists: "Websocket doesn't exist!",
        closed: "Socket hang up",
        ready: "Websocket hang up before firing ready"
    },

    /* Channel Types */
    CHANNEL_TYPE:
    [
        "text",
        "dm",
        "voice",
        "group",
        "category"
    ],

    /* Default Avatar Hashes */
    DEFAULTAVATARS:
    [
        "6debd47ed13483642cf09e832ed0bc1b",
        "322c936a8c8be1b803cd94861bdfa868",
        "dd4dbc0016779df1378e7812eabaa04d",
        "0e291f67c9274a1abdddeb3fd919cbaa",
        "1cbd08c76f8af6dddce02c5138971129"
    ],

    /* Text Permissions */
    TEXT_PERMISSIONS: {
        createInstantInvite: 0x00000001,
        manageChannels: 0x00000010,
        manageWebhooks: 0x20000000,
        readMessages: 0x00000400,
        sendMessages: 0x00000800,
        manageMessages: 0x00002000,
        embedLinks: 0x00004000,
        attachFiles: 0x00008000,
        readMessageHistory: 0x00010000,
        externalEmojis: 0x00040000,
        addReactions: 0x00000040
    }
};
