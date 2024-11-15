import { OpenAI } from 'langchain/llms/openai';
import dotenv from 'dotenv';

dotenv.config();

export const handler = async (event) => {
  try {
    // Configurez le modèle OpenAI
    const model = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.7, // Ajustez la température si nécessaire
    });

    // Récupérez les données du corps de la requête
    const body = JSON.parse(event.body);
    const { prompt } = body;

    // Envoyez une requête au modèle
    const response = await model.call(prompt);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: response,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
};
