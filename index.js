const { Client, Collection, MessageEmbed, Permissions } = require("discord.js");
const voiceCollection = new Collection();
var ms = require("ms");
const quick = require('quick.db');

const prefix = "!";
const userLinkMap = new Map();
const client = new Client({
    disableEveryone: true,
    partials: ["MESSAGE", "CHANNEL", "REACTION"]
})

client.commands = new Collection();
client.aliases = new Collection();


["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online!`);
    client.user.setStatus("online");
    client.user.setActivity("в пустоту", {type: "WATCHING"});
});


client.on("message", async message => {
    if (message.channel.id === "874254762659442759"){
        if (message.content.startsWith(prefix) || message.content.startsWith('.')) return;
        if (!message.author.bot) message.delete();
        const idea = new MessageEmbed()
        .setColor('PURPLE')
        .setTimestamp()
        .setFooter('DARK SIDE', message.guild.iconURL({dinamic: true}))
        .setAuthor(`Идея от ${message.author.nametag}`, message.author.displayAvatarURL({dinamic: true}))
        .addField('Идея:', message.content)
        message.channel.send(idea)
        .then(function (message) {
            message.react("👍")
            message.react("👎")
        });
    }
    if (message.channel.id === "829380781063143504") {
        message.react("❤️");
    }
    if (message.channel.id === "774526646564159521") {
        message.react("❤️");
    }
    if(message.content.includes("discord.gg/") || message.content.includes("https://") || message.content.includes("http://") || message.content.includes('www.')){
        if(message.member.hasPermission('ADMINISTRATOR')) return;
        if(message.content.includes('https://tenor.com/') || message.content.includes('https://media.discordapp.net/')) return;
        if(message.channel.id === '625787338240426014') return;
        if(message.channel.id === '779613306922729472'){
            if(message.content.includes('https://www.youtube.com/' || message.content.includes('www.youtube.com/'))) return;
        }
        if(message.channel.id === '887614602106503198'){
            if(message.content.includes('https://www.youtube.com/') || message.content.includes('www.youtube.com/')) return;
            if(message.content.includes('https://www.twitch.tv/' || message.content.includes('www.twitch.tv/'))) return;
        }
        message.delete()
        var role = message.guild.roles.cache.find(r => r.id === '882974229316923434');
        var channel = message.guild.channels.cache.find(c => c.name === "реклама");

        const r = new MessageEmbed()
        .setColor('RED')
        .setTimestamp()
        .setTitle('На данном сервере запрещена реклама!')
        .setAuthor('Была обнаружена реклама', 'https://static.wikia.nocookie.net/spongebob/images/4/4e/Cryingsquidward.gif/revision/latest?cb=20160331060206')
        .addField('Информация:', `Имя пользователя: ${message.author.mention}`)
        .setThumbnail(message.author.displayAvatarURL({dinamic: true}))
        .setFooter(`DARK SIDE | Если наказание было выдано по ишибке - обратитесь к Администратору`, message.guild.iconURL({dynamic: true}))
        message.channel.send(r).then(message => {
            message.delete({ timeout: 10000 })
          })
          .catch(console.error);
    
        const emb = new MessageEmbed()
        .setColor('RED')
        .setAuthor('Была обнаружена реклама', 'https://static.wikia.nocookie.net/spongebob/images/4/4e/Cryingsquidward.gif/revision/latest?cb=20160331060206')
        .addField('Информация:', `Имя пользователя; ${message.author.tag} \nID: ${message.author.id} \nРекламное сообщение: ${message.content}`)
        .setThumbnail(message.author.displayAvatarURL({dinamic: true}))
        channel.send(emb);

        message.member.roles.add(role);
        setTimeout(async() => {
            message.member.roles.remove(role);
        }, 30*60000);
        
    }

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) 
        command.run(client, message, args);

});


client.on('messageDelete', msg =>{
    if (msg.content.includes("discord.gg/") || msg.content.includes("https://") || msg.content.includes("http://") || msg.content.includes('www.')) return;
    if (msg.author.bot) return;
    if (msg.content.startsWith(prefix) || msg.content.startsWith('.')) return;
    if(!msg.partial){
        const chan = client.channels.cache.get('881218172206866573');
        
        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setFooter('DARK SIDE', msg.guild.iconURL())
        .setAuthor('Сообщение было удалено', 'https://img1.dreamies.de/img/337/b/siprzx5ihdp.gif')
        .addField('Информация:', `Автор: ${msg.author.tag} \nКанал: ${msg.channel.name} \nСообщение: ${msg.content}`)
        .setThumbnail('http://images4.fanpop.com/image/photos/19600000/SpongeBob-and-Patrick-happy-square-sponge-19674613-150-100.gif')
        .setTimestamp()
        chan.send(embed);
    }
});

