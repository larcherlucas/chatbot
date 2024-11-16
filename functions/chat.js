import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

export const handler = async (event, context) => {
  try {
    const body = event.body;

    const history = JSON.parse(body).history;

    if (!body || !history) {
      return {
        statusCode: 400,
        body: JSON.stringify("No query provided."),
      }
    }

    const llm = new ChatOpenAI({
      model: "gpt-3.5-turbo",
      temperature: 0,
      maxTokens: 4000,
    });

    const aiMsg = await llm.invoke([{
        role: "system",
        content: "You are a helpful buddy that can assist me with my questions. Be funny, nice and engaging.",
      },
      ...history.map((msg) => ({
        role: msg.role,
        content: msg.message,
      }))
    ]);

    return {
      statusCode: 200,
      body: JSON.stringify(aiMsg.content),
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
        stack: error.stack,
      }),
    }
  }
}
