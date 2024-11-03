const { Client, Intents, MessageEmbed } = require('discord.js');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            // ya pas de curl t con ou quoi ? \\ .. || https://github.com/souleau
const config = require('./config.json'); 

const client = new Client({
  intents: [
    53608447 // Intents
  ]
});

client.once('ready', () => {
    console.log(`${client.user.tag} link to api`);
});

client.on('messageCreate', async (message) => {

    if (message.author.bot) return;
    if (message.content === '+cb') {
        const guild = await client.guilds.fetch(config.GUILD_ID);

        guild.members.fetch().then(members => {
         
            const boostedMembers = members.filter(member => member.premiumSince);
            if (boostedMembers.size === 0) {
                return message.channel.send("Aucun membre n'a boosté le serveur.");
            }

            boostedMembers.forEach(member => {
                const premiumSinceDate = new Date(member.premiumSinceTimestamp);
                const joinedDate = new Date(member.joinedTimestamp);
                const now = new Date();
                let years = now.getFullYear() - premiumSinceDate.getFullYear();
                let months = now.getMonth() - premiumSinceDate.getMonth();

                if (months < 0) {
                    years -= 1;
                    months += 12;
                }

                const duration = `${years > 0 ? `${years} an${years > 1 ? 's' : ''}` : ''} ${months > 0 ? `${months} mois` : ''}`.trim() || 'moins d\'un mois';
                const embed = new MessageEmbed()
                    .setColor('#FF73FA')
                    .setTitle(`${member.user.tag} a boosté le serveur`)
                    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                    .addField('Rejoint le', `<t:${Math.floor(joinedDate.getTime() / 1000)}:F>`, true)
                    .addField('Boosté le', `<t:${Math.floor(premiumSinceDate.getTime() / 1000)}:F>`, true)
                    .addField('Durée de boost', duration, true)
                    .setFooter(`UserID : ${member.id}`, member.user.displayAvatarURL({ dynamic: true }));
                message.channel.send({ embeds: [embed] });
            });
        }).catch(console.error);
    }
});

client.login(config.TOKEN);