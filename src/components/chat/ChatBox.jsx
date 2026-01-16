import { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";

function ChatBox({ notes = [], onAddToNote, onCreateNote, openNotes }) {
  const [chat, setChat] = useState([
    { sender: "ai", text: "Hi 👋 I’m your AI tutor. Ask me anything!" },
  ]);
  const [message, setMessage] = useState("");
  const [lastQuestion, setLastQuestion] = useState("");
  const [lastAnswer, setLastAnswer] = useState("");

  const bottomRef = useRef(null);

  // auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  // send message
  const sendMessage = async () => {
    if (!message.trim()) return;

    setChat((prev) => [...prev, { sender: "user", text: message }]);
    setLastQuestion(message);
    setMessage("");

    try {
      const res = await fetch("http://localhost:4000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      const reply = data.reply || "Sorry, I couldn’t understand that.";

      setChat((prev) => [...prev, { sender: "ai", text: reply }]);
      setLastAnswer(reply);
    } catch {
      const errMsg = "❌ Error connecting to AI server";
      setChat((prev) => [...prev, { sender: "ai", text: errMsg }]);
      setLastAnswer(errMsg);
    }
  };

  // save to notes
  const saveToNotes = () => {
    if (!lastQuestion || !lastAnswer) return;

    const note = {
      question: lastQuestion,
      answer: lastAnswer,
    };

    if (notes.length === 0) {
      onCreateNote("My Notes", note);
    } else {
      onAddToNote(notes[0].id, note);
    }

    openNotes();
  };

  return (
    /* 🌑 FULL SCREEN BACKGROUND */
    <div className="fixed inset-0 flex items-center justify-center bg-[#0b1220]">

      {/* 🟦 CHAT BOX (CENTER & LARGE) */}
      <div className="w-full max-w-5xl h-[90vh] bg-[#1f2937] rounded-xl shadow-2xl flex flex-col">

        {/* 🔷 HEADER */}
        <div className="h-14 px-6 flex items-center justify-between border-b border-gray-700 text-white">
          <div className="flex items-center gap-2 font-semibold text-lg">
            🤖 AI Tutor
          </div>
          <div className="h-2 w-2 rounded-full bg-green-400"></div>
        </div>

        {/* 💬 MESSAGES */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {chat.map((msg, i) => (
            <div key={i}>
              <ChatMessage sender={msg.sender} text={msg.text} />

              {/* 📌 Save to Notes (same as reference image) */}
              {msg.sender === "ai" && i === chat.length - 1 && (
                <button
                  onClick={saveToNotes}
                  className="text-xs text-indigo-400 hover:underline mt-1 ml-2"
                >
                  📌 Save to Notes
                </button>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* ⌨ INPUT */}
        <div className="p-4 border-t border-gray-700 flex gap-3 bg-[#111827]">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your question..."
            className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-600 text-white px-6 rounded-lg hover:bg-indigo-700"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
}

export default ChatBox;
