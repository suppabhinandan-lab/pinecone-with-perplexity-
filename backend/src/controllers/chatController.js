import { searchText } from "../services/vectorService.js";
import { generateAnswer } from "../services/chatService.js";

export async function chat(req, res) {
  const { message } = req.body;
  console.log("Received message:", message); 
  const context = await searchText(message);
  const answer = await generateAnswer(message, context);
    console.log("Generated answer:", answer); 

  res.json({ answer });
}
