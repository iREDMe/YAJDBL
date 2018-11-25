/**
 * @class Here's an example on how to use YAJDBL
 */

class Example
{
    constructor()
    {}

    /**
     * This is a simple Ping Command!
     * @example
     * const yajdbl = require('yajdbl');
     * const client = new yajdbl.client();
     * 
     * client.on('ready', () =>
     * {
     *     client.print(`Logged in as ${client.user.tag}!`);
     * });
     * 
     * client.on('message', (message) =>
     * {
     *     if (message.content === 'ping')
     *     {
     *         message.channel.send(`*Pinging...*`).then(m => m.edit(`Pong! Roundtrip took: ${m.createdTimestamp - message.createdTimestamp}ms`));
     *     }
     * });
     * 
     * client.login('BOT TOKEN');
     */

    ping()
    {}

    /**
     * This is a simple Ping Pong Command!
     * @example
     * const yajdbl = require('yajdbl');
     * const client = new yajdbl.client();
     * 
     * client.on('ready', () =>
     * {
     *     client.print(`Logged in as ${client.user.tag}!`);
     * });
     * 
     * client.on('message', (message) =>
     * {
     *     if (message.content === 'ping')
     *     {
     *         message.reply('pong!');
     *     }
     * });
     * 
     * client.login('BOT TOKEN');
     */

    ping_pong()
    {}

    /**
     * This is an example on how to use a ban command
     * @example
     * const yajdbl = require('yajdbl');
     * const client = new yajdbl.Client();
     *
     * client.on('ready', () =>
     * {
     *    client.print(`Logged in as ${client.user.tag}`);
     * });
     *
     * client.on('message', (message) =>
     * {
     *     if (message.content.startsWith('!ban'))
     *     {
     *         if (message.member.hasPermission('banMembers')) return message.reply('You lack the permissions to ban!');
     * 
     *         var user = message.mentions[0];
     * 
     *         if (!user) return message.channel.send('No user was specified');
     * 
     *         message.guild.ban(user.id).then(u =>
     *         {
     *             message.channel.send(`Banned ${u.tag}!`)
     *         });
     *     }
     * });
     * 
     * client.login('BOT TOKEN');
     */

    ban()
    {}

    /**
     * This is an example on how to use a kick command
     * @example
     * const yajdbl = require('yajdbl');
     * const client = new yajdbl.Client();
     *
     * client.on('ready', () =>
     * {
     *    client.print(`Logged in as ${client.user.tag}`);
     * });
     *
     * client.on('message', (message) =>
     * {
     *     if (message.content.startsWith('!kick'))
     *     {
     *         if (message.member.hasPermission('kickMembers')) return message.reply('You lack the permissions to kick!');
     * 
     *         var user = message.mentions[0];
     * 
     *         if (!user) return message.channel.send('No user was specified');
     * 
     *         message.guild.kick(user.id).then(u =>
     *         {
     *             message.channel.send(`Kicked ${u.tag}!`)
     *         });
     *     }
     * });
     * 
     * client.login('BOT TOKEN');
     */

    kick()
    {}
};

module.exports = Example