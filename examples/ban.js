const yajdbl = require('yajdbl');
const client = new yajdbl.Client();

client.on('ready', () =>
{
    client.print(`Logged in as ${client.user.tag}`);
});

client.on('msg', (msg) =>
{
    if (msg.content.startsWith('!ban'))
    {
        if (msg.member.hasPermission('banMembers')) return msg.reply('You lack the permissions to ban!');

        var user = msg.mentions[0];

        if (!user) return msg.channel.send('No user was specified');

        msg.guild.ban(user.id).then(u =>
        {
            msg.channel.send(`Banned ${u.tag}!`)
        });
    }
});

client.login('BOT TOKEN');