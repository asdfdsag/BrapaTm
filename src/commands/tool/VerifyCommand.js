const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class VerifyCommand extends BaseCommand {
  constructor() {
    super('vf', 'tool', []);
  }

  run(client, message, args) {
    message.channel.send('verify command works');
  }
}