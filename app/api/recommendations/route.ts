import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { topic, level, goals, progress } = await request.json()

    const systemPrompt = `You are an expert educational advisor. Provide personalized learning recommendations including YouTube videos, free ebooks, and study resources.`

    const userPrompt = `Provide learning recommendations for:
    Topic: ${topic}
    Level: ${level}
    Goals: ${goals}
    Current Progress: ${progress}%

    Please recommend:
    1. 3-5 YouTube videos/channels (provide realistic channel names and video titles)
    2. 2-3 free ebooks from platforms like OpenLibrary, Project Gutenberg, or similar
    3. Additional learning resources
    4. Study strategies specific to this topic and level

    Format as JSON with categories: youtube, ebooks, resources, strategies`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt: userPrompt,
      maxTokens: 1500,
    })

    // Try to parse as JSON, fallback to structured text
    let recommendations
    try {
      recommendations = JSON.parse(text)
    } catch {
      recommendations = { content: text }
    }

    return NextResponse.json({ recommendations })
  } catch (error) {
    console.error("Error generating recommendations:", error)
    return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 500 })
  }
}
