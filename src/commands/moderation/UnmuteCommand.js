const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class UnmuteCommand extends BaseCommand {
  constructor() {
    super('unmute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MUTE_MEMBERS ")) return message.channel.send('Nemas dozvolu za \`Umute\`.');
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send('Treba ti \`MANAGE_ROLES\'dozvola za unmute.');

    let reason = args.slice(1).join(" ");
    const muteRole = message.guild.roles.cache.get('795079828570374184');
    const memberRole = message.guild.roles.cache.get('794960189786816563');
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const unmuteEmbed = new Discord.MessageEmbed()
      .setTitle(`Unmjutan si u ${message.guild.name}`)
      .setColor("#5708ab")
      .setTimestamp();
    

    if (!args[0]) return message.channel.send(`Moras navesti osobu za unmute \`*unmute @member razlog.\``);
    if (!mentionedMember) return message.channel.send('Navedeni clan nije u serveru.');
    if (mentionedMember.user.id == message.author.id) return message.channel.send('Ne mozes unmjutati sam sebe');
    if (mentionedMember.user.id == client.user.id) return message.channel.send('Ne mozes da me unmjutas');
    if (!reason) reason = 'Nema razloga.';
    if (mentionedMember.roles.cache.has(memberRole.id)) return message.channel.send('Clan je vec unmjutan.');
    if (message.member.roles.highest.postition <= mentionedMember.roles.highest.postition) return message.channel.send('Ne mozes unmjutati rol isti kao tvoj ili veci.');



    await mentionedMember.send(unmuteEmbed).catch(err => console.log(err));
    await mentionedMember.roles.add(memberRole.id).catch(err => console.log(err).then(message.channel.send('Doslo je do problema vracanjem member rola.')));
    await mentionedMember.roles.remove(muteRole.id).catch(err => console.log(err).then(message.channel.send('Doslo je do problema.')));
  }
}