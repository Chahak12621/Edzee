"use client";

import { useState, useEffect } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Welcome to Edzee! I can help you understand how this platform works. Ask me anything!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("edzee_seen");
    if (!seen) {
      setOpen(true);
      localStorage.setItem("edzee_seen", "true");
    }
  }, []);

 const sendMessage = async () => {
  if (!input.trim()) return;

  const newMessages = [
    ...messages,
    { role: "user", content: input },
  ];

  setMessages(newMessages);
  setInput("");
  setLoading(true);

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: newMessages.map((m) => ({
          role: m.role,
          text: m.content,
        })),
      }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: data.reply },
    ]);
  } catch {
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "⚠️ AI is not available right now." },
    ]);
  }

  setLoading(false);
};


  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-black text-white px-5 py-3 rounded-full shadow-lg hover:bg-gray-800"
      >
        💬 Help
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-6 w-96 bg-white border border-black rounded-xl shadow-lg flex flex-col">
          <div className="bg-black text-white px-4 py-2 rounded-t-xl font-semibold">
            Edzee Assistant
          </div>

          <div className="flex-1 p-3 space-y-2 overflow-y-auto text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[85%] ${
                  msg.role === "assistant"
                    ? "bg-gray-200"
                    : "bg-black text-white ml-auto"
                }`}
              >
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="text-xs text-gray-500">Thinking…</div>
            )}
          </div>

          <div className="flex border-t">
            <input
              className="flex-1 p-2 text-sm outline-none"
              placeholder="Ask about Edzee..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="px-4 bg-black text-white"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
