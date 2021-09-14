const { Client, Collection, MessageEmbed } = require("discord.js");

const prefix = "!";

const client = new Client({
    disableEveryone: true,
    partials: ["MESSAGE", "CHANNEL", "REACTION"]
})

client.commands = new Collection();
client.aliases = new Collection();

/*config({
    path: __dirname + "/.env"
});*/

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online!`);
    client.user.setStatus("online");
    client.user.setActivity("в пустоту", {type: "WATCHING"});
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

client.on("messageReactionAdd", async (reaction, user) => {
    if(reaction.message.id == '798911162829242399'){
        const { guild }= reaction.message
        const role1 = guild.roles.cache.find((role) => role.name === 'light')
        const role2 = guild.roles.cache.find((role) => role.name === 'dark')
        const member = guild.members.cache.find((member) => member.id === user.id)

        if(reaction.emoji.name == 'light'){
            member.roles.remove(role2)
            member.roles.add(role1)

            console.log('done');

        }
        if(reaction.emoji.name == 'dark') {
            member.roles.remove(role1)
            member.roles.add(role2)

            console.log('done');
        }
    }else{
        return;
    }
})

client.on("message", async message => {

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
    if (msg.author.bot) return;
    if (msg.content.startsWith(prefix)) return;
    if(!msg.partial){
        const chan = client.channels.cache.get('881218172206866573');
        if(chan) {
            const embed = new MessageEmbed()
            .setColor("#ff9900")
            .setFooter(msg.guild.name, msg.guild.iconURL())
            .setTitle('Message Delete')
            .addField('Автор:', msg.author.tag)
            .addField('Канал:', msg.channel.name)
            .addField('Сообщение:', msg.content)
            .setThumbnail(msg.author.displayAvatarURL())
            .setTimestamp()
        chan.send(embed);
        }
    }
});

client.login(process.env.TOKEN);
