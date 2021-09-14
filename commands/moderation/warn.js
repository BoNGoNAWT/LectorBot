const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "warn",
    category: "moderation",
    descripption: "Warn",
    run: async (client, msg, args) => {
        msg.delete();
        if (!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.reply('вы не можете использовать данную команду!');
        let user = msg.mentions.users.first();
        if (!user) return msg.reply('Укажите тег');

        var member;

        try {
            member = await msg.guild.members.fetch(user);
        }catch(err){
            member = null;
        }

        if (!member) return msg.reply('Такого пользователя нет на сервере.');
        if(member.hasPermission('MANAGE_MESSAGES')) return msg.reply('Вы не можете наказать данного пользователя');
        var reason = args.splice(1).join(' ');
        if(!reason) return msg.reply('Укажите причину!');

        var channel = msg.guild.channels.cache.find(c => c.name === "наказания");
        var using = msg.guild.channels.cache.find(c => c.name === "команды");
        
        var log2 = new MessageEmbed()
        .setColor('YELLOW')
        .setTimestamp()
        .setAuthor('Использована комманда WARN', 'https://i.imgur.com/P9NXVWd.gif')
        .addField('Использовал команду:', msg.author.tag)
        .setFooter(`DARK SIDE`, msg.guild.iconURL({dynamic: true}))
        using.send(log2);


        var log = new MessageEmbed()
        .setColor("#ff0000")
        .setTimestamp()
        .setAuthor('Выдано предупреждение','https://smile-emoji.ru/wp-content/uploads/site-images/discord/20e5e17695a179a35147806b3fcf2563.gif')
        .setFooter(msg.author.tag, msg.author.displayAvatarURL({dynamic: true}))
        .addField('Информация о наказании:', `Предупрежден: ${user} \nВыдал наказание: ${msg.author.tag} \nПричина: ${reason}`)
        .setThumbnail(user.displayAvatarURL({dynamic: true}))
        channel.send(log);

        var emb = new MessageEmbed()
        .setColor("#ff0000")
        .setFooter('DARK SIDE | просим вас больше не нарушать', msg.guild.iconURL({dynamic: true}))
        .setAuthor('Вам было выдано предупреждение','https://smile-emoji.ru/wp-content/uploads/site-images/discord/20e5e17695a179a35147806b3fcf2563.gif')
        .addField('Информация о наказании:', `\nВыдал наказание: ${msg.author.tag} \nПричина: ${reason}`)
        .setThumbnail(user.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        user.send(emb);

        var embed = new MessageEmbed()
        .setColor("#ff0000")
        .setFooter(`DARK SIDE | Модератор: ${msg.author.tag}`, msg.guild.iconURL({dynamic: true}))
        .setAuthor('Выдано предупреждение','https://smile-emoji.ru/wp-content/uploads/site-images/discord/20e5e17695a179a35147806b3fcf2563.gif')
        .addField('Информация о наказании:', `Предупрежден: ${user} \nПричина: ${reason}`)
        .setThumbnail(user.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        msg.channel.send(embed);
    }
}