const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "fungus",
    category: "info",
    descripption: "have a fungus",
    run: async (client, message, args) => {
        message.delete();
        let user = message.mentions.users.first();
        if (!user) return message.reply('Укажите тег');
        if(user.id === message.author.id){
            var funn = new MessageEmbed()
            .setAuthor('Грибомания', 'https://media.baamboozle.com/uploads/images/230671/1617448971_127957_gif-url.gif')
            .setDescription(`${message.author} обожрался грибов`)
            .setImage('https://i.ytimg.com/vi/pa2COtLKexg/maxresdefault.jpg')
            .setTimestamp()
            .setFooter(`DARK SIDE`, message.guild.iconURL({dynamic: true}))
            message.channel.send(funn)
        }
        if(user.id !== message.author.id){
        var fun = new MessageEmbed()
        .setAuthor('Грибомания', 'https://media.baamboozle.com/uploads/images/230671/1617448971_127957_gif-url.gif')
        .setDescription(`${message.author} подарил гриб пользователю ${user}`)
        .setImage('https://steamuserimages-a.akamaihd.net/ugc/782992988810494373/7E44E576E44B18284B5DADFA3CB55C80F4970EF8/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false')
        .setTimestamp()
        .setFooter(`DARK SIDE`, message.guild.iconURL({dynamic: true}))
        message.channel.send(fun);
        message.channel.send(`<@${user.id}>`).then(message => {
            message.delete({ timeout: 10000 })
          })
          .catch(console.error);
        }
    }
}
