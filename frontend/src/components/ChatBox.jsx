import React, { useState } from "react";
import Message from "./Message";
import { sendMessage } from "../services/api";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
    setLoading(true);

    const response = await sendMessage(input);
    console.log(messages)

    // Add bot message
    setMessages((prev) => [...prev, { text: response.answer, sender: "bot" }]);

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, idx) => (
          <Message key={idx} text={msg.text} sender={msg.sender} />
        ))}
        {loading && <Message text="Searching..." sender="bot" />}
      </div>
      <div className="input-box">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
