import openai from "../gptClient";
import { generateGPTResponse } from "./gptResponse";

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
    const response = await generateGPTResponse(prompt)
    let processedResponse = response.choices[0].message.content;
    processedResponse = escapeMarkdown(processedResponse)
    return processedResponse
  } catch (error) {
    console.log(error);
  }
}
