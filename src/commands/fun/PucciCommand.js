const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class UkiqCommand extends BaseCommand {
  constructor() {
    super('kralj', 'fun', []);
  }

  async run(client, message, args) {
    let kralj = args.join(' ');

    const embed = new Discord.MessageEmbed()
    .setTitle('Father Pucci') 
    .setImage(`https://64.media.tumblr.com/13272cbb4ae54f0d3927169ce693365e/275283c72adbf15b-4b/s400x600/a11e54ae22f9e68d6684a9a5e6beda348731888b.png`)
    .setColor("#7133FF")
    .setTimestamp();
    message.channel.send(embed);
  }
}