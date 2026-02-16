const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on('document', async (ctx) => {
  const doc = ctx.message.document;

  if (doc.mime_type !== 'application/pdf')
    return ctx.reply('Lütfen PDF gönderin.');

  const pdfUrl = await ctx.telegram.getFileLink(doc.file_id);

  const imageUrl = `https://images.weserv.nl/?url=${encodeURIComponent(pdfUrl.href)}&output=jpg&page=0`;

  await ctx.replyWithPhoto(imageUrl, {
    caption: "PDF ilk sayfası"
  });
});

bot.launch();
console.log("Bot çalışıyor...");
