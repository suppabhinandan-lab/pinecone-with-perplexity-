import { searchText } from "../services/vectorService.js";
import { generateAnswer } from "../services/chatService.js";

export async function chat(req, res) {
  try{
const { message } = req.body;
if(!message || typeof message==='string'){
  return res.status(400).json({answer:"Invalid message"});
}
const cleanedMessage=message.trim().toLowerCase();
  console.log("Received message:", cleanedMessage); 
   const greetings = ["hello", "hi", "hey", "namaste"];
    if (greetings.includes(cleanedMessage)) {
      return res.json({
        answer: "नमस्ते 🙏 मैं आपकी कैसे सहायता कर सकता हूँ?"
      });
    }
  const context = await searchText(cleanedMessage);
  const answer = await generateAnswer(cleanedMessage, context);
  console.log("Generated answer:", answer); 
  res.json({ answer });
} 
catch(error){
   console.error("CHAT ERROR:", err);
    res.status(500).json({ answer: "Backend error occurred" });
}
  }
  
