import { searchText } from "../services/vectorService.js";
import { generateAnswer } from "../services/chatService.js";

export async function chat(req, res) {
  const { message } = req.body;

  const context = await searchText(message);
  const answer = await generateAnswer(message, context);

  res.json({ answer });
}
