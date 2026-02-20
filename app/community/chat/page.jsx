"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [subject, setSubject] = useState("mathematics");
  const [loading, setLoading] = useState(false);
  const messagesEnd = useRef(null);

  useEffect(() => {
  const token = localStorage.getItem("token");
  console.log("Current Token:", token); 
  if (!token) {
    console.log("No token found, redirecting...");
    router.push("/auth/login");
    return; 
  }
  
    const params = new URLSearchParams(window.location.search);
    const urlSubject = params.get("subject");
    if (urlSubject) {
      setSubject(urlSubject);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/subject-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, message: input })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      
      setMessages((prev) => [...prev, { role: "assistant", content: data.response || "No response" }]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [...prev, { role: "assistant", content: `Error: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <nav className="w-full bg-black text-white px-8 py-4 flex justify-between items-center shadow-md">
        <div className="font-semibold text-lg">Edzee Chat</div>
        <Link href="/dashboard/home" className="text-white hover:text-gray-300">Dashboard</Link>
      </nav>

      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        <div className="p-8 flex-1 overflow-y-auto border-b-4 border-black">
          {messages.length === 0 && (
            <div className="text-center text-gray-700 py-12">
              <p className="text-xl font-semibold">Welcome to Edzee Chat</p>
              <p>Ask anything about {subject}</p>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div key={idx} className={`mb-4 ${msg.role === "user" ? "text-right" : "text-left"}`}>
              <div
                className={`inline-block max-w-xs px-4 py-2 rounded-lg border-2 ${
                  msg.role === "user"
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-black"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && <div className="text-gray-700 text-sm">Edzee is typing...</div>}
          <div ref={messagesEnd} />
        </div>

        <form onSubmit={handleSendMessage} className="p-8 border-t-4 border-black">
          <div className="flex gap-4 mb-4">
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="p-3 border-2 border-black rounded-lg bg-white text-black"
            >
              <option value="mathematics">Mathematics</option>
              <option value="science">Science</option>
              <option value="history">History</option>
              <option value="literature">Literature</option>
            </select>
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 p-3 border-2 border-black rounded-lg bg-white text-black"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition disabled:bg-gray-600 font-bold"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
