"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Brain, Clock, Target, User } from "lucide-react"

const learningStyles = [
  { id: "visual", label: "Visual", description: "Learn through images, diagrams, and charts" },
  { id: "auditory", label: "Auditory", description: "Learn through listening and discussion" },
  { id: "reading", label: "Reading/Writing", description: "Learn through text and written materials" },
  { id: "kinesthetic", label: "Kinesthetic", description: "Learn through hands-on activities" },
]

const difficultyLevels = [
  { id: "beginner", label: "Beginner", description: "New to this topic" },
  { id: "intermediate", label: "Intermediate", description: "Some knowledge and experience" },
  { id: "advanced", label: "Advanced", description: "Experienced and looking to deepen knowledge" },
  { id: "expert", label: "Expert", description: "Highly experienced, seeking specialized knowledge" },
]

export default function OnboardingPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 5

  const [formData, setFormData] = useState({
    topic: searchParams.get("topic") || "",
    goal: searchParams.get("goal") || "",
    name: "",
    age: "",
    currentLevel: "",
    learningStyles: [] as string[],
    timeCommitment: "",
    deadline: "",
    specificAreas: "",
    careerGoals: "",
    preferredFormats: [] as string[],
  })

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      // Save data and redirect to dashboard
      localStorage.setItem("userProfile", JSON.stringify(formData))
      router.push("/dashboard")
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      router.push("/")
    }
  }

  const handleLearningStyleChange = (styleId: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        learningStyles: [...prev.learningStyles, styleId],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        learningStyles: prev.learningStyles.filter((id) => id !== styleId),
      }))
    }
  }

  const handleFormatChange = (format: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        preferredFormats: [...prev.preferredFormats, format],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        preferredFormats: prev.preferredFormats.filter((f) => f !== format),
      }))
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Tell us about yourself
              </CardTitle>
              <CardDescription>Help us personalize your learning experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Your name"
                />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData((prev) => ({ ...prev, age: e.target.value }))}
                  placeholder="Your age"
                />
              </div>
              <div>
                <Label htmlFor="topic">Learning Topic</Label>
                <Input
                  id="topic"
                  value={formData.topic}
                  onChange={(e) => setFormData((prev) => ({ ...prev, topic: e.target.value }))}
                  placeholder="What do you want to learn?"
                />
              </div>
              <div>
                <Label htmlFor="goal">Learning Goal</Label>
                <Textarea
                  id="goal"
                  value={formData.goal}
                  onChange={(e) => setFormData((prev) => ({ ...prev, goal: e.target.value }))}
                  placeholder="What do you hope to achieve?"
                />
              </div>
            </CardContent>
          </Card>
        )

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Your Learning Level
              </CardTitle>
              <CardDescription>What's your current knowledge level in {formData.topic}?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {difficultyLevels.map((level) => (
                  <div
                    key={level.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.currentLevel === level.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setFormData((prev) => ({ ...prev, currentLevel: level.id }))}
                  >
                    <div className="font-medium">{level.label}</div>
                    <div className="text-sm text-gray-600">{level.description}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Learning Preferences</CardTitle>
              <CardDescription>How do you learn best? Select all that apply.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {learningStyles.map((style) => (
                  <div key={style.id} className="flex items-start space-x-3">
                    <Checkbox
                      id={style.id}
                      checked={formData.learningStyles.includes(style.id)}
                      onCheckedChange={(checked) => handleLearningStyleChange(style.id, checked as boolean)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor={style.id} className="font-medium">
                        {style.label}
                      </Label>
                      <p className="text-sm text-gray-600">{style.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Time & Schedule
              </CardTitle>
              <CardDescription>Help us create a realistic learning schedule</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="timeCommitment">Daily Time Commitment</Label>
                <Select
                  value={formData.timeCommitment}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, timeCommitment: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="How much time can you dedicate daily?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15-30">15-30 minutes</SelectItem>
                    <SelectItem value="30-60">30-60 minutes</SelectItem>
                    <SelectItem value="1-2">1-2 hours</SelectItem>
                    <SelectItem value="2+">2+ hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="deadline">Target Completion Date (Optional)</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData((prev) => ({ ...prev, deadline: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="specificAreas">Specific Areas of Interest</Label>
                <Textarea
                  id="specificAreas"
                  value={formData.specificAreas}
                  onChange={(e) => setFormData((prev) => ({ ...prev, specificAreas: e.target.value }))}
                  placeholder="Any specific topics or skills you want to focus on?"
                />
              </div>
            </CardContent>
          </Card>
        )

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Career & Content Preferences
              </CardTitle>
              <CardDescription>Final details to optimize your learning experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="careerGoals">Career Goals</Label>
                <Textarea
                  id="careerGoals"
                  value={formData.careerGoals}
                  onChange={(e) => setFormData((prev) => ({ ...prev, careerGoals: e.target.value }))}
                  placeholder="How does this learning relate to your career goals?"
                />
              </div>
              <div>
                <Label>Preferred Content Formats</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {[
                    "Text explanations",
                    "Video content",
                    "Interactive quizzes",
                    "Downloadable PDFs",
                    "Audio/Podcasts",
                    "Visual diagrams",
                    "Hands-on exercises",
                    "Real-world examples",
                  ].map((format) => (
                    <div key={format} className="flex items-center space-x-2">
                      <Checkbox
                        id={format}
                        checked={formData.preferredFormats.includes(format)}
                        onCheckedChange={(checked) => handleFormatChange(format, checked as boolean)}
                      />
                      <Label htmlFor={format} className="text-sm">
                        {format}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">LearnAI</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Step {currentStep} of {totalSteps}
            </span>
            <Progress value={(currentStep / totalSteps) * 100} className="w-32" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Let's personalize your learning journey</h1>
            <p className="text-gray-600">
              We'll use this information to create the perfect learning experience for you.
            </p>
          </div>

          {renderStep()}

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button onClick={handleNext} className="flex items-center gap-2">
              {currentStep === totalSteps ? "Start Learning" : "Next"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
