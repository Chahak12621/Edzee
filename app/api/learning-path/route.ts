import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export const runtime = "nodejs";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { topic, level, duration } = await req.json();

    if (!topic || !level || !duration) {
      return NextResponse.json(
        { error: "Missing topic, level, or duration" },
        { status: 400 }
      );
    }

    const prompt = `
You are an expert exam preparation strategist.

Create a ${duration}-day learning plan for:
Topic: ${topic}
Level: ${level}

STRICT RULES:
- Output ONLY valid JSON
- No markdown
- No explanations outside JSON

JSON format:
{
  "title": "string",
  "days": [
    {
      "day": 1,
      "title": "string",
      "tasks": ["task 1", "task 2"],
      "resources": ["resource 1", "resource 2"],
      "duration": 60
    }
  ]
}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.4,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = completion.choices[0]?.message?.content || "";

    const jsonMatch = raw.match(/\{[\s\S]*\}$/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: "AI did not return valid JSON", raw },
        { status: 500 }
      );
    }

    const plan = JSON.parse(jsonMatch[0]);

    return NextResponse.json({ plan });

  } catch (err) {
    console.error("Learning path error:", err);
    return NextResponse.json(
      { error: "Failed to generate learning plan" },
      { status: 500 }
    );
  }
}