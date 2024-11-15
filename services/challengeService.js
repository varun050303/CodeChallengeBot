import OpenAI from "openai";


console.log(process.env.OPENAI_API_KEY)

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function generateChallenge(difficulty, language, type) {
  try {
    const prompt = `Generate a ${difficulty} level ${type} challenge in ${language} for a developer.`;

    const response = await openai.createCompletion({
      model: "gpt-4o-mini",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 1000,
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.log(error);
  }
}
