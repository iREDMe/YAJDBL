const yajdbl = require('yajdbl');
const client = new yajdbl.Client();

client.on('ready', () =>
{
    client.print(`Logged in as ${client.user.tag}`);
});

client.on('message', (message) =>
{
    if (message.content.startsWith('!kick'))
    {
        var user = message.mentions[0];

        if (!user) return message.channel.send('No user was specified');

        message.guild.kick(user.id).then(u =>
        {
            message.channel.send(`Kicked ${u.tag}!`)
        });
    }
});

client.login('BOT TOKEN');