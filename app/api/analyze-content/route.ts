import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { content, contentType, userLevel, analysisType } = await request.json()

    const systemPrompt = `You are an expert educational analyst. Analyze the provided content and create educational materials based on it.`

    let userPrompt = `Analyze this ${contentType} content and create ${analysisType} based on it:\n\n${content}\n\n`

    switch (analysisType) {
      case "summary":
        userPrompt += `Create a comprehensive summary suitable for ${userLevel} level learners. Include key points, main concepts, and important takeaways.`
        break
      case "explanation":
        userPrompt += `Provide a detailed explanation of the content, breaking down complex concepts for ${userLevel} level understanding.`
        break
      case "quiz":
        userPrompt += `Create a quiz with 5-8 questions based on this content, appropriate for ${userLevel} level learners.`
        break
      case "podcast":
        userPrompt += `Create a podcast script that explains this content in an engaging, conversational way suitable for audio learning.`
        break
      case "visual":
        userPrompt += `Describe how to create visual representations (diagrams, charts, infographics) of this content.`
        break
    }

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt: userPrompt,
      maxTokens: 2000,
    })

    return NextResponse.json({ analysis: text })
  } catch (error) {
    console.error("Error analyzing content:", error)
    return NextResponse.json({ error: "Failed to analyze content" }, { status: 500 })
  }
}
