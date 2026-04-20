import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateFields } from "../redux/interactionSlice";

export default function ChatPanel() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message first
    const updatedMessages = [
      ...messages,
      { role: "user", text: input },
    ];
    setMessages(updatedMessages);

    try {
      const res = await axios.post("http://127.0.0.1:8000/chat", {
        input: input, // ✅ IMPORTANT (must match backend)
      });

      // Update Redux (form auto-fill)
      dispatch(updateFields(res.data.parsed));

      // Add AI response (dynamic change summary)
      setMessages([
        ...updatedMessages,
        {
          role: "ai",
          text: res.data.message || "✅ Updated successfully",
        },
      ]);

      setInput(""); // clear input
    } catch (error) {
      console.error("Error:", error);

      setMessages([
        ...updatedMessages,
        {
          role: "ai",
          text: "❌ Error connecting to backend",
        },
      ]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>AI Assistant</h3>
        <p>Log interaction via chat</p>
      </div>

      {/* Chat history */}
      <div className="chat-history">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "user-msg" : "ai-msg"}>
            {m.text}
          </div>
        ))}
      </div>

      {/* Input box */}
      <div className="chat-input">
        <input
          value={input}
          placeholder="Describe interaction..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Log</button>
      </div>
    </div>
  );
}