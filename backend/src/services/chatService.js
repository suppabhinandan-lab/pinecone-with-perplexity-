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
      { role: "system", content: "You are a helpful AI assistant. Use the provided context to answer the question in a natural way. If the answer is not in the context, say you don't know. Do NOT mention context or sources." },
      { role: "user", content: `Context:\n${context}\n\nQ:${question}` },
    ],
  });
  // const stats = await index.describeIndexStats();
  // console.log(stats);

  const result =   await index.fetch(ids=["doc-1"]                                      )
    console.log(result); // [{ id: 'doc1#chunk1' }, { id: 'doc2#chunk1' }, ...]

  return res.choices[0].message.content;
}
