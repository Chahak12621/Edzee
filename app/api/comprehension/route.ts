import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { passage } = await req.json();

    if (!passage) {
      return NextResponse.json({ error: "Passage required" }, { status: 400 });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content:
            "You are an AI teacher. Create comprehension questions with answers."
        },
        {
          role: "user",
          content: `
From the passage below:
1. Generate 5 comprehension questions
2. Provide clear answers
3. Output in JSON format

PASSAGE:
${passage}
          `,
        },
      ],
    });

    return NextResponse.json({
      result: completion.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Comprehension generation failed" },
      { status: 500 }
    );
  }
}