client.on('messageUpdate', async(oldMessage, newMessage) =>{
    if (oldMessage.author.bot) return;
    if (oldMessage.content.includes("discord.gg/") || oldMessage.content.includes("https://") || oldMessage.content.includes("http://") || oldMessage.content.includes('www.')) return;
    const chan = client.channels.cache.get('881218172206866573');
    const embed1 = new MessageEmbed()
            .setColor("RANDOM")
            .setFooter('DARK SIDE', oldMessage.guild.iconURL())
            .setThumbnail('http://images4.fanpop.com/image/photos/19600000/SpongeBob-and-Patrick-happy-square-sponge-19674613-150-100.gif')
            .setAuthor('Сообщение было изменено', 'https://img1.dreamies.de/img/337/b/siprzx5ihdp.gif')
            .addField('Информация:', `Автор: ${oldMessage.author.tag} \nКанал: ${oldMessage.channel.name} \nСтарое сообщение: ${oldMessage.content} \nНовое сообщене: ${newMessage.content} \nСообщение: ${oldMessage.url}`)
            .setTimestamp()
            await chan.send(embed1);
});

client.on('guildMemberAdd', async member => {

    let role = member.guild.roles.cache.get('838291222271229953');
    await member.roles.add(role);


    let log = new MessageEmbed()
    .setColor('BLUE')
    .setTimestamp()
    .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
    .setAuthor('К нам присоединился еще один потрясающий человек!', 'https://i.gifer.com/origin/64/64d36849f206dd058f1ca53ee2216d7d_w200.gif')
    .addField(`Информация о пользователе:`, `Тег: <@${member.user.id}> \nДата создания аккаунта: ${member.user.createdAt} \nID: ${member.user.id}`)
    .setFooter(`DARK SIDE | На сервере ${member.guild.memberCount} воинов`, member.guild.iconURL({dynamic: true}))
    member.guild.channels.cache.get('887360711087521803').send(log);

    let j = new MessageEmbed()
    .setColor('#082215')
    .setTimestamp()
    .setThumbnail('https://i.gifer.com/origin/64/64d36849f206dd058f1ca53ee2216d7d_w200.gif')
    .setAuthor('К нам присоединился еще один потрясающий человек!', 'https://i.gifer.com/origin/64/64d36849f206dd058f1ca53ee2216d7d_w200.gif')
    .addField(`Поприветствуем нового друга!`, `Новый воин: <@${member.user.id}> \nСпонсор сервера: <#760452201755181106> \nСообщить о нарушителе: !report`)
    .setFooter(`DARK SIDE | На сервере ${member.guild.memberCount} воинов`, member.guild.iconURL({dynamic: true}))
    member.guild.channels.cache.get("580777505057931285").send(j).then(msg => {
        msg.delete({ timeout: 10000 })
      })
      .catch(console.error);
});

client.on('guildMemberRemove', async member => {
    let log = new MessageEmbed()
    .setColor('RED')
    .setTimestamp()
    .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
    .setAuthor('Нас покинули ;(', 'https://66.media.tumblr.com/tumblr_macxcpSHgz1rfjowdo1_500.gif')
    .addField(`Информация о пользователе:`, `Тег: <@${member.user.id}> \nID: ${member.user.id}`)
    .setFooter(`DARK SIDE | На сервере ${member.guild.memberCount} воинов`, member.guild.iconURL({dynamic: true}))
    member.guild.channels.cache.get('887360711087521803').send(log);
});

client.on('voiceStateUpdate', async(oldState, newState) =>{
    const user = await client.users.fetch(newState.id);
    const member = newState.guild.member(user);

    if (!oldState.channel && newState.channel) {
        var startTime = Date.now();

        let checkBase = quick.fetch(`voiceTime.${newState.member.id}`);
        if(checkBase == null) quick.set(`voiceTime.${newState.member.id}`, startTime);
    }else if (!newState.channel) {
        var endTime = Date.now();

        let checkBase = quick.fetch(`voiceTime.${oldState.member.id}`);
        if(checkBase == null) return;

        let time = Math.floor(endTime - checkBase);

        quick.set(`voiceTime.${oldState.member.id}`, time);
    }

    if(!oldState.channel && newState.channel.id === '888335683746418718'){
        const channel = await newState.guild.channels.create(`🌑| логово ${user.tag}`, {
            type: 'voice',
            parent: newState.channel.parent,
        });
        member.voice.setChannel(channel);
        voiceCollection.set(user.id, channel.id);
    } else if(!newState.channel) {
        if(oldState.channelID === voiceCollection.get(newState.id)) return oldState.channel.delete();
    }
});

client.login(process.env.TOKEN);
