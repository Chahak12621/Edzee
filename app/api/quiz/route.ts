import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export const runtime = "nodejs";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { content, numQuestions, difficulty } = await req.json();

    if (!content || content.length < 50) {
      return NextResponse.json(
        { error: "Content is too short" },
        { status: 400 }
      );
    }

    const prompt = `
You are an expert educational quiz generator.

STRICT RULES:
- Output ONLY raw JSON
- No markdown
- No explanations outside JSON
- JSON must start with { and end with }

Generate ${numQuestions} ${difficulty}-level MCQs.

Each question MUST include:
- question
- options (array of 4 strings)
- answer (must EXACTLY match one option)
- explanation (why that option is correct)

JSON format:
{
  "questions": [
    {
      "question": "string",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "answer": "Option 2",
      "explanation": "Clear short explanation"
    }
  ]
}

CONTENT:
${content}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.3,
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

    const parsed = JSON.parse(jsonMatch[0]);

    return NextResponse.json({
      success: true,
      questions: parsed.questions,
    });
  } catch (err) {
    console.error("Quiz route error:", err);
    return NextResponse.json(
      { error: "Failed to generate quiz" },
      { status: 500 }
    );
  }
}