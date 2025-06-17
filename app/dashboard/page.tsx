"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Brain,
  Calendar,
  Clock,
  Download,
  FileText,
  Play,
  Target,
  TrendingUp,
  Upload,
  Youtube,
  CheckCircle,
  Circle,
  Award,
  BarChart3,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface UserProfile {
  name: string
  topic: string
  goal: string
  currentLevel: string
  timeCommitment: string
  deadline: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [currentStreak, setCurrentStreak] = useState(7)
  const [totalProgress, setTotalProgress] = useState(35)

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile")
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile))
    } else {
      router.push("/")
    }
  }, [router])

  const todaysTasks = [
    { id: 1, title: "Read: Introduction to Machine Learning", completed: true, time: "20 min" },
    { id: 2, title: "Watch: Linear Regression Explained", completed: true, time: "15 min" },
    { id: 3, title: "Quiz: Basic ML Concepts", completed: false, time: "10 min" },
    { id: 4, title: "Practice: Python Data Structures", completed: false, time: "30 min" },
  ]

  const weeklyGoals = [
    { goal: "Complete 5 lessons", current: 3, target: 5 },
    { goal: "Pass 3 quizzes", current: 2, target: 3 },
    { goal: "Study 5 hours", current: 3.5, target: 5 },
  ]

  const recentContent = [
    { title: "Machine Learning Fundamentals", type: "PDF", date: "2 hours ago" },
    { title: "Python for Data Science", type: "Video", date: "1 day ago" },
    { title: "Statistics Basics", type: "Article", date: "2 days ago" },
  ]

  if (!userProfile) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">LearnAI</span>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Award className="h-4 w-4" />
              {currentStreak} day streak
            </Badge>
            <Button variant="outline">Settings</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {userProfile.name}! 👋</h1>
          <p className="text-gray-600">
            You're learning <strong>{userProfile.topic}</strong> • {totalProgress}% complete
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Progress</span>
                      <span>{totalProgress}%</span>
                    </div>
                    <Progress value={totalProgress} className="h-2" />
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">12</div>
                      <div className="text-sm text-gray-600">Lessons Completed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">8</div>
                      <div className="text-sm text-gray-600">Quizzes Passed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">24h</div>
                      <div className="text-sm text-gray-600">Time Studied</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Today's Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Today's Learning Plan
                </CardTitle>
                <CardDescription>Complete these tasks to stay on track with your goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todaysTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        task.completed ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {task.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <Circle className="h-5 w-5 text-gray-400" />
                        )}
                        <div>
                          <div className={`font-medium ${task.completed ? "text-green-800" : "text-gray-900"}`}>
                            {task.title}
                          </div>
                          <div className="text-sm text-gray-600 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {task.time}
                          </div>
                        </div>
                      </div>
                      {!task.completed && <Button size="sm">Start</Button>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Content Tabs */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Content</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="generate" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="generate">Generate</TabsTrigger>
                    <TabsTrigger value="upload">Upload</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                    <TabsTrigger value="quiz">Quiz</TabsTrigger>
                  </TabsList>

                  <TabsContent value="generate" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Button className="h-20 flex-col gap-2" variant="outline">
                        <FileText className="h-6 w-6" />
                        Generate Lesson
                      </Button>
                      <Button className="h-20 flex-col gap-2" variant="outline">
                        <BarChart3 className="h-6 w-6" />
                        Create Diagram
                      </Button>
                      <Button className="h-20 flex-col gap-2" variant="outline">
                        <Download className="h-6 w-6" />
                        Export PDF
                      </Button>
                      <Button className="h-20 flex-col gap-2" variant="outline">
                        <Play className="h-6 w-6" />
                        Audio Summary
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="upload" className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Upload Learning Materials</h3>
                      <p className="text-gray-600 mb-4">
                        Upload PDFs, documents, or paste YouTube links for AI analysis
                      </p>
                      <Button>Choose Files</Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="resources" className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Youtube className="h-5 w-5 text-red-600" />
                          <div>
                            <div className="font-medium">Machine Learning Crash Course</div>
                            <div className="text-sm text-gray-600">Recommended video • 45 min</div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Watch
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <BookOpen className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="font-medium">Python Machine Learning</div>
                            <div className="text-sm text-gray-600">Free eBook • OpenLibrary</div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Read
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="quiz" className="space-y-4">
                    <div className="text-center py-8">
                      <Brain className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Ready for a Quiz?</h3>
                      <p className="text-gray-600 mb-4">Test your knowledge with personalized questions</p>
                      <Button>Start Quiz</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weekly Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Weekly Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {weeklyGoals.map((goal, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{goal.goal}</span>
                      <span>
                        {goal.current}/{goal.target}
                      </span>
                    </div>
                    <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Content */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentContent.map((content, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{content.title}</div>
                      <div className="text-xs text-gray-600">
                        {content.type} • {content.date}
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      View
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Study Time
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Target className="h-4 w-4 mr-2" />
                  Set New Goal
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
