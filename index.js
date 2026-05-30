const {
    Client,
    GatewayIntentBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const axios = require("axios");

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

const TOKEN = "MTUxMDAwNjQ4NTI1MjU3MTMyNw.G5ILHT.j8FykLxIIC1--zOePNus-Y4y5M9-Lk3W_WuqhM";
const CHANNEL_ID = "1503097075619860560";

// Universe ID
const UNIVERSE_ID = "123456789";

// Place ID Roblox
const PLACE_ID = "123456789";

// Logo
const LOGO =
"https://imgur.com/a/5FqEm4n";

// Bannière
const BANNER =
"https://imgur.com/a/5FqEm4n";

async function getRobloxData() {

    try {

        const response = await axios.get(
            `https://games.roblox.com/v1/games?universeIds=${UNIVERSE_ID}`
        );

        const game = response.data.data[0];

        return {
            players: game.playing,
            maxPlayers: game.maxPlayers,
            visits: game.visits,
            favorites: game.favoritedCount
        };

    } catch (err) {

        console.error(err);

        return null;
    }
}

async function sendPanel() {

    const data = await getRobloxData();

    const embed = new EmbedBuilder()

        .setColor("#111111")

        .setTitle("🌍 TERANGA BLOX RP")

        .setDescription(
            "```Serveur RP Sénégal Roblox```"
        )

        .setThumbnail(LOGO)

        .setImage(BANNER)

        .addFields(

            {
                name: "🟢 STATUS",
                value: "`ONLINE`",
                inline: true
            },

            {
                name: "👥 JOUEURS",
                value: data
                    ? `\`${data.players}/${data.maxPlayers}\``
                    : "`Inconnu`",
                inline: true
            },

            {
                name: "📈 VISITES",
                value: data
                    ? `\`${data.visits.toLocaleString()}\``
                    : "`Inconnu`",
                inline: true
            }

        )

        .setFooter({
            text: "Teranga Blox RP • Status"
        })

        .setTimestamp();

    // Bouton CONNECT
   const row = new ActionRowBuilder().addComponents(

    new ButtonBuilder()
        .setLabel("🔗 CONNECT")
        .setStyle(ButtonStyle.Link)
        .setURL("https://www.roblox.com/share?code=a3429f47d49bce4baf6b17197994e973&type=ExperienceDetails&stamp=1780090333346"),

    new ButtonBuilder()
        .setLabel("🛒 BOUTIQUE")
        .setStyle(ButtonStyle.Link)
        .setURL("https://www.roblox.com/games/123456789") // Mets ici le lien de ta boutique

);

    const channel = await client.channels.fetch(CHANNEL_ID);

    await channel.send({
        embeds: [embed],
        components: [row]
    });
}

client.once("ready", async () => {

    console.log(`${client.user.tag} connecté`);

    sendPanel();

    setInterval(sendPanel, 300000);

});

client.login(TOKEN);