const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class UnlockCommand extends BaseCommand {
  constructor() {
    super('unlock', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('Nemas dozvolu za \`Unlock\`.');
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('Nemam \`MANAGE CHANNELS\` permission za unlock.');

    const role = message.guild.roles.cache.get('794960189786816563');
    let lockChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    if (!lockChannel) lockChannel = message.channel;

    await lockChannel.updateOverwrite(role, {
      SEND_MESSAGES: true
    }).catch(err => console.log(err));
    message.channel.send(':unlock: Uspesan unlock');
  }
}