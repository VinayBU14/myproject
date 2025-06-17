import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { topic, level, learningStyle, contentType, specificAreas } = await request.json()

    const systemPrompt = `You are an expert educational content creator. Create comprehensive, engaging learning content that adapts to the user's level and learning style.`

    let userPrompt = `Create ${contentType} content for learning "${topic}" at ${level} level.`

    if (learningStyle) {
      userPrompt += ` The learner prefers ${learningStyle} learning style.`
    }

    if (specificAreas) {
      userPrompt += ` Focus on these specific areas: ${specificAreas}.`
    }

    switch (contentType) {
      case "lesson":
        userPrompt += ` Create a structured lesson with:
        1. Learning objectives
        2. Key concepts explanation
        3. Examples and analogies
        4. Practice exercises
        5. Summary and next steps`
        break
      case "summary":
        userPrompt += ` Create a concise summary with bullet points covering the main concepts.`
        break
      case "quiz":
        userPrompt += ` Create 5-10 multiple choice questions with explanations for each answer.`
        break
      case "explanation":
        userPrompt += ` Provide a detailed explanation with real-world examples and analogies.`
        break
    }

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt: userPrompt,
      maxTokens: 2000,
    })

    return NextResponse.json({ content: text })
  } catch (error) {
    console.error("Error generating content:", error)
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 })
  }
}
