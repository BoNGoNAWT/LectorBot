const Discord = require("discord.js");

module.exports = {
    name: "clear",
    aliases: [ "c", "del" ],
    category: "moderation",
    descripption: "Clear",
    run: async (client, message, args) => {
        message.delete();

        if(!message.member.hasPermission("MANAGE_MESSAGE")) return message.reply("У вас недостаточно прав для использования данной команды.").then(msg => msg.delete(5000));
        if(!args[0]) return message.channel.send("Использование !clear <кол-во>").then(msg => msg.delete(5000));
        message.channel.bulkDelete(args[0]).then(() =>{
            message.channel.send(`Очищено ${args[0]} сообщений`).then(msg => msg.delete(5000));
            });
    }
}
