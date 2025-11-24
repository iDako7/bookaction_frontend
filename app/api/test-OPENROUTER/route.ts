import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

const openrouter = createOpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function GET() {
  if (!process.env.OPENROUTER_API_KEY) {
    return new Response("Missing OPENROUTER_API_KEY", { status: 500 });
  }

  const result = await generateText({
    model: openrouter("openai/gpt-4o-mini"),
    prompt: "Say hello from OpenRouter in one sentence.",
  });

  console.log("[test-openrouter] text:", result.text);

  return Response.json({ text: result.text });
}