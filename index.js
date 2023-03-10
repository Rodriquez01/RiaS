const { Client, GatewayIntentBits, Partials } = require("discord.js");
const config = require("./config.js");
const db = require("croxydb")
const client = new Client({
  partials: [
    Partials.Message, // for message
    Partials.Channel, // for text channel
    Partials.GuildMember, // for guild member
    Partials.Reaction, // for message reaction
    Partials.GuildScheduledEvent, // for guild events
    Partials.User, // for discord user
    Partials.ThreadMember, // for thread member
  ],
  intents: [
    GatewayIntentBits.Guilds, // for guild related things
    GatewayIntentBits.GuildMembers, // for guild members related things
    GatewayIntentBits.GuildBans, // for manage guild bans
    GatewayIntentBits.GuildEmojisAndStickers, // for manage emojis and stickers
    GatewayIntentBits.GuildIntegrations, // for discord Integrations
    GatewayIntentBits.GuildWebhooks, // for discord webhooks
    GatewayIntentBits.GuildInvites, // for guild invite managing
    GatewayIntentBits.GuildVoiceStates, // for voice related things
    GatewayIntentBits.GuildPresences, // for user presence things
    GatewayIntentBits.GuildMessages, // for guild messages things
    GatewayIntentBits.GuildMessageReactions, // for message reactions things
    GatewayIntentBits.GuildMessageTyping, // for message typing things
    GatewayIntentBits.DirectMessages, // for dm messages
    GatewayIntentBits.DirectMessageReactions, // for dm message reaction
    GatewayIntentBits.DirectMessageTyping, // for dm message typinh
    GatewayIntentBits.MessageContent, // enable if you need message content things
  ],
});

global.client = client;
client.commands = (global.commands = []);
//#region KOMUTLAR LOAD
fs.readdir("./commands/", (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
    
        client.commands.push({
             name: props.name.toLowerCase(),
             description: props.description,
             options: props.options,
             type: props.type,
        })
        console.log(`???? Slash Komut Y??klendi: ${props.name}`);
    });
});


module.exports = client;

require("./events/message.js")
require("./events/ready.js")
client.on("guildMemberAdd", async member => {
  const moment = require('moment')
   let aylar = {
           "01": "Ocak",
           "02": "??ubat",
           "03": "Mart",
           "04": "Nisan",
           "05": "May??s",
           "06": "Haziran",
           "07": "Temmuz",
           "08": "A??ustos",
           "09": "Eyl??l",
           "10": "Ekim",
           "11": "Kas??m",
           "12": "Aral??k"
   }
   let endAt = member.user.createdAt
   let g??n = moment(new Date(endAt).toISOString()).format('DD')
   let ay = moment(new Date(endAt).toISOString()).format('MM').replace("01", "Ocak").replace("02","??ubat").replace("03","Mart").replace("04", "Nisan").replace("05", "May??s").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "A??ustos").replace("09", "Eyl??l").replace("10","Ekim").replace("11","Kas??m").replace("12","Aral??k")
   let y??l =  moment(new Date(endAt).toISOString()).format('YYYY')
   let saat = moment(new Date(endAt).toISOString()).format('HH:mm')
   let kurulu?? = `${g??n} ${ay} ${y??l} ${saat}`
   let kanal = db.fetch(`gckanal_${member.guild.id}`)
   let kay??tl?? = db.fetch(`normalkay??t${member.guild.id}`)
   member.guild.members.cache.get(member.id).roles.add(kay??tl??)
   client.channels.cache.get(kanal).send(`${member} Seni aram??zda g??rmekten mutluluk duyuyoruz!\n\nSunucumuza kat??lan **${member.guild.memberCount}.** ??yesin.\n\nHesab??n **${kurulu??}** tarihinde kurulmu??tur.\n\nSunucumuzun kurallar??n?? okumay?? unutma iyi e??lenceler.`)
})
client.login(process.env.RiaS)
