const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class PurgeCommand extends BaseCommand {
  constructor() {
    super('purge', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Nemas dozvolu za \`Purge\`.');
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nemam \`MANAGE_MESSAGES\` perm.");
    if (!args[0]) return message.channel.send("Moras uneti broj za Purge. \`*purge broj\`");
    const amonutToDelete = Number(args[0], 10);
    
    if (isNaN(amonutToDelete)) return message.channel.send("Navedeni broj nije vazeci broj.");
    if (!Number.isInteger(amonutToDelete)) return message.channel.send("Navedeni broj mora biti ceo broj.");
    if (!amonutToDelete || amonutToDelete < 1 || amonutToDelete > 100) return message.channel.send('Broj mora biti izmedju 1 i 100.');
    const fetched = await message.channel.messages.fetch({
      limit: amonutToDelete
    })

   try{
      await message.channel.bulkDelete(fetched)
        .then(messages => message.channel.send(`Izbrisano ${messages.size} poruka!`));
    }catch (err) {
      console.log(err);
      message.channel.send(`Nisi uspeo da izbrises navedeni iznos, poruke ne smeju biti starije u roku od 14 dana.`);

    }
  }
}