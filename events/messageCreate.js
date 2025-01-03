const config = require('../config.json');

module.exports = {
    name: 'messageCreate',
    execute(message, client) {
        if (message.author.bot || !message.content.startsWith(config.prefix)) return;

        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName);
        if (!command) return;

        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('❌ Une erreur est survenue lors de l’exécution de cette commande.');
        }
    }
};
