const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class VoteCommand extends BaseCommand {
  constructor() {
    super('vote', 'fun', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('Nemas dozvolu za \`Vote\`.');
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('Nemas \`MANAGE CHANNELS\` permission za Vote.');
    const filter = m => m.author.id == message.author.id;
    let embed = new Discord.MessageEmbed()
     .setFooter(`Glasanje napravio: ${message.author.tag}`);


    message.channel.send('Koja je tema glasanja?');
    try {
      let msg = await message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time']});
      console.log(msg.first().content);
      embed.setTitle(msg.first().content);
    } catch (err) {
      console.log(err);
      message.channel.send('U toku je glasanje, pokusaj ponovo.')
    }

    message.channel.send('Koja je prva opcija?');
    try {
      let msg = await message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time']});
      console.log(msg.first().content);
      embed.addField(`[🔴] Prva opcija za glasanje`, msg.first().content);
    } catch (err) {
      console.log(err);
      message.channel.send('U toku je glasanje, pokusaj ponovo.')
    }

    message.channel.send('Koja je druga opcija?');
    try {
      let msg = await message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time']});
      console.log(msg.first().content);
      embed.addField(`[🔵] Druga opcija za glasanje`, msg.first().content);
    } catch (err) {
      console.log(err);
      message.channel.send('U toku je glasanje, pokusaj ponovo.')
    }
    message.channel.send(embed).then(sendMessage => sendMessage.react('🔴')).then(reaction => reaction.message.react('🔵'));
  }
}