import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

const SYSTEM_PROMPT = `
You are a chatbot tutor. Answer only questions related to the given subject.
`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const messages = Array.isArray(body?.messages) ? body.messages : [];

    const groqMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((m: { role: string; text: string }) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.text,
      })),
    ];

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: groqMessages,
      temperature: 0.6,
    });

    return NextResponse.json({
      reply: completion.choices?.[0]?.message?.content ?? "No response",
    });
  } catch (err) {
    console.error("Groq API error:", err);
    return NextResponse.json(
      { reply: "Namaste 🙏 Server thoda busy hai, please try again." },
      { status: 500 }
    );
  }
}