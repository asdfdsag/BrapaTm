const { Guild } = require('discord.js');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class LoclCommand extends BaseCommand {
  constructor() {
    super('lock', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('Nemas dozvolu za \`Lock\`.');
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('Nemam \`MANAGE CHANNELS\` permission za lock.');

    const role = message.guild.roles.cache.get('794960189786816563');
    let lockChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    if (!lockChannel) lockChannel = message.channel;

    await lockChannel.updateOverwrite(role, {
      SEND_MESSAGES: false
    }).catch(err => console.log(err));
    message.channel.send(':lock: Uspesan lock');
  }
}