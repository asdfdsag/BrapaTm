const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class UserinfoCommand extends BaseCommand {
  constructor() {
    super('userinfo', 'fun', []);
  }

  async run(client, message, args) {

   let userinfo = args.join(' ');
   let mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!mentionedMember) mentionedMember = message.member;
   const embed = new Discord.MessageEmbed()
   .addField(
     {
       name: 'Username',
      
     }
   )

   message.channel.send(embed);
  }
}