"use server";
import OpenAI from "openai";


const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
})

export const GenerateContent = async (finalAIPrompt: any) => {
  try {
    const result = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "assistant", content: `${finalAIPrompt}` }],
    });
    if (result) {
      const response = {
        content: result.choices[0].message.content,
      };
      return response.content;
    }
  } catch (error) {
    console.log(error);
  }
};

export const GenerateAIContent = async (
  formData: any,
  aiPrompt: string,
) => {

  const selectedPrompt = aiPrompt;
  const finalAIPrompt = `${JSON.stringify(formData)}, ${selectedPrompt}`;
  const output = await GenerateContent(finalAIPrompt);
  
  return output
};

