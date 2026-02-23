import { searchText } from "../services/vectorService.js";
import { generateAnswer } from "../services/chatService.js";

export async function chat(req, res) {
  try {
    const { message } = req.body;
    const greetings = ["hello", "hi", "hey", "namaste"];
if (greetings.includes(message.trim().toLowerCase())) {
  return res.json({ answer: "नमस्ते 🙏 मैं आपकी कैसे सहायता कर सकता हूँ?" });
}
    console.log("Received message:", message);

    const matches = await searchText(message);

    const fallbackMessage = `मेरे पास इस विषय में जानकारी उपलब्ध नहीं है। अधिक जानकारी के लिए कृपया डॉक्टर से संपर्क करें।
7704889455`;

    if (!matches || matches.length === 0 || matches[0].score < 0.65) {
      return res.json({ answer: fallbackMessage });
    }

    // Create context only if relevant
    const context = matches
      .map(match => match.metadata.text)
      .join("\n\n");

    const answer = await generateAnswer(message, context);

    console.log("Generated answer:", answer);
    res.json({ answer });

  } catch (error) {
    console.error("CHAT ERROR:", error);
    res.status(500).json({ answer: "Backend error occurred" });
  }
}