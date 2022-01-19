// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
const { MessageAttachment } = require('discord.js');
const BaseEvent = require('../utils/structures/BaseEvent');
module.exports = class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }
  
  async run(client, member) {
    const role = member.guild.roles.cache.get('794960189786816563');
    await member.roles.add(role.id).catch(err => console.log(err));
console.log
    const welcomeChannel = member.guild.channels.cache.get('793629347130507327');
    const rulesChannel = member.guild.channel.cache.get('818800924474343474');
    welcomeChannel.send(`<@${member.user.id}>, dobrodosao/la u ${member.guild.name} server, procitaj pravila u ${rulesChannel}, i zabavi se!`);
  }
}