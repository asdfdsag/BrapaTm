const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const ms = require('ms');

module.exports = class TempmuteCommand extends BaseCommand {
  constructor() {
    super('tempmute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send('Nemas dozvolu za \`Tempmute\`.');
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send('Treba mi \`MANAGE_ROLES\' za mute.');

    const muteRole = message.guild.roles.cache.get('795079828570374184')
    const memberRole = message.guild.roles.cache.get('794960189786816563')
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let time = args[1];
    let reason = args.slice(2).join(" ");
    const tempmuteEmbed = new Discord.MessageEmbed()
      .setTitle(`Privremeno si mjutan u ${message.guild.name}.`)
      .addField(`Vreme: ${time}`, `Razlog: ${reason}`)
      .setTimestamp();

    if (!args[0]) return message.channel.send('Morate da navedete clana koji ce privremeno biti mjutan. \`*tempmute @member vreme razlog\`');
    if (!mentionedMember) return message.channel.send('Navedeni clan nije u serveru.');
    if (!mentionedMember.roles.highest.position >= message.member.roles.highest.position) return message.channel.send('Ne mozes privremeno mutati pomenutog clana.');
    if (!time) return message.channel.send('Moras navesti vreme za mute. \`*tempmute @member vreme razlog\`');
    if (!reason) reason = 'Nema rozloga.';

    await mentionedMember.roles.add(muteRole.id).catch(err => console.log(err));
    await mentionedMember.roles.remove(memberRole.id).catch(err => console.log(err));
    await mentionedMember.send(tempmuteEmbed).catch(err => console.log(err));

    setTimeout(async function () {
      await mentionedMember.roles.add(memberRole.id).catch(err => console.log(err));
      await mentionedMember.roles.remove(muteRole.id).catch(err => console.log(err));
      await mentionedMember.send(`Vas mute je ukinut u ${message.guild.name}.`).catch(err => console.log(err));
    }, ms(time));
  }
}