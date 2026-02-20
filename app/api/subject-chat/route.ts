import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

const SYSTEM_PROMPT = `
You are Chatbot tutor of the subject whihc is given and you have to solve queries about that particular subject.
`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

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
      reply: completion.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { reply: "Namaste 🙏 Thoda traffic hai, please try again!" },
      { status: 500 }
    );
  }
}
