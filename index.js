// Importo le variabili dotenv
require('dotenv').config();
// Importo i moduli necessari per il bot Discord
const { Client, GatewayIntentBits, Partials, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');

// Importo gli intents necessari per il funzionamento del bot
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Channel]
});

// Trasferisco tutte le costanti in un file .env
const token = process.env.DISCORD_TOKEN;
const guildId = process.env.GUILD_ID;
const ticketsChannelId = process.env.TICKETS_CHANNEL_ID;
const logChannelId = process.env.LOG_CHANNEL_ID;
const rejectRoleId = process.env.REJECT_ROLE_ID;
const ticketCategoryId = process.env.TICKET_CATEGORY_ID;


// Messaggio d'avvio del bot
client.once('ready', async () => {
    console.log("");
    console.log("");
    console.log('--------------------------------------------------------------------------');
    console.log('---------------------------• Elio • ---------------------------------');
    console.log('--------------------------------------------------------------------------');
    console.log('[CLIENT] Il bot è pronto all\'uso!');
    console.log('[TICKET SYSTEM] Caricato con successo!');
    console.log('[TICKEY SYSTEM] © Progetto di: alwayselio');
    console.log('[TICKEY SYSTEM] Github: https://github.com/ImElio');
    console.log(`[TICKEY SYSTEM] Utilizzo della memoria: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS | ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB Heap`);
    console.log('[TICKEY SYSTEM] Versione 1.0');
    console.log('[TICKEY SYSTEM] Per qualsiasi problema contattami su Discord -> alwayselio');
    console.log('--------------------------------------------------------------------------');
    console.log('---------------------------• Elio • ---------------------------------');
    console.log('--------------------------------------------------------------------------');
    console.log("");
    console.log("");
    console.log("—————————————————|", "UTILITY", "|—————————————— - [] X");
    console.log(`BOT: ${client.user.tag} (${client.user.id})`);
    console.log("———————————————————————————————————————————————————");


    // Registro il comando per creare il ticket panel nella stanza Ticket
    const commands = [
        new SlashCommandBuilder()
            .setName('createticket')
            .setDescription('Crea Sistema Ticket')
            .setDefaultMemberPermissions(8), // Solo gli utenti con il permesso "AMMINISTRATORE" potranno creare il ticket-panel
    ].map(command => command.toJSON());

    const rest = new REST({ version: '10' }).setToken(token);

    try {
        console.log("");
        console.log("");
        console.log('Inizio del refresh dei comandi dell\'applicazione (/).'); // Faccio il refresh per individuare nuovi comandi aggiunti al codice

        await rest.put(
            Routes.applicationGuildCommands(client.user.id, guildId),
            { body: commands },
        );
        console.log("");
        console.log("");
        console.log('Comandi dell\'applicazione (/) ricaricati con successo.'); // Comunico che i comandi sono stati ricaricati con successo
    } catch (error) {
        console.error(error);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;


    // Ticket-Panel
    if (commandName === 'createticket') { //Tabel name per riconoscere il comando (NON CAMBIARE)
        const embed = new EmbedBuilder()
            .setTitle('Crea un Ticket')
            .setDescription('Clicca il pulsante qui sotto per creare un nuovo ticket.')
            .setColor('#00AAFF')
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('create_ticket')
                    .setLabel('Apri Ticket')
                    .setStyle(ButtonStyle.Primary)
            );

        await interaction.reply({ embeds: [embed], components: [row], ephemeral: false });

        const rest = new REST({ version: '10' }).setToken(token);
        
        // Dopo l'esecuzione del comando /createticket. Il messaggio verrà eliminato e messo come risposta.
        try {
            console.log('Eliminazione del comando /createticket.');

            const commands = await rest.get(
                Routes.applicationGuildCommands(client.user.id, guildId)
            );

            const command = commands.find(cmd => cmd.name === 'createticket');
            if (command) {
                await rest.delete(
                    Routes.applicationGuildCommand(client.user.id, guildId, command.id)
                );
                console.log('Comando /createticket eliminato.');
            }
        } catch (error) {
            console.error('Errore durante l\'eliminazione del comando /createticket:', error);
        }
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    const { customId, member } = interaction;

    if (customId === 'create_ticket') { // Tabel-Name (NON CAMBIARE)
        try {
            const ticketChannel = await interaction.guild.channels.create({
                name: `ticket-${member.id}`,
                type: 0,
                parent: ticketCategoryId,
                permissionOverwrites: [
                    {
                        id: interaction.guild.roles.everyone.id,
                        deny: ['ViewChannel'],
                    },
                    {
                        id: member.id,
                        allow: ['ViewChannel', 'SendMessages', 'ReadMessageHistory'],
                    },
                ],
            });


            // Embed Ticket creato con successo
            const infoEmbed = new EmbedBuilder()
                .setTitle('Ticket Creato')
                .setDescription(`Ticket creato da ${member}`)
                .setColor('#00AAFF')
                .setTimestamp()
                .setFooter({ text: 'By Elio', iconURL: 'https://wikielio.it' });


            // Constante "ROW" che ci permette di rispondere al ticket tramite reazione di due bottoni
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('approve_ticket')
                        .setLabel('Approva')
                        .setStyle(ButtonStyle.Success)
                        .setEmoji('✅'),
                    new ButtonBuilder()
                        .setCustomId('reject_ticket')
                        .setLabel('Rifiuta')
                        .setStyle(ButtonStyle.Danger)
                        .setEmoji('❌'),
                );

            await ticketChannel.send({ embeds: [infoEmbed], components: [row] });

            await interaction.reply({ content: `Ticket creato: ${ticketChannel}`, ephemeral: true });
        } catch (error) {
            console.error('[TICKET] Errore durante la creazione del ticket:', error);
        }
    } else if (customId === 'approve_ticket' || customId === 'reject_ticket') { // Tabel-Name per riconoscere il "rifiuta" e "approva" per agire con le risposte settate nel codice.
        try {
            const ticketChannel = interaction.channel;
            const userId = ticketChannel.name.split('-')[1];
            const user = await interaction.guild.members.fetch(userId);


            // Messaggio privato + Embed (APPROVATO)
            // Messaggio privato + Embed + messaggio nel canale "Logs" (RIFIUTATO)
            if (customId === 'approve_ticket') {
                const approveEmbed = new EmbedBuilder()
                    .setTitle('Ticket Approvato')
                    .setDescription('Il tuo ticket è stato approvato!')
                    .setColor('#00FF00')
                    .setTimestamp()
                    .setFooter({ text: 'By Elio', iconURL: 'https://wikielio.it' });

                await user.send({ embeds: [approveEmbed] });
                await interaction.reply({ content: 'Ticket approvato!', ephemeral: true });
            } else if (customId === 'reject_ticket') {
                const rejectEmbed = new EmbedBuilder() 
                    .setTitle('Ticket Rifiutato')
                    .setDescription('Il tuo ticket è stato rifiutato.')
                    .setColor('#FF0000')
                    .setTimestamp()
                    .setFooter({ text: 'By Elio', iconURL: 'https://wikielio.it' });

                await user.send({ embeds: [rejectEmbed] });
                const logChannel = await interaction.guild.channels.fetch(logChannelId);
                if (logChannel) {
                    await user.roles.add(rejectRoleId);
                    await logChannel.send(`${user} è stato rifiutato.`);
                    await interaction.reply({ content: 'Ticket rifiutato!', ephemeral: true });
                } else {
                    console.error(`[LOG CHANNEL] Canale con ID ${logChannelId} non trovato.`);
                }
            }

            await ticketChannel.delete();
        } catch (error) {
            console.error('[TICKET] Errore durante la gestione del ticket:', error);
        }
    }
});

client.login(token);
