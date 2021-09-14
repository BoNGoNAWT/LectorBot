const { stripIndents } = require("common-tags");
const { MessageEmbed } = require("discord.js");
const { category } = require("../info/info");

module.exports = {
    name: "report",
    aliaases: ["репорт", "р", "r"],
    category: "moderation",
    description: "Подать жалобу на пользователя",
    usage: "< mention | id>",
    run: async (client, msg, args) => {
        msg.delete();
        let user = msg.mentions.users.first();
        if (!user) return msg.reply('Укажите тег');

        var member;

        try {
            member = await msg.guild.members.fetch(user);
        }catch(err){
            member = null;
        }

        if (!member) return msg.reply('Такого пользователя нет на сервере.');

        var reason = args.splice(1).join(' ');
        if(!reason) return msg.reply('Укажите причину!');

        var channel = msg.guild.channels.cache.find(c => c.name === "репорты");

        var log = new MessageEmbed()
        .setColor("#ff0000")
        .setTimestamp()
        .setFooter(msg.author.tag, msg.author.displayAvatarURL({dynamic: true}))
        .setThumbnail(user.displayAvatarURL({dynamic: true}))
        .setTitle('report')
        .addField('Жалоба на:', user.tag, user.id, true)
        .addField('Причина:', reason)
        channel.send(log);
    }
}