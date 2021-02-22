const eris = require('eris');
const packageJson = require('./package.json');

const bot = new eris.Client(packageJson.token);
let theFinalDate = new Date("12/Mar/2021 18:44:00");
let suffixes = [
    "Coño si...", 
    "Joder, que pesado,", 
    "Tonto cagón,", 
    "Porque eres tan pesado,",
    "Sin condiciones,",
    "Muy bien, borroso siguiente,",
    "Afsxafsxafsxafsx,"
];

const http = require('http');
http.createServer((req, res) => {
res.writeHead(200, {
    'Content-type': 'text/plain'
});

}).listen(4000);

function getRandomSuffix() {
    return suffixes[Math.floor(Math.random() * suffixes.length)];
}

function getMessage() {
    let currentDate = new Date();
    let diff = Math.abs(currentDate.getTime() - theFinalDate.getTime());
    let numberOfDays = Math.floor(diff / (1000 * 60 * 60 * 24));

    if(numberOfDays == 0)
        return "ESSSS HOOOOOOOOOOOOOOOYYY!!! JODEEEEEEER!"

    return `${getRandomSuffix()} te queda como ${numberOfDays} dias joder.`
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