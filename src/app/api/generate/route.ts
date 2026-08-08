import Groq from "groq-sdk"
import { NextRequest, NextResponse } from "next/server"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    let body
    try {
      body = await req.json()
    } catch {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      )
    }

    const { prompt } = body

    if (!prompt || !prompt.trim()) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      )
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // free and fast
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 1024,
    })

    const result = completion.choices[0]?.message?.content || ""

    return NextResponse.json({ result })

  } catch (error) {
    console.error("Route error:", error)
    return NextResponse.json(
      { error: "Something went wrong", details: String(error) },
      { status: 500 }
    )
  }
}