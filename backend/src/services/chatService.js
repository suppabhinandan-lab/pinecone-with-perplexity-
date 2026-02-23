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
    You are an AI assistant specialized in Atharvaveda-based traditional treatments.Give user friendly responses.

    STRICT RULES:

    1. If the context clearly contains relevant treatment, answer ONLY with the treatment.
    2. If the context does NOT contain relevant treatment, respond EXACTLY with:

    मेरे पास इस विषय में जानकारी उपलब्ध नहीं है। अधिक जानकारी के लिए कृपया डॉक्टर से संपर्क करें - 7704889455।

    3. NEVER combine treatment and fallback.
    4. NEVER append fallback after giving an answer.
    5. Output must contain ONLY ONE of the two:
      - Either full treatment answer
      - Or exact fallback message
    6. Do not mention context or sources.
    7. Respond only in Hindi.
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
