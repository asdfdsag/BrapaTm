const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client) {
    console.log(client.user.tag + ' je ustao iz mrtvih.');

    client.user.setPresence({ activities: [{name: `with Discord.js`, type: `PLAYING`}], status: 'dnd'});
  }
  catch (err) {
    console.log(err);
    }
}