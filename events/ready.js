module.exports = {
    name: 'ready',
    execute(client) {
        console.log(`🤖 Connecté en tant que ${client.user.tag}`);
        client.user.setActivity('Disponible sur plusieurs serveurs', { type: 'PLAYING' });
    }
};
