import dotenv from "dotenv";
import startHandler from "./handlers/startHandler.js";
import { Telegraf, session } from "telegraf";
import callbackQuery from "./handlers/callbackQuery.js";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(session());

startHandler(bot);
callbackQuery(bot);
bot.launch();
