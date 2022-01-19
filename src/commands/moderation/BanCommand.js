const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super('ban', 'moderation', []);
  }

  async run(client, message, args) {

    //Permission Checking
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Nemas dozvolu za \`Ban\`.");
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("Nemam dovoljno veliki rank za ban.");

    //Variables:
    let reason = args.slice(1).join(" ");
    const mentionedMember = message.mentions.members.first();

    //Input Checking:
    if (!reason) reason = 'nema razloga.';
    if (!args[0]) return message.channel.send('Moras navesti osobu za ban. \`*ban @user razlog\`');
    if (!mentionedMember) return message.channel.send('Pomenuti clan nije u serveru.');
    if (!mentionedMember.bannable) return message.channel.send('Ne mogu banati pomenutog clana.');

    //Executing:
    const banEmbed = new Discord.MessageEmbed()
      .setTitle(`Banovan si u ${message.guild.name}`)
      .setDescription(`Razlog: ${reason}`)
      .setColor("#5708ab")
      .setTimestamp();

    await mentionedMember.send(banEmbed).catch(err => console.log(err));
    await mentionedMember.ban({
      days: 7,
      reason: reason
    }).catch(err => console.log(err)).then(() => message.channel.send("Uspesnan ban. " + mentionedMember.user.tag));
  }
}