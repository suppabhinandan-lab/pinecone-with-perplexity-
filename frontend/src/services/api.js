const API_URL = "https://pinecone-with-perplexity.onrender.com/api/chat"; // Your Express backend URL

export const sendMessage = async (message) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    console.log(data,'=======')
    return data; // Expected: { reply: "..." }
  } catch (err) {
    console.error("Error sending message:", err);
    return { answer: "Something went wrong! Try again later." };
  }
};
