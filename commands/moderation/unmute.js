var { Discord, MessageEmbed } = require("discord.js");
var ms = require("ms");


module.exports = {
    name: "unmute",
    category: "moderation",
    descripption: "снятие мута",
    run: async (client, msg, args) => {
        msg.delete();
        if (!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.reply('вы не можете использовать данную команду!');

        var user = msg.mentions.users.first();
        if (!user) return msg.reply('Укажите тег');

        var member;

        try {
            member = await msg.guild.members.fetch(user);
        }catch(err){
            member = null;
        }

        if (!member) return msg.reply('Данного ползователя нет на сервере');

        var role = msg.guild.roles.cache.find(r => r.name === 'muted');
        var channel = msg.guild.channels.cache.find(c => c.name === "наказания");


        member.roles.remove(role);

        var log = new MessageEmbed()
        .setColor("#ff0000")
        .setTimestamp()
        .setFooter(msg.author, msg.author.displayAvatarURL())
        .setThumbnail(user.displayAvatarURL())
        .setTitle('User Unmuted')
        .addField('Розмьючен:', user, true)
        channel.send(log);
    }
}