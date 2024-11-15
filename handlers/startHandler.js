import { Markup } from "telegraf";

export default function startHandler(bot) {
  bot.start((ctx) => {
    ctx.session = {};
    return ctx.reply(
      "Choose difficulty:",
      Markup.inlineKeyboard([
        Markup.button.callback("Easy", "Easy"),
        Markup.button.callback("Medium", "Medium"),
        Markup.button.callback("Hard", "Hard"),
      ]),
    );
  });
}
