const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class WarnCommand extends BaseCommand {
  constructor() {
    super('warn', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Nemas dozvolu za \`Warn\`.');
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("Nemam dovoljno veliki rank za Warn.");

    const warnRole1 = message.guild.roles.cache.find(role => role.name == 'warn{1}');
    const warnRole2 = message.guild.roles.cache.find(role => role.name == 'warn{2}');
    const warnRole3 = message.guild.roles.cache.find(role => role.name == 'warn{3}');
    const mentionedMember = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
    let punishment = 1;
    let reason = args.slice(2).join(" ");

    if (!warnRole1) await message.guild.roles.create({
      data: {
        name: 'warn{1}',
        color: 'BLACK'
      }
    }).catch(err => console.log(err));

    if (!warnRole2) await message.guild.roles.create({
      data: {
        name: 'warn{2}',
        color: 'BLACK'
      }
    }).catch(err => console.log(err));

    if (!warnRole3) await message.guild.roles.create({
      data: {
        name: 'warn{3}',
        color: 'BLACK'
      }
    }).catch(err => console.log(err));

    //*warn @member [add, remove] [reason]
    if (!args[0]) return message.channel.send('Moras navesti clana za proveravanje, dodavanje ili skidanje warn-ova *warn @member [+, -] [razlog].');
    if (!mentionedMember) return message.channel.send('Navedeni clan nije u serveru.');
    if (!reason) reason = 'Nema razloga.';

    if (mentionedMember.roles.cache.has(warnRole1.id)) punishment = 2;
    if (mentionedMember.roles.cache.has(warnRole2.id)) punishment = 3;
    if (mentionedMember.roles.cache.has(warnRole3.id)) punishment = 4;


    if (!['+', '-'].includes(args[1])) {
      if (punishment == 1) {
        return message.channel.send(`${mentionedMember.user.tag} nema warn-ova.`);
      } else if (punishment == 2) {
        return message.channel.send(`${mentionedMember.user.tag} ima 1 warn.`);
      } else if (punishment == 3) {
        return message.channel.send(`${mentionedMember.user.tag} ima 2 warn-ova.`);
      } else if (punishment == 4) {
        return message.channel.send(`${mentionedMember.user.tag} ima 3 warn-ova.`);
      }

    } else {
      if (args[1] == '+') {
        if (punishment == 1) {
          await mentionedMember.roles.add(warnRole1.id).catch(err => console.log(err));
          return message.channel.send(`${mentionedMember}, je warnovan 
          razlog: ${reason}`);

        } else if (punishment == 2) {
          await mentionedMember.roles.add(warnRole2.id).catch(err => console.log(err));
          await mentionedMember.roles.remove(warnRole1.id).catch(err => console.log(err));
          return message.channel.send(`${mentionedMember}, je warnovan 
          razlog: ${reason}`);

        } else if (punishment == 3) {
          await mentionedMember.roles.add(warnRole3.id).catch(err => console.log(err));
          await mentionedMember.roles.remove(warnRole2.id).catch(err => console.log(err));
          return message.channel.send(`${mentionedMember}, je warnovan 
          razlog: ${reason}`);

        } else if (punishment == 4) {
          return message.channel.send(`${mentionedMember.user.tag} je dostigao limit warn-ova.`);
        }

      } else if (args[1] == '-') {

        if (punishment == 1) {
          return message.channel.send(`${mentionedMember.user.tag}, nema warn-ova za skidanje.`);

        } else if (punishment == 2) {
          await mentionedMember.roles.remove(warnRole1.id).catch(err => console.log(err));
          return message.channel.send(`Uspesno skidanje warn-a za ${mentionedMember.user.tag}`);

        } else if (punishment == 3) {
          await mentionedMember.roles.remove(warnRole2.id).catch(err => console.log(err));
          await mentionedMember.roles.add(warnRole1.id).catch(err => console.log(err));
          return message.channel.send(`Uspesno skidanje warn-a za ${mentionedMember.user.tag}`);

        } else if (punishment == 4) {
          await mentionedMember.roles.remove(warnRole3.id).catch(err => console.log(err));
          await mentionedMember.roles.add(warnRole2.id).catch(err => console.log(err));
          return message.channel.send(`Uspesno skidanje warn-a za ${mentionedMember.user.tag}`);

        }
      }
    }
  }
}