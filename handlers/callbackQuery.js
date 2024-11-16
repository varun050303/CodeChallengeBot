import { Markup, session } from "telegraf";
import generateChallenge from "../services/challengeService.js";
import { removeKeyboard } from "telegraf/markup";


export default function callbackQuery(bot) {
  bot.action(["Easy", "Medium", "Hard"], async (ctx) => {
    const difficulty = ctx.match; // Retrieve the selected difficulty
    console.log("session", ctx.session);
    ctx.session.difficulty = difficulty; // Store the selected difficulty in the session

    ctx.reply(
      `You selected ${difficulty}. Now choose a language:`,
      Markup.inlineKeyboard([
        Markup.button.callback("JavaScript", "JS"),
        Markup.button.callback("Python", "PY"),
        Markup.button.callback("Java", "JAVA"),
      ]),
    );
  });

  bot.action(["JS", "PY", "JAVA"], async (ctx) => {
    const language = ctx.match;
    ctx.session.language = language;

    ctx.reply(
      `You selected ${language}. Now choose type of question:`,
      Markup.inlineKeyboard([
        Markup.button.callback("Text", "Text"),
        Markup.button.callback("Boolean", "Boolean"),
        Markup.button.callback("MCQ", "MCQ"),
      ]),
    );
  });

  bot.action(["Text", "Boolean", "MCQ"], async (ctx) => {
    const type = ctx.match;
    ctx.session.type = type;

    const { difficulty, language } = ctx.session;
    const challenge = await generateChallenge(difficulty, language, type);
    ctx.reply(
      `Here is your ${difficulty} ${language} question (${type}):\n\n${challenge}`, { parse_mode: 'Markdown', reply_markup: { removeKeyboard: true } }
    );

    ctx.session.challenge = challenge
  });
}
