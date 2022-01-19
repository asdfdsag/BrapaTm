const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class SayCommand extends BaseCommand {
  constructor() {
    super('say', 'fun', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('Nemas dozvolu za \`Say\`.');
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('Nemas \`MANAGE CHANNELS\` permission za Say.');
     const messageToSay = args.join(" ");
     const seyEmbed = new Discord.MessageEmbed()
     .setTitle(`${message.author.tag} says: ${messageToSay}`)
     .setFooter(message.author.tag ,message.author.displayAvatarURL())
     .setColor("#84daf8")
     .setTimestamp();
    try{
     await message.channel.send(seyEmbed);
    } catch (err) {
      console.log(err);
      message.channel.send('Ne mogu poslati tu poruku.');
    }
  }
}