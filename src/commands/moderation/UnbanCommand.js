const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class UnbanCommand extends BaseCommand {
  constructor() {
    super('unban', 'moderation', []);
  }

  async run(client, message, args) {
    //Permission Checking
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Nemas dozvolu za \`Unban\`.");
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("Nemas dovoljno veliki rank za unban.");

    //Variables:
    let reason = args.slice(1).join(" ");
    let userID = args[0];

    //Input Checking:
    if (!reason) reason = 'nema razloga.';
    if (!args[0]) return message.channel.send('Moras navesti osobu za unban. \`*unban ID razlog\`');
    if (isNaN(args[0])) return message.channel.send('Navedeni ID nije pravi. \`*unban ID razlog\`');


    message.guild.fetchBans().then(async bans => {
      if (bans.size == 0) return message.channel.send('Ovaj server nema ban osoba.');
      let bUser = bans.find(b => b.user.id == userID);
      if (!bUser) return message.channel.send('Navedeni ID nije pravi.');
      await message.guild.members.unban(bUser.user, reason).catch(err => {
        return message.channel.send('Doslo je do problema prilikom unbanovanja.');
      }).then(() => {
        message.channel.send(`Uspesan unban ${args[0]}`);
      });
    });

  }
}