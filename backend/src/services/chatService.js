import OpenAI from "openai";
import { index } from "../config/pinecone.js";

const client = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY,
  baseURL: "https://api.perplexity.ai",
});

export async function generateAnswer(question, context) {

  // 1 Handle greetings before LLM
  const greetings = ["hello", "hi", "hey", "namaste"];
  if (greetings.includes(question.trim().toLowerCase())) {
    return "नमस्ते 🙏 मैं आपकी कैसे सहायता कर सकता हूँ?";
  }

  // If no valid context → return fallback directly
  if (!context || context.trim().length === 0) {
    return `मेरे पास इस विषय में जानकारी उपलब्ध नहीं है। अधिक जानकारी के लिए कृपया डॉक्टर से संपर्क करें।
7704889455`;
  }

  const res = await client.chat.completions.create({
    model: "sonar-pro",
    temperature: 0, // 🔥 reduce hallucination
    messages: [
      {
        role: "system",
        content: `
You are an AI assistant specialized in Atharvaveda-based traditional treatments.

STRICT INSTRUCTIONS:

1. Answer ONLY if the context clearly contains treatment information related to the question.
2. If the context is unrelated or insufficient, respond EXACTLY with:

मेरे पास इस विषय में जानकारी उपलब्ध नहीं है। अधिक जानकारी के लिए कृपया डॉक्टर से संपर्क करें।
7704889455

3. Do NOT combine answer and fallback.
4. Do NOT add any new treatments not present in the context.
5. Do NOT mention context or sources.
6. Respond only in Hindi.
`
      },
      {
        role: "user",
        content: `Context:
${context}

Question:
${question}`
      }
    ],
  });

  return res.choices[0].message.content.trim();
}
