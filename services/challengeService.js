import OpenAI from "openai";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function escapeMarkdown(text) {
  return text.replace(/([_*[\]()>#+-.!])/g, '\\$1'); // Escape special characters in Markdown
}

export default async function generateChallenge(difficulty, language, type) {
  try {
    const prompt = `
    Question Language : ${language}
    Question Type : ${type}
    Difficulty Level : ${difficulty}
    Keep Question Straightforward
    Use Markup language as per telegram standards
    Dont add anything other than question - "feel free to ask , thanks , apologies, or other words"
    Do not add output or answer in response
    Do not repeat the previous questions
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 130,
    });

    let processedResponse = response.choices[0].message.content;
    processedResponse = escapeMarkdown(processedResponse)

    return processedResponse
  } catch (error) {
    console.log(error);
  }
}
