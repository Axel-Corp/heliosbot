module.exports = [
    {
        name: 'kick',
        description: 'Expulse un utilisateur du serveur',
        execute(message, args) {
            if (!message.member.permissions.has('KICK_MEMBERS')) {
                return message.reply("Tu n'as pas la permission d'expulser des membres.");
            }
            const user = message.mentions.users.first();
            if (!user) {
                return message.reply("Tu dois mentionner un utilisateur à expulser.");
            }
            const member = message.guild.members.cache.get(user.id);
            if (!member) {
                return message.reply("Cet utilisateur n'est pas membre de ce serveur.");
            }
            member.kick()
                .then(() => {
                    message.reply(`${user.username} a été expulsé du serveur.`);
                })
                .catch(err => {
                    message.reply("Une erreur s'est produite lors de l'expulsion de l'utilisateur.");
                    console.error(err);
                });
        }
    },
    {
        name: 'ban',
        description: 'Bannis un utilisateur du serveur',
        execute(message, args) {
            if (!message.member.permissions.has('BAN_MEMBERS')) {
                return message.reply("Tu n'as pas la permission de bannir des membres.");
            }
            const user = message.mentions.users.first();
            if (!user) {
                return message.reply("Tu dois mentionner un utilisateur à bannir.");
            }
            const member = message.guild.members.cache.get(user.id);
            if (!member) {
                return message.reply("Cet utilisateur n'est pas membre de ce serveur.");
            }
            member.ban()
                .then(() => {
                    message.reply(`${user.username} a été banni du serveur.`);
                })
                .catch(err => {
                    message.reply("Une erreur s'est produite lors du bannissement de l'utilisateur.");
                    console.error(err);
                });
        }
    },
    {
        name: 'mute',
        description: 'Rend un utilisateur muet',
        execute(message, args) {
            if (!message.member.permissions.has('MANAGE_MESSAGES')) {
                return message.reply("Tu n'as pas la permission de rendre muet des membres.");
            }
            const user = message.mentions.users.first();
            if (!user) {
                return message.reply("Tu dois mentionner un utilisateur à rendre muet.");
            }
            const member = message.guild.members.cache.get(user.id);
            if (!member) {
                return message.reply("Cet utilisateur n'est pas membre de ce serveur.");
            }
            const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
            if (!muteRole) {
                return message.reply("Il n'y a pas de rôle 'Muted' dans ce serveur.");
            }
            member.roles.add(muteRole)
                .then(() => {
                    message.reply(`${user.username} a été rendu muet.`);
                })
                .catch(err => {
                    message.reply("Une erreur s'est produite lors du mute de l'utilisateur.");
                    console.error(err);
                });
        }
    },
    {
        name: 'unmute',
        description: 'Délivre un utilisateur du silence',
        execute(message, args) {
            if (!message.member.permissions.has('MANAGE_MESSAGES')) {
                return message.reply("Tu n'as pas la permission de délivrer du silence des membres.");
            }
            const user = message.mentions.users.first();
            if (!user) {
                return message.reply("Tu dois mentionner un utilisateur à délivrer du silence.");
            }
            const member = message.guild.members.cache.get(user.id);
            if (!member) {
                return message.reply("Cet utilisateur n'est pas membre de ce serveur.");
            }
            const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
            if (!muteRole) {
                return message.reply("Il n'y a pas de rôle 'Muted' dans ce serveur.");
            }
            member.roles.remove(muteRole)
                .then(() => {
                    message.reply(`${user.username} a été délivré du silence.`);
                })
                .catch(err => {
                    message.reply("Une erreur s'est produite lors de l'annulation du mute de l'utilisateur.");
                    console.error(err);
                });
        }
    },

    {
        name: 'clear',
        description: 'Supprime un certain nombre de messages',
        execute(message, args) {
            if (!message.member.permissions.has('MANAGE_MESSAGES')) {
                return message.reply("Tu n'as pas la permission de supprimer des messages.");
            }
            const amount = parseInt(args[0]);
            if (isNaN(amount) || amount <= 0 || amount > 100) {
                return message.reply("Tu dois spécifier un nombre de messages à supprimer entre 1 et 100.");
            }
            message.channel.bulkDelete(amount, true)
                .then(() => {
                    message.reply(`**${amount}** messages ont été supprimés.`);
                })
                .catch(err => {
                    message.reply("Une erreur s'est produite lors de la suppression des messages.");
                    console.error(err);
                });
        }
    },
    {
        name: 'warnlist',
        description: 'Affiche la liste des avertissements d’un utilisateur',
        execute(message, args) {
            const user = message.mentions.users.first();
            if (!user) {
                return message.reply("Tu dois mentionner un utilisateur pour voir ses avertissements.");
            }
            // Vous pouvez stocker les avertissements dans un fichier ou une base de données.
            // Pour cet exemple, imaginons un stockage local dans un objet `warnings`.
            // Remplacez ceci par un système réel de stockage.
            const warnings = getWarnings(user.id); // Récupère les avertissements (fonction fictive).
            if (warnings.length === 0) {
                return message.reply(`${user.username} n'a pas d'avertissements.`);
            }
            const warningList = warnings.map((warning, index) => `${index + 1}. ${warning}`).join('\n');
            message.reply(`Voici les avertissements de ${user.username} :\n${warningList}`);
        }
    },
    {
        name: 'addwarn',
        description: 'Ajoute un avertissement à un utilisateur',
        execute(message, args) {
            if (!message.member.permissions.has('MANAGE_MESSAGES')) {
                return message.reply("Tu n'as pas la permission d'ajouter des avertissements.");
            }
            const user = message.mentions.users.first();
            if (!user) {
                return message.reply("Tu dois mentionner un utilisateur pour lui ajouter un avertissement.");
            }
            const reason = args.slice(1).join(' ') || 'Aucune raison spécifiée.';
            // Enregistrer l'avertissement dans un fichier ou une base de données.
            addWarning(user.id, reason); // Fonction fictive pour ajouter un avertissement.
            message.reply(`${user.username} a été averti pour : ${reason}`);
        }
    },
    {
        name: 'removewarn',
        description: 'Supprime un avertissement d’un utilisateur',
        execute(message, args) {
            if (!message.member.permissions.has('MANAGE_MESSAGES')) {
                return message.reply("Tu n'as pas la permission de supprimer des avertissements.");
            }
            const user = message.mentions.users.first();
            if (!user) {
                return message.reply("Tu dois mentionner un utilisateur pour lui supprimer un avertissement.");
            }
            const warnId = parseInt(args[1]);
            if (isNaN(warnId) || warnId <= 0) {
                return message.reply("Tu dois spécifier un identifiant d'avertissement valide.");
            }
            // Supprimer l'avertissement du stockage (fonction fictive).
            removeWarning(user.id, warnId); // Fonction fictive pour supprimer un avertissement.
            message.reply(`L'avertissement ${warnId} de ${user.username} a été supprimé.`);
        }
    },
    {
        name: 'role',
        description: 'Attribue ou enlève un rôle à un utilisateur',
        execute(message, args) {
            if (!message.member.permissions.has('MANAGE_ROLES')) {
                return message.reply("Tu n'as pas la permission de gérer les rôles.");
            }
            const user = message.mentions.users.first();
            if (!user) {
                return message.reply("Tu dois mentionner un utilisateur pour lui attribuer un rôle.");
            }
            const roleName = args.slice(1).join(' ');
            if (!roleName) {
                return message.reply("Tu dois spécifier le nom du rôle à attribuer ou à enlever.");
            }
            const role = message.guild.roles.cache.find(r => r.name === roleName);
            if (!role) {
                return message.reply("Ce rôle n'existe pas.");
            }
            const member = message.guild.members.cache.get(user.id);
            if (!member) {
                return message.reply("Cet utilisateur n'est pas membre de ce serveur.");
            }
            if (member.roles.cache.has(role.id)) {
                member.roles.remove(role)
                    .then(() => {
                        message.reply(`${user.username} a eu le rôle ${roleName} retiré.`);
                    })
                    .catch(err => {
                        message.reply("Une erreur s'est produite lors du retrait du rôle.");
                        console.error(err);
                    });
            } else {
                member.roles.add(role)
                    .then(() => {
                        message.reply(`${user.username} a reçu le rôle ${roleName}.`);
                    })
                    .catch(err => {
                        message.reply("Une erreur s'est produite lors de l'ajout du rôle.");
                        console.error(err);
                    });
            }
        }
    },

    {
        name: 'modohelp',
        description: 'Affiche toutes les commandes de modération',
        execute(message) {
            const embed = new EmbedBuilder()
                .setColor('#FF5733') // Couleur orange vif
                .setTitle('🛡️ Commandes de Modération')
                .setDescription('Voici la liste des commandes de modération disponibles :')
                .addFields(
                    { name: '**h!ban @user [raison]**', value: '🔨 Bannit un utilisateur.' },
                    { name: '**h!kick @user [raison]**', value: '👢 Expulse un utilisateur.' },
                    { name: '**h!mute @user [durée]**', value: '🔇 Réduit au silence un utilisateur.' },
                    { name: '**h!unmute @user**', value: '🔊 Rend la parole à un utilisateur.' },
                    { name: '**h!clear [nombre]**', value: '🧹 Supprime des messages.' },
                    { name: '**h!warnlist @user**', value: '📜 Affiche les avertissements d’un utilisateur.' },
                    { name: '**h!addwarn @user [raison]**', value: '⚠️ Ajoute un avertissement.' },
                    { name: '**h!removewarn @user [ID]**', value: '❌ Supprime un avertissement.' },
                    { name: '**h!role @user [nom du rôle]**', value: '🏷️ Ajoute ou retire un rôle.' }
                )
                .setFooter({ text: 'Utilise chaque commande avec précaution.' })
                .setTimestamp();

            message.reply({ embeds: [embed] });
        }
    }

];

// Fonctions fictives pour la gestion des avertissements
let warnings = {}; // Remplacez cela par une solution de stockage réelle, comme une base de données.

function getWarnings(userId) {
    return warnings[userId] || [];
}

function addWarning(userId, reason) {
    if (!warnings[userId]) warnings[userId] = [];
    warnings[userId].push(reason);
}

function removeWarning(userId, warnId) {
    if (warnings[userId] && warnings[userId][warnId - 1]) {
        warnings[userId].splice(warnId - 1, 1);
    }
}

const ms = (duration) => {
    const match = duration.match(/^(\d+)([smhd])$/);
    if (!match) return null;

    const value = parseInt(match[1]);
    const unit = match[2];

    switch (unit) {
        case 's': return value * 1000; // secondes
        case 'm': return value * 60 * 1000; // minutes
        case 'h': return value * 60 * 60 * 1000; // heures
        case 'd': return value * 24 * 60 * 60 * 1000; // jours
        default: return null;
    }
}