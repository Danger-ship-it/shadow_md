require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

if (!process.env.TELEGRAM_BOT_TOKEN) {
    console.error('❌ ERROR: TELEGRAM_BOT_TOKEN not found in .env file');
    process.exit(1);
}

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Helper function for random number
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const name = msg.from.first_name;
    bot.sendMessage(chatId, `Welcome ${name}! 🎉\n\nI'm SHADOW MD bot. Type /help to see everything I can do!`);
});

// Help command - Comprehensive
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    const helpMessage = `
🤖 *SHADOW MD - COMPLETE COMMANDS LIST*

*💬 Basic Commands:*
/start - Welcome message
/help - Show this menu
/about - About SHADOW MD
/whoami - Your user info

*🎮 Fun & Games:*
/hello - Get a greeting
/roll - Roll a dice (1-6)
/flip - Flip a coin
/random <min> <max> - Random number
/quote - Random inspirational quote

*🔧 Utility Commands:*
/time - Current date & time
/echo <message> - Repeat your message
/calc <expression> - Calculate math
/remind <seconds> <message> - Set a reminder

*ℹ️ Info Commands:*
/ping - Check bot response time
/chatid - Get this chat ID
/commands - Alternative help menu

*Example Usage:*
/echo Hello World
/calc 25 * 4 + 10
/random 1 100
/remind 10 Drink water
    `;
    bot.sendMessage(chatId, helpMessage, { parseMode: 'Markdown' });
});

// Alternative help command
bot.onText(/\/commands/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Type /help to see all available commands! 📚");
});

// About command
bot.onText(/\/about/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `
🤖 *SHADOW MD Bot*
Version: 2.0.0
Status: 🟢 Online
Features: Games, Utilities, Calculations & more!
Made with: Node.js + node-telegram-bot-api
    `, { parseMode: 'Markdown' });
});

// Whoami - User info
bot.onText(/\/whoami/, (msg) => {
    const chatId = msg.chat.id;
    const user = msg.from;
    const info = `
👤 *Your Information*
Name: ${user.first_name} ${user.last_name || ''}
Username: ${user.username ? '@' + user.username : 'Not set'}
User ID: \`${user.id}\`
Language: ${user.language_code || 'Unknown'}
Chat Type: ${msg.chat.type}
    `;
    bot.sendMessage(chatId, info, { parseMode: 'Markdown' });
});

// Get Chat ID
bot.onText(/\/chatid/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `🆔 This chat's ID is: \`${chatId}\``, { parseMode: 'Markdown' });
});

// Ping command - response time
bot.onText(/\/ping/, (msg) => {
    const chatId = msg.chat.id;
    const start = Date.now();
    bot.sendMessage(chatId, 'Pong! 🏓').then(() => {
        const end = Date.now();
        const responseTime = end - start;
        bot.sendMessage(chatId, `Response time: ${responseTime}ms`);
    });
});

// Hello command
bot.onText(/\/hello/, (msg) => {
    const chatId = msg.chat.id;
    const name = msg.from.first_name;
    const greetings = ['Hello', 'Hi', 'Hey', "What's up", 'Greetings'];
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    bot.sendMessage(chatId, `${randomGreeting} ${name}! 👋 How are you today?`);
});

// Time command
bot.onText(/\/time/, (msg) => {
    const chatId = msg.chat.id;
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const date = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    bot.sendMessage(chatId, `📅 ${date}\n🕐 ${time}`);
});

// Echo command
bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const text = match[1];
    bot.sendMessage(chatId, `🔊 ${text}`);
});

// Calculator
bot.onText(/\/calc (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const expression = match[1];
    
    try {
        // Safe evaluation for basic math
        const result = Function(`'use strict'; return (${expression})`)();
        
        if (isNaN(result) || !isFinite(result)) {
            bot.sendMessage(chatId, '❌ Invalid calculation. Use: /calc 2+2, /calc 10*5, /calc 100/4');
        } else {
            bot.sendMessage(chatId, `🧮 \`${expression} = ${result}\``, { parseMode: 'Markdown' });
        }
    } catch (error) {
        bot.sendMessage(chatId, '❌ Error! Example: /calc 15 + 27');
    }
});

// Roll dice
bot.onText(/\/roll/, (msg) => {
    const chatId = msg.chat.id;
    const dice = getRandomInt(1, 6);
    const diceEmojis = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    bot.sendMessage(chatId, `🎲 You rolled a ${dice} ${diceEmojis[dice-1]}`);
});

// Flip coin
bot.onText(/\/flip/, (msg) => {
    const chatId = msg.chat.id;
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
    const emoji = result === 'Heads' ? '👑' : '🪙';
    bot.sendMessage(chatId, `${emoji} Coin flip: *${result}!*`, { parseMode: 'Markdown' });
});

// Random number
bot.onText(/\/random (\d+) (\d+)/, (msg, match) => {
    const chatId = msg.chat.id;
    let min = parseInt(match[1]);
    let max = parseInt(match[2]);
    
    if (min > max) {
        [min, max] = [max, min];
    }
    
    const randomNum = getRandomInt(min, max);
    bot.sendMessage(chatId, `🎲 Random number between ${min} and ${max}: *${randomNum}*`, { parseMode: 'Markdown' });
});

// Random quote
bot.onText(/\/quote/, (msg) => {
    const chatId = msg.chat.id;
    const quotes = [
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
        { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
        { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
        { text: "Be the change you wish to see in the world.", author: "Mahatma Gandhi" },
        { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
        { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" }
    ];
    
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    bot.sendMessage(chatId, `💭 *"${quote.text}"*\n\n— ${quote.author}`, { parseMode: 'Markdown' });
});

// Reminder system
bot.onText(/\/remind (\d+) (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const seconds = parseInt(match[1]);
    const reminderText = match[2];
    
    if (seconds <= 0 || seconds > 3600) {
        bot.sendMessage(chatId, '❌ Please set a reminder between 1 and 3600 seconds (1 hour)');
        return;
    }
    
    bot.sendMessage(chatId, `⏰ I'll remind you in ${seconds} seconds: "${reminderText}"`);
    
    setTimeout(() => {
        bot.sendMessage(chatId, `🔔 *REMINDER* for ${msg.from.first_name}:\n${reminderText}`, { parseMode: 'Markdown' });
    }, seconds * 1000);
});

// Handle non-command messages
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    
    if (text && !text.startsWith('/')) {
        // Random responses for fun
        const responses = [
            "Interesting! 🤔",
            "Tell me more! 💬",
            "Type /help to see what I can do! 📚",
            "Thanks for the message! 🎉"
        ];
        
        if (text.toLowerCase().includes('love')) {
            bot.sendMessage(chatId, "❤️ Love is in the air!");
        } else if (text.toLowerCase().includes('thank')) {
            bot.sendMessage(chatId, "You're welcome! 🙏");
        } else {
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            bot.sendMessage(chatId, randomResponse);
        }
    }
});

// Error handling
bot.on('polling_error', (error) => {
    console.error('Polling error:', error.message);
});

bot.on('error', (error) => {
    console.error('Bot error:', error.message);
});

console.log('🚀 SHADOW MD Bot is running with all features enabled!');
console.log('📋 Available commands: /help to see the full list');
