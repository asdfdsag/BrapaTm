const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class PitanjeCommand extends BaseCommand {
  constructor() {
    super('pitanje', 'fun', []);
  }

  async run(client, message, args) {
  let pitanje = args.join(' ');
    if (!args[0]) return message.channel.send('Moras postaviti neko \`Pitanje\`.');
    const embed = new Discord.MessageEmbed() 
      .setColor(`BLUE`)
      .setTitle(`\`Pitanje\``)
      .addField(`Pitanje: ${pitanje}`, `Napravio: ${message.author.tag}.`);

    message.channel.send(embed).then(sendMessage => sendMessage.react('👍')).then(reaction => reaction.message.react('👎')); 
  }
}