const { Discord, MessageEmbed } = require('discord.js');
const moment = require('moment');
const quick = require('quick.db');
const axios = require('axios');

module.exports = {
    name: 'profile',
    description: 'user profile',
    run: async (client, message, args) => {
        message.delete();
        let user = message.mentions.users.first() || message.author;
        let checkBase = quick.fetch(`voiceTime.${message.author.id}`);
    //if(checkBase == null) return message.channel.send('Error!');

    const seconds = Math.floor((checkBase / 1000) % 60) || '0';
    const minutes = Math.floor((checkBase / 1000 / 60) % 60 || '0');
    const hours = Math.floor((checkBase / 1000 / 60 / 60) % 24 || '0');
    const days = Math.floor(checkBase / 1000 / 60 / 60 / 24 || '0');
        
    const msImg = ["https://i.gifer.com/JJzx.gif", "https://n1s1.hsmedia.ru/45/26/d4/4526d4b16e629ce36c321006a64ee16e/612x254_0xac120002_20849399811540476183.gif", "https://i.gifer.com/NrGC.gif", "https://i.pinimg.com/originals/da/8f/34/da8f347d435e3f90b59b03c92cde0ef7.gif"]

    const randomImg = msImg[Math.floor(Math.random() * msImg.length)];
    

        const member = message.guild.member(user);

        let embed = new MessageEmbed()
        .setColor(member.displayHexColor)
        .setAuthor(`Профиль пользователя ${user.username}`, user.displayAvatarURL({dinamic: true}))
        .setThumbnail(user.displayAvatarURL({dynamic: true, size: 512}))
        .setImage(randomImg)
        .addField('Информация о пользователе: ', `Статус: ${user.presence.status} \nНа сервере с: ${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')} \nВремя в войсе: ${days} дней, ${hours} часов, ${minutes} минут, ${seconds} секунд \nАккаунт создан: ${moment.utc(member.user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')} \n `)
        message.channel.send(embed);
    }
}