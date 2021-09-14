var { Discord, MessageEmbed } = require("discord.js");
var ms = require("ms");


module.exports = {
    name: "mute",
    aliaases: ["tm", "tmute"],
    category: "moderation",
    descripption: "Временный мут",
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

        if (!member) return msg.reply('Данного ползователя нет на сервере');
        if(member.hasPermission('MANAGE_MESSAGES')) return msg.reply('У данного пользователя имунитет!');

        var rawTime = args[1];
        var time = ms(rawTime);
        if (!time) return msg.reply('Укажите время');


        var reason = args.splice(2).join(' ');
        if(!reason) return msg.reply('Укажите причину!');

        var channel = msg.guild.channels.cache.find(c => c.name === "наказания");
        var using = msg.guild.channels.cache.find(c => c.name === "команды");

        var log2 = new MessageEmbed()
        .setColor('RED')
        .setTimestamp()
        .setAuthor('Использована комманда MUTE', 'https://i.imgur.com/P9NXVWd.gif')
        .addField('Использовал команду:', msg.author.tag)
        .setFooter(`DARK SIDE`, msg.guild.iconURL({dynamic: true}))
        using.send(log2);


        var log = new MessageEmbed()
        .setColor("RED")
        .setTimestamp()
        .setAuthor('Выдана блокировка сообщений','https://i.pinimg.com/originals/d0/30/3d/d0303d5c9194efdfafdd6d5cd49329ac.gif')
        .setFooter(msg.author.tag, msg.author.displayAvatarURL({dynamic: true}))
        .setThumbnail(user.displayAvatarURL({dynamic: true}))
        .addField('Информация о наказании:', `Предупрежден: ${user} \nВыдал наказание: ${msg.author.tag} \nПричина: ${reason} \nВремя наказания: ${ms(time)}`)
        channel.send(log);


        var role = msg.guild.roles.cache.find(r => r.name === 'Безмолвие');

        member.roles.add(role);

        setTimeout(async() => {
            member.roles.remove(role);

            var unmute = new MessageEmbed()
            .setColor('BLUE')
            .setTimestamp()
            .setAuthor(`Срок наказания истёк`, 'http://24.media.tumblr.com/6413df74acc18da04085d684347a1c91/tumblr_mxtpjcbJoM1sbjscfo1_400.gif')
            .setDescription(`Наказание снято с пользователя ${user}`)
            .setFooter('DARK SIDE | Надеюсь он юольше не будете нарушать', msg.guild.iconURL({dynamic: true}))
            msg.channel.send(unmute);

        }, time);

        var emb = new MessageEmbed()
        .setColor("RED")
        .setAuthor('Выдана блокировка сообщений','https://i.pinimg.com/originals/d0/30/3d/d0303d5c9194efdfafdd6d5cd49329ac.gif')
        .setFooter(`DARK SIDE | Модератор: ${msg.author.tag}`, msg.guild.iconURL({dynamic: true}))
        .addField('Информация о наказании:', `Наказан: ${user} \nПричина: ${reason} \nВремя наказания: ${ms(time)}`)
        .setThumbnail(user.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        msg.channel.send(emb);

        var embed = new MessageEmbed()
        .setColor("#ff0000")
        .setAuthor('Выдана блокировка сообщений','https://i.pinimg.com/originals/d0/30/3d/d0303d5c9194efdfafdd6d5cd49329ac.gif')
        .addField('Информация о наказании:', `Выдал наказание: ${msg.author.tag} \nПричина: ${reason} \nВремя наказания: ${ms(time)}`)
        .setFooter('DARK SIDE | просим вас больше не нарушать', msg.guild.iconURL({dynamic: true}))
        .setTimestamp()
        user.send(embed);
    }
}