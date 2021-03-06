# YAJDBL
<div align="center">
  <a href="https://discordapp.com/invite/HKV8qaz"><img src="https://discordapp.com/api/guilds/515532750279933954/embed.png" alt="discord" /></a>  
  
<a href="https://nodei.co/npm/yajdbl/"><img src="https://nodei.co/npm/yajdbl.png?downloads=true&downloadRank=true&stars=true"></a>  
</div>

YAJDBL, a simple and easy to use (WIP) JavaScript library for interacting with the Discord API.

## Frequently Asked Questions
**Q**: Can I use YAJDBL now?  
**A**: Yes, you can. But, it is not a completly ready library yet, but as for now, it's stable enough to be used.

**Q**: Why YAJDBL?  
**A**: YAJDBL is a easy-to-use, powerful library and has better support.  

**Q**: What does YAJDBL stands for?  
**A**: It's simple, **Y**et **A**nother **J**avascript **D**iscord **B**ot **L**ibrary 

## Installation
**Stable**: `npm install --save yajdbl`

**Master**: `npm install --save PixelTheGreat/YAJDBL`

*Voice isn't supported yet.*

## Documentation
[Full Documentation Here!](https://yajdbl.js.org/)

## To-do list  
- [ ] Voice Support  
- [ ] Handle errors properly
- [ ] Sharding  
- [ ] Proper Disconnection Handling  
- [ ] Finish all the Structures  
- [ ] Finish all events
- [ ] REST Error Handling

## Notes
- This is not a clone of Discord.js
- Project started on November 8, 2018,  by Kevlar.
- Thanks to `Zoro#0001`, *from Plexi Development* for creating types and other contributions.
- Thanks to [boltxyz](https://github.com/boltxyz) for contributing.

## Developers
- `Kevlar`: Main Developer/Maintainer. 
- `boltxyz`: Developer/Contributor.
- `Zoro`: Typings Developer/Contributor.

## What is this?
This branch is will be a new rewrite for YAJDBL. It's because the current one is giving us so many bugs that aren't handled correctly. As both branches will be maintained. But we will mostly focus here. And also, we might merge rewrite and he current one soon.

## Example
```js  
const yajdbl = require('yajdbl');
const client = new yajdbl.Client();

client.on('ready', () =>
{
    client.print(`Logged in as ${client.user.tag}`);
});

client.on('message', (message) =>
{
    if (message.content === 'ping')
    {
        message.channel.send(`*Pinging...*`).then(m => m.edit(`Pong! Roundtrip took: ${m.createdTimestamp - message.createdTimestamp}ms`));
    }
});

client.login('BOT TOKEN');  
```
