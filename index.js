const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const config = require('./config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

// Charger les commandes
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Charger toutes les commandes
commandFiles.forEach(file => {
    const commands = require(`./commands/${file}`);

    // Vérifier si commands est un tableau, sinon le transformer en tableau
    const commandArray = Array.isArray(commands) ? commands : [commands];

    // Ajouter chaque commande au client
    commandArray.forEach(command => {
        client.commands.set(command.name, command);
    });
});

// Charger les événements
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args, client));
}

// Connexion au bot
client.login(config.token);
