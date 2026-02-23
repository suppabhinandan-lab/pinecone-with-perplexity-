import OpenAI from "openai";
import { index } from "../config/pinecone.js";

const client = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY,
  baseURL: "https://api.perplexity.ai",
});

export async function generateAnswer(question, context) {
  const res = await client.chat.completions.create({
    model: "sonar-pro",
   messages: [
  {
    role: "system",
    content: `
    You are an AI assistant specialized in Atharvaveda-based traditional treatments.

    Strict Rules:
    1. You must answer ONLY using the provided context.
    2. Do NOT use outside knowledge.
    3. Do NOT guess or assume.
    4. If the context does not clearly contain the answer, respond exactly with:

    "मेरे पास इस विषय में जानकारी उपलब्ध नहीं है। अधिक जानकारी के लिए कृपया डॉक्टर से संपर्क करें।
    7704889455"

    5. Do NOT mention context, database, or sources.
    6. Keep answers natural and in Hindi.
    `
  },
  {
    role: "user",
    content: `Context:\n${context}\n\nQuestion:\n${question}`
  }
],
  });
  return res.choices[0].message.content;
}
