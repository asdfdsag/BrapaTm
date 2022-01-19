const BaseCommand = require('../../utils/structures/BaseCommand');
const { Client, Message, MessageEmbed, MesaggeActionRow, MessageSelectMenu} = require("discord.js"); 

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'tool', []);
  }

async run(client, message, args) {
    const directories = [
      ...new  Set(client.commands.map((cmd) => cmd.directory)),
    
    ];

    console.log(directories);
    
  } 
}