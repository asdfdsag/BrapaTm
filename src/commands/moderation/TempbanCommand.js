const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const ms = require('ms');

module.exports = class TempbanCommand extends BaseCommand {
  constructor() {
    super('tempban', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.senn('Nemas dozvolu za \`Tempban\`.')
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('Treba mi \`BAN_MEMBERS\` permission za tempban.');

    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason = args.slice(2).join(" ");
    let time = args[1];
    const banEmbed = new Discord.MessageEmbed()
     .setTitle(`Privremeno si banan u ${message.guild.name}`)
     .addField(`Razlog: ${reason}`, `Vreme: ${time}`)
     .setTimestamp();

    if (!args[0]) return message.channel.send('Moras navesti clana za tempban. \`*tempban @member time.\`');
    if (!mentionedMember) return message.channel.send('Navedeni clan nije u serveru.');
    if (!mentionedMember.bannable) return message.channel.send('Navedeni clan ne moze da se bana');
    if (!mentionedMember.roles.highest.position >= message.member.roles.highest.position) return message.channel.send('Ne mozes tempbanati pomenutog clana.');
    if (!reason) reason = 'Nema razloga.';
    if (!time) return message.channel.send('Moras navesti vreme za tempban. \`*tempban @member time\`');
    
    await mentionedMember.send(banEmbed).catch(err => console.log(err));
    await mentionedMember.ban({
      days: 7,
      reason: reason
    }).catch(err => console.error(err));
      
    setTimeout(async function () {
      await message.guild.fetchBans().then(async bans => {
        if (bans.size == 0) return message.channel.send('Ovaj guild nema banova.');
        let bannedUser = bans.find(b => b.user.id == mentionedMember.id);
        if (!bannedUser) return console.log('Member je unbanan.');
        await message.guild.members.unban(bannedUser.user, reason).catch(err => console.log(err));
      });
    }, ms(time));
  }
}