const eris = require('eris');

const bot = new eris.Client(process.env.ENV_TOKEN);
let theFinalDate = new Date("13/Mar/2021 18:44:00");
let suffixes = [
    "Coño si...", 
    "Joder, que pesado,", 
    "Tonto cagón,", 
    "Porque eres tan pesado,",
    "Sin condiciones,",
    "Muy bien, borroso siguiente,",
    "Afsxafsxafsxafsx,"
];

function getRandomSuffix() {
    return suffixes[Math.floor(Math.random() * suffixes.length)];
}

function getMessage() {
    let currentDate = new Date();
    let diff = Math.abs(currentDate.getTime() - theFinalDate.getTime());
    let numberOfDays = Math.floor(diff / (1000 * 60 * 60 * 24));

    if(numberOfDays == 0)
        return "ESSSS HOOOOOOOOOOOOOOOYYY!!! JODEEEEEEER!";

    return `${getRandomSuffix()} te queda como ${numberOfDays} dias joder.`;
}

bot.on('messageCreate', async (msg) => {
    const botWasMentioned = msg.mentions.find(
        mentionedUser => mentionedUser.id === bot.user.id,
    );
 
    if (botWasMentioned) {
        try {
            await msg.channel.createMessage(getMessage());
        } catch (err) {
            console.warn('Failed to respond to mention.');
            console.warn(err);
        }
    }
});
 
bot.on('error', err => {
    console.warn(err);
});
 
bot.connect();