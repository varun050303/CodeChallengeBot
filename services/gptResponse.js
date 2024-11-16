import openai from "../gptClient"

export async function generateGPTResponse(prompt) {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.8,
            max_tokens: 130,
        })
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error generating gpt response:', error);
        throw error;
    }

}