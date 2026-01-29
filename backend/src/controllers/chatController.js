import { searchText } from "../services/vectorService.js";
import { generateAnswer } from "../services/chatService.js";

export async function chat(req, res) {
  try{
const { message } = req.body;
  console.log("Received message:", message); 
  const context = await searchText(message);
  const answer = await generateAnswer(message, context);
  console.log("Generated answer:", answer); 
  res.json({ answer });
} 
catch(error){
   console.error("CHAT ERROR:", err);
    res.status(500).json({ answer: "Backend error occurred" });
}
  }
  
