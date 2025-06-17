import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { topic, timeCommitment, deadline, currentLevel, goals, learningStyle } = await request.json()

    const systemPrompt = `You are an expert learning schedule planner. Create personalized daily and weekly learning schedules that are realistic and effective.`

    const userPrompt = `Create a detailed learning schedule for:
    Topic: ${topic}
    Daily Time Available: ${timeCommitment}
    Target Completion: ${deadline || "No specific deadline"}
    Current Level: ${currentLevel}
    Goals: ${goals}
    Learning Style: ${learningStyle}

    Create:
    1. Daily schedule breakdown
    2. Weekly milestones
    3. Monthly goals
    4. Specific tasks and activities
    5. Progress checkpoints

    Make it realistic and achievable while being comprehensive.`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt: userPrompt,
      maxTokens: 1500,
    })

    return NextResponse.json({ schedule: text })
  } catch (error) {
    console.error("Error generating schedule:", error)
    return NextResponse.json({ error: "Failed to generate schedule" }, { status: 500 })
  }
}
