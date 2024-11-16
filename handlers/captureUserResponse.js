import { generateGPTResponse } from "../services/gptResponse"

export function captureUserResponse(bot) {
    bot.on('text', (ctx) => {
        const response = ctx.message.text
        const userId = ctx.message.from.id
        generateGPTResponse(response, ctx, userId)
    })
}