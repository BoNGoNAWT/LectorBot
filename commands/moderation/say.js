const { UserManager, MessageEmbed } = require("discord.js");

module.exports = {
    name: "say",
    aliaases: ["bc", "broadcast"],
    category: "moderation",
    description: "Написать от имени бота",
    usage: "<imput>",
    run: async (client, message, args) => {
        message.delete();

        if (!message.member.hasPermission("MANAGE_MESSAGES"))
            return message.reply("You don't have the required permissions to use this command.").then(m => m.delete(5000));

        if (args.length < 1)
            return message.reply("Nothing to say?").then(m => m.delete(5000));

        const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;

        if (args[0].toLowerCase() === "embed") {
            const embed = new MessageEmbed()
                .setColor(roleColor)
                .setDescription(args.slice(1).join(" "))
            message.channel.send(embed);
        } else {
            message.channel.send(args.join(" "));
        }
    }
}