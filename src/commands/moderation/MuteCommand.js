const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class MuteCommand extends BaseCommand {
  constructor() {
    super('mute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send('Nemas dozvolu za \`Mute\`.');
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send('Treba mi \`MANAGE_ROLES\' za mute.');

    let reason = args.slice(1).join(" ");
    const muteRole = message.guild.roles.cache.get('795079828570374184');
    const memberRole = message.guild.roles.cache.get('794960189786816563');
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const muteEmbed = new Discord.MessageEmbed()
      .setTitle(`Mjutan si u ${message.guild.name}`)
      .setDescription(`Razlog: ${reason}`)
      .setColor("#5708ab")
      .setTimestamp();
    

    if (!args[0]) return message.channel.send(`Moras navesti osobu za mute \`*mute @member razlog.\``);
    if (!mentionedMember) return message.channel.send('Navedeni clan nije u serveru.');
    if (mentionedMember.user.id == message.author.id) return message.channel.send('Ne mozes mjutati sam sebe');
    if (mentionedMember.user.id == client.user.id) return message.channel.send('Ne mozes da me mjutas');
    if (!reason) reason = 'Nema razloga.';
    if (mentionedMember.roles.cache.has(muteRole.id)) return message.channel.send('Clan je vec mjutan.');
    if (message.member.roles.highest.postition <= mentionedMember.roles.highest.postition) return message.channel.send('Ne mozes mjutati rol isti kao tvoj ili veci.');



    await mentionedMember.send(muteEmbed).catch(err => console.log(err));
    await mentionedMember.roles.add(muteRole.id).catch(err => console.log(err).then(message.channel.send('Doslo je do problema davanjem mute rola.')));
    await mentionedMember.roles.remove(memberRole.id).catch(err => console.log(err).then(message.channel.send('Doslo je do problema.')));
  }
}