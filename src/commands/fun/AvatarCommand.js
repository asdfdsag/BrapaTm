const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class AvatarCommand extends BaseCommand {
  constructor() {
    super('av', 'fun', []);
  }

  async run(client, message, args) {
    let mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!mentionedMember) mentionedMember = message.member;

   const embed = new Discord.MessageEmbed()
    .setTitle(mentionedMember.user.tag + "avatar")
    .setImage(mentionedMember.user.displayAvatarURL());

   message.channel.send(embed);
  }
}