# acct-plug_bot
plug bot
from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, filters, ContextTypes

TOKEN = "8247179412:AAFxAf4e5CitzUpCEDfA5KGaF3uS3rCieeA"

REFERRAL_LINK = "acctspiral.com/WQAMJM52http://www.bovaportal.com/?ref=RjkCNittps://naijaboostplug.com/ref/qi7lw"  # 🔗 replace with your link


# Start command
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(f"""
🔥 WELCOME TO ACCT PLUG

💰 Accounts available from ₦3,000 and above

🛒 Buy here:
{REFERRAL_LINK}

📌 To buy acct DM the Contact Support

Type /menu to continue
""")


# Menu command
async def menu(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("""
📌 MENU

/buy - Purchase account
/prices - View prices
/pay - Payment details
/support - Contact admin
""")


# Buy command
async def buy(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(f"""
🛒 BUY ACCOUNT

Click link below to order:
{REFERRAL_LINK}

📌 To buy acct DM the Contact Support
""")


# Prices
async def prices(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(f"""
💰 PRICE LIST

⚡ All accounts start from ₦3,000

📱 WhatsApp - ₦3k+
📸 Instagram - ₦3k+
📘 Facebook - ₦3k+
📩 Gmail - ₦3k+

🛒 Buy here:
{REFERRAL_LINK}

📌 To buy acct DM the Contact Support
""")


# Payment
async def pay(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("""
🏦 BANK DETAILS

😎 MUHAMMED AWWAL ADETOMIWA
🔢 7072050737
🟢 MONIEPOINT

📌 SEND SCREENSHOT AFTER PAYMENT VIA /support
📌 To buy acct DM the Contact Support
""")


# Support
async def support(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("""
📞 CONTACT SUPPORT

☎️ 07072050737  
☎️ 09041808503  

💬 Send payment proof & order details here

📌 To buy acct DM the Contact Support
""")


# Auto reply
async def auto_reply(update: Update, context: ContextTypes.DEFAULT_TYPE):
    text = update.message.text.lower()

    if "price" in text:
        await update.message.reply_text("💰 Use /prices to view all prices")

    elif "buy" in text or "account" in text:
        await buy(update, context)

    elif "payment" in text or "pay" in text:
        await pay(update, context)

    elif "support" in text or "admin" in text or "help" in text:
        await support(update, context)

    elif "hi" in text or "hello" in text:
        await update.message.reply_text("👋 Welcome! Use /menu to continue")

    else:
        await update.message.reply_text("🤖 Use /menu to see available options")


# App setup
app = ApplicationBuilder().token(TOKEN).build()

app.add_handler(CommandHandler("start", start))
app.add_handler(CommandHandler("menu", menu))
app.add_handler(CommandHandler("buy", buy))
app.add_handler(CommandHandler("prices", prices))
app.add_handler(CommandHandler("pay", pay))
app.add_handler(CommandHandler("support", support))

app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, auto_reply))

app.run_polling()