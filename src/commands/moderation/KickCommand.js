const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'moderation', []);
  }

  async run(client, message, args) {
    const mentionedMember = message.mentions.members.first();
    let reason = args.slice(1).join(" ");
    if (reason) reason = "nema razloga";
    const kickEmbed = new Discord.MessageEmbed()
    .setTitle(`Kikovan si od strane ${message.guild.name}`)
    .setDescription(`Razlog: ${reason}`)
   .setColor("#5708ab")
   .setTimestamp()
   .setFooter(client.user.tag, client.user.displayAvatarURL());

   // *kick @user
   if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('Nemas dozvolu za \`Kick\`.');
   if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("Nemam dovoljno veliki rank za ban.");
   if (!args[0]) return message.channel.send("Treba da nevedete osobu za kick, \`*kick @user\` ");
   if (!mentionedMember) return message.channel.send("Pomenuti clan nije u serveru.");
  


   try {
   await mentionedMember.send(kickEmbed);
   } catch (err) {
   console.log(err)
   }


    try {
    await mentionedMember.kick(reason)
    }catch (err) {
    console.log(err);
    return message.channel.send("Nemam dovoljno veliki rol da kikujes pomenuog clana")
   }




  }
}