const Discord = require('discord.js');

module.exports = {
    name: "rank",
    category: "info",
    descripption: "Your level",
    run: async (client, message, args) => {

    const channel = member.guild.channels.cache.find(ch => ch.name === 'chat');
	if (!channel) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./wallpaper.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	// Select the color of the stroke
	ctx.strokeStyle = '#74037b';
	// Draw a rectangle with the dimensions of the entire canvas
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(attachment);
    }
}