"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Brain, Target, TrendingUp, Users, Zap } from "lucide-react"
import { useRouter } from "next/navigation"

const popularTopics = [
  "Machine Learning",
  "Web Development",
  "Data Science",
  "Digital Marketing",
  "Photography",
  "Python Programming",
  "Business Strategy",
  "Graphic Design",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "Literature",
]

export default function HomePage() {
  const [topic, setTopic] = useState("")
  const [learningGoal, setLearningGoal] = useState("")
  const router = useRouter()

  const handleStartLearning = () => {
    if (topic.trim()) {
      const params = new URLSearchParams({
        topic: topic.trim(),
        goal: learningGoal.trim(),
      })
      router.push(`/onboarding?${params.toString()}`)
    }
  }

  const handleTopicSelect = (selectedTopic: string) => {
    setTopic(selectedTopic)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">LearnAI</span>
          </div>
          <Button variant="outline">Sign In</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Learn Anything with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}
              AI-Powered{" "}
            </span>
            Education
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Personalized learning experiences that adapt to your pace, style, and goals. Get explanations, visual
            content, quizzes, and career guidance all in one place.
          </p>

          {/* Topic Input */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-col space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="What do you want to learn today? (e.g., Machine Learning, Web Development)"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="text-lg py-3"
                />
                <Button onClick={handleStartLearning} size="lg" className="px-8" disabled={!topic.trim()}>
                  Start Learning
                </Button>
              </div>
              <Input
                placeholder="What's your learning goal? (Optional - e.g., Get a job, Pass an exam)"
                value={learningGoal}
                onChange={(e) => setLearningGoal(e.target.value)}
                className="text-base"
              />
            </div>
          </div>

          {/* Popular Topics */}
          <div className="mb-12">
            <p className="text-sm text-gray-500 mb-4">Popular topics:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {popularTopics.map((popularTopic) => (
                <Badge
                  key={popularTopic}
                  variant="secondary"
                  className="cursor-pointer hover:bg-blue-100 hover:text-blue-700 transition-colors"
                  onClick={() => handleTopicSelect(popularTopic)}
                >
                  {popularTopic}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Everything You Need to Master Any Subject
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <BookOpen className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Personalized Content</CardTitle>
              <CardDescription>
                AI-generated explanations, images, graphs, and downloadable PDFs tailored to your learning style
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Target className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Smart Goal Setting</CardTitle>
              <CardDescription>
                Set learning goals and get daily schedules to stay on track with your educational journey
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>
                Monitor your daily progress with detailed analytics and adaptive learning recommendations
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Zap className="h-12 w-12 text-yellow-600 mb-4" />
              <CardTitle>Interactive Quizzes</CardTitle>
              <CardDescription>
                Age and knowledge-appropriate quizzes that adapt to your learning level and pace
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 text-red-600 mb-4" />
              <CardTitle>Career Preparation</CardTitle>
              <CardDescription>
                Get employment-focused guidance and skills development for your career goals
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Brain className="h-12 w-12 text-indigo-600 mb-4" />
              <CardTitle>Multi-Format Learning</CardTitle>
              <CardDescription>
                Upload YouTube links, PDFs, or documents for AI-powered explanations and podcast-style content
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Learning?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of learners who are achieving their goals with AI-powered education
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => document.querySelector("input")?.focus()}
            className="px-8 py-3 text-lg"
          >
            Start Learning Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-6 w-6" />
                <span className="text-xl font-bold">LearnAI</span>
              </div>
              <p className="text-gray-400">AI-powered education platform for personalized learning experiences.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Personalized Content</li>
                <li>Progress Tracking</li>
                <li>Interactive Quizzes</li>
                <li>Goal Setting</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>YouTube Integration</li>
                <li>Free eBooks</li>
                <li>PDF Generation</li>
                <li>Career Guidance</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LearnAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
