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
      model: "openai/gpt-oss-120b", 
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

    const status =
      typeof error === "object" && error !== null && "status" in error
        ? Number((error as { status?: number }).status) || 502
        : 502

    const message =
      status === 404
        ? "The configured model is unavailable. Check GROQ model ID against console.groq.com."
        : status === 401
        ? "Groq API key is missing or invalid."
        : status === 429
        ? "Rate limit exceeded — try again shortly."
        : "Something went wrong calling the model."

    return NextResponse.json(
      { error: message, details: String(error instanceof Error ? error.message : error) },
      { status }
    )
  }
}