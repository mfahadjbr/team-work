"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  Upload,
  CheckCircle,
  Sparkles,
  RefreshCw,
  Clock,
  ImageIcon,
  Eye,
  EyeOff,
  Calendar,
  Play,
  X,
  PartyPopper,
} from "lucide-react"
import { useRouter } from "next/navigation"
import RefreshButton from "@/components/ui/refresh-button"

type UploadStep = "upload" | "title" | "description" | "timestamps" | "thumbnail" | "preview"

interface GeneratedContent {
  titles: string[]
  selectedTitle: string
  description: string
  timestamps: string
  thumbnails: string[]
  selectedThumbnail: string
}

export default function UploadPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<UploadStep>("upload")
  const [geminiApiKey, setGeminiApiKey] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [content, setContent] = useState<GeneratedContent>({
    titles: [],
    selectedTitle: "",
    description: "",
    timestamps: "",
    thumbnails: [],
    selectedThumbnail: "",
  })
  const [customTitle, setCustomTitle] = useState("")
  const [customDescription, setCustomDescription] = useState("")
  const [customTimestamps, setCustomTimestamps] = useState("")
  const [showPlaylistSelector, setShowPlaylistSelector] = useState(false)
  const [publishType, setPublishType] = useState<"public" | "private" | "schedule" | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const [saveButtonText, setSaveButtonText] = useState("Save Key")
  const [isSaving, setIsSaving] = useState(false)

  const handleRefresh = useCallback(async () => {
    // Refresh any data that might need updating
    // For upload page, this could refresh playlist data, etc.
    window.location.reload()
  }, [])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadedFile(file)
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate 15-second upload
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setShowCelebration(true)
          return 100
        }
        return prev + 100 / 15
      })
    }, 1000)
  }

  const generateTitles = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setContent((prev) => ({
        ...prev,
        titles: [
          "10 Amazing JavaScript Tips That Will Boost Your Productivity",
          "Master JavaScript: Essential Tips for Modern Web Development",
          "JavaScript Secrets: Pro Tips Every Developer Should Know",
          "Unlock JavaScript Power: Advanced Techniques Revealed",
          "JavaScript Mastery: Transform Your Coding Skills Today",
        ],
      }))
      setIsProcessing(false)
    }, 2000)
  }

  const generateDescription = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setContent((prev) => ({
        ...prev,
        description: `Discover powerful JavaScript techniques that every developer should know. From array methods to async/await patterns, these tips will transform your coding workflow and make you more efficient.

Perfect for beginners and experienced developers alike! In this comprehensive tutorial, you'll learn:
• Advanced array manipulation techniques
• Modern ES6+ features and syntax
• Asynchronous programming best practices
• Performance optimization strategies
• Real-world coding examples and use cases

Don't forget to subscribe for more programming tutorials and hit the bell icon for notifications!`,
      }))
      setIsProcessing(false)
    }, 2000)
  }

  const generateTimestamps = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setContent((prev) => ({
        ...prev,
        timestamps: `0:00 Introduction
0:30 Array Methods Overview
2:15 Advanced Filter Techniques
4:45 Map and Reduce Mastery
7:20 Async/Await Best Practices
10:30 Performance Tips
12:45 Real-world Examples
15:00 Conclusion and Next Steps`,
      }))
      setIsProcessing(false)
    }, 5000)
  }

  const generateThumbnails = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setContent((prev) => ({
        ...prev,
        thumbnails: [
          "/javascript-coding-tutorial-thumbnail.png",
          "/modern-javascript-development.png",
          "/react-hooks-tutorial.png",
          "/css-grid-flexbox.png",
          "/nextjs-fullstack-app.png",
        ],
      }))
      setIsProcessing(false)
    }, 3000)
  }

  const handlePublish = (type: "public" | "private" | "schedule") => {
    setPublishType(type)
    if (type === "schedule") {
      // Handle scheduling logic
      alert("Scheduling feature coming soon!")
    } else {
      setShowPlaylistSelector(true)
    }
  }

  const handlePlaylistSelection = useCallback((playlistId: string) => {
    // Use setTimeout to defer state updates until after render
    setTimeout(() => {
      setShowPlaylistSelector(false)
      setCurrentStep("preview")
      // Simulate upload process
      // Removed old system alert - now using custom celebration modal
    }, 0)
  }, [])

  const handleSaveApiKey = () => {
    setIsSaving(true)
    setSaveButtonText("Saving...")

    setTimeout(() => {
      localStorage.setItem("gemini_api_key", geminiApiKey)
      setSaveButtonText("Saved Successfully!")
      setIsSaving(false)

      // Reset button text after 2 seconds
      setTimeout(() => {
        setSaveButtonText("Save Key")
      }, 2000)
    }, 1000)
  }

  const steps = [
    { id: "upload", title: "Upload", completed: uploadProgress === 100 },
    { id: "title", title: "Title", completed: content.selectedTitle || customTitle },
    { id: "description", title: "Description", completed: content.description || customDescription },
    { id: "timestamps", title: "Timestamps", completed: content.timestamps || customTimestamps },
    { id: "thumbnail", title: "Thumbnail", completed: content.selectedThumbnail },
    { id: "preview", title: "Preview", completed: false },
  ]

  return (
    <div className="min-h-screen bg-background">
      {showCelebration && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg p-8 max-w-md w-full mx-4 text-center relative animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setShowCelebration(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <PartyPopper className="w-8 h-8 text-primary animate-bounce" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">🎉 Upload Successful!</h2>
              <p className="text-muted-foreground">
                Your video has been uploaded successfully! Now let's optimize it with AI-generated content.
              </p>
            </div>

            <Button
              onClick={() => {
                setShowCelebration(false)
                setCurrentStep("title")
              }}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Continue to Title Generation
            </Button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6 space-y-6 lg:space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="text-center lg:text-left">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Upload Video</h1>
            <p className="text-muted-foreground mt-2">Create and optimize your YouTube content with AI assistance.</p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <RefreshButton 
              onRefresh={handleRefresh}
              variant="outline"
              size="sm"
            />
          </div>
        </div>

        <div className="w-full">
          <div className="flex items-center justify-between max-w-4xl mx-auto px-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 ${
                      currentStep === step.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : step.completed && step.id !== "preview"
                          ? "border-green-500 bg-green-500 text-white"
                          : "border-muted-foreground bg-background"
                    }`}
                  >
                    {step.completed && step.id !== "preview" ? (
                      <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5" />
                    ) : (
                      <span className="text-xs lg:text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  <span
                    className={`mt-2 text-xs lg:text-sm text-center ${
                      currentStep === step.id ? "font-medium text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 mx-2 ${step.completed ? "bg-green-500" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-6 lg:space-y-8">
          {/* Upload Section */}
          {currentStep === "upload" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
                  <Upload className="h-5 w-5" />
                  Upload Your Video
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="gemini-key">Gemini API Key</Label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      id="gemini-key"
                      type="password"
                      placeholder="Enter your Gemini API key"
                      value={geminiApiKey}
                      onChange={(e) => setGeminiApiKey(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSaveApiKey}
                      disabled={!geminiApiKey || isSaving}
                      className="sm:w-auto w-full"
                    >
                      {saveButtonText}
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="video-upload">Upload Video File</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 lg:p-8 text-center">
                    <Upload className="mx-auto h-8 w-8 lg:h-12 lg:w-12 text-muted-foreground mb-4" />
                    <Input
                      id="video-upload"
                      type="file"
                      accept="video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Label htmlFor="video-upload" className="cursor-pointer">
                      <div className="text-base lg:text-lg font-medium mb-2">
                        Drop your video here or click to browse
                      </div>
                      <div className="text-sm text-muted-foreground">Supports MP4, MOV, AVI, WMV (Max: 10GB)</div>
                    </Label>
                  </div>
                </div>

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="truncate mr-2">Uploading {uploadedFile?.name}</span>
                      <span className="flex-shrink-0">{Math.round(uploadProgress)}%</span>
                    </div>
                    <Progress value={uploadProgress} />
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Title Generation Section */}
          {currentStep === "title" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
                  <Sparkles className="h-5 w-5" />
                  Generate Title
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button onClick={generateTitles} disabled={isProcessing} className="w-full">
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating Titles...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Title with AI
                    </>
                  )}
                </Button>

                {content.titles.length > 0 && (
                  <div className="space-y-3">
                    <Label>Select a title:</Label>
                    {content.titles.map((title, index) => (
                      <div
                        key={index}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          content.selectedTitle === title
                            ? "border-primary bg-primary/5"
                            : "border-muted hover:border-primary/50"
                        }`}
                        onClick={() => setContent((prev) => ({ ...prev, selectedTitle: title }))}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-sm flex-1">{title}</span>
                          {content.selectedTitle === title && (
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          )}
                        </div>
                      </div>
                    ))}

                    <Button
                      variant="outline"
                      onClick={generateTitles}
                      disabled={isProcessing}
                      className="w-full sm:w-auto bg-transparent"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Regenerate Titles
                    </Button>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="custom-title">Or enter custom title:</Label>
                  <Input
                    id="custom-title"
                    placeholder="Enter your custom title"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                  />
                </div>

                {(content.selectedTitle || customTitle) && (
                  <Button onClick={() => setCurrentStep("description")} className="w-full">
                    Save & Next: Generate Description
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Description Generation Section */}
          {currentStep === "description" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
                  <Sparkles className="h-5 w-5" />
                  Generate Description
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button onClick={generateDescription} disabled={isProcessing} className="w-full">
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating Description...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Description with AI
                    </>
                  )}
                </Button>

                {content.description && (
                  <div className="space-y-3">
                    <Label>Generated Description:</Label>
                    <div className="p-4 border rounded-lg bg-muted/50 max-h-60 overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm">{content.description}</pre>
                    </div>
                    <Button
                      variant="outline"
                      onClick={generateDescription}
                      disabled={isProcessing}
                      className="w-full sm:w-auto bg-transparent"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Regenerate Description
                    </Button>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="custom-description">Or write custom description:</Label>
                  <Textarea
                    id="custom-description"
                    placeholder="Enter your custom description"
                    value={customDescription}
                    onChange={(e) => setCustomDescription(e.target.value)}
                    rows={6}
                    className="resize-none"
                  />
                </div>

                {(content.description || customDescription) && (
                  <Button onClick={() => setCurrentStep("timestamps")} className="w-full">
                    Save & Next: Generate Timestamps
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Timestamps Generation Section */}
          {currentStep === "timestamps" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
                  <Clock className="h-5 w-5" />
                  Generate Timestamps
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button onClick={generateTimestamps} disabled={isProcessing} className="w-full">
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating Timestamps...
                    </>
                  ) : (
                    <>
                      <Clock className="w-4 h-4 mr-2" />
                      Generate Timestamps with AI
                    </>
                  )}
                </Button>

                {content.timestamps && (
                  <div className="space-y-3">
                    <Label>Generated Timestamps:</Label>
                    <div className="p-4 border rounded-lg bg-muted/50 max-h-60 overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm font-mono">{content.timestamps}</pre>
                    </div>
                    <Button
                      variant="outline"
                      onClick={generateTimestamps}
                      disabled={isProcessing}
                      className="w-full sm:w-auto bg-transparent"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Regenerate Timestamps
                    </Button>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="custom-timestamps">Or write custom timestamps:</Label>
                  <Textarea
                    id="custom-timestamps"
                    placeholder="0:00 Introduction&#10;2:30 Main Content&#10;5:45 Conclusion"
                    value={customTimestamps}
                    onChange={(e) => setCustomTimestamps(e.target.value)}
                    rows={6}
                    className="resize-none"
                  />
                </div>

                {(content.timestamps || customTimestamps) && (
                  <Button onClick={() => setCurrentStep("thumbnail")} className="w-full">
                    Save & Next: Generate Thumbnail
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Thumbnail Generation Section */}
          {currentStep === "thumbnail" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
                  <ImageIcon className="h-5 w-5" />
                  Generate Thumbnail
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button onClick={generateThumbnails} disabled={isProcessing} className="w-full">
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating Thumbnails...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Generate Thumbnail with AI
                    </>
                  )}
                </Button>

                {content.thumbnails.length > 0 && (
                  <div className="space-y-3">
                    <Label>Select a thumbnail:</Label>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                      {content.thumbnails.map((thumbnail, index) => (
                        <div
                          key={index}
                          className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-colors ${
                            content.selectedThumbnail === thumbnail
                              ? "border-primary"
                              : "border-muted hover:border-primary/50"
                          }`}
                          onClick={() => setContent((prev) => ({ ...prev, selectedThumbnail: thumbnail }))}
                        >
                          <img
                            src={thumbnail || "/placeholder.svg"}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-20 lg:h-24 object-cover"
                          />
                          {content.selectedThumbnail === thumbnail && (
                            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                              <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-primary bg-white rounded-full" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      onClick={generateThumbnails}
                      disabled={isProcessing}
                      className="w-full sm:w-auto bg-transparent"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Regenerate Thumbnails
                    </Button>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="custom-thumbnail">Or upload custom thumbnail:</Label>
                  <Input
                    id="custom-thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        const url = URL.createObjectURL(file)
                        setContent((prev) => ({ ...prev, selectedThumbnail: url }))
                      }
                    }}
                  />
                </div>

                {content.selectedThumbnail && (
                  <Button onClick={() => setCurrentStep("preview")} className="w-full">
                    Save & Next: Preview
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Final Preview Section */}
          {currentStep === "preview" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
                  <Eye className="h-5 w-5" />
                  Final Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border rounded-lg p-4 lg:p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <img
                      src={content.selectedThumbnail || "/placeholder.svg"}
                      alt="Video thumbnail"
                      className="w-full sm:w-32 h-20 object-cover rounded"
                    />
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-base lg:text-lg">{content.selectedTitle || customTitle}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {content.description || customDescription}
                      </p>
                    </div>
                  </div>

                  {(content.timestamps || customTimestamps) && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Timestamps:</Label>
                      <div className="max-h-40 overflow-y-auto">
                        <pre className="text-xs bg-muted p-3 rounded whitespace-pre-wrap">
                          {content.timestamps || customTimestamps}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                  <Button onClick={() => handlePublish("public")} className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    Public
                  </Button>
                  <Button onClick={() => handlePublish("private")} variant="outline" className="flex-1">
                    <EyeOff className="w-4 h-4 mr-2" />
                    Private
                  </Button>
                  <Button onClick={() => handlePublish("schedule")} variant="outline" className="flex-1">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Playlist Selector */}
          {showPlaylistSelector && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
                  <Play className="h-5 w-5" />
                  Select YouTube Playlist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PlaylistSelector 
                  onSelect={handlePlaylistSelection} 
                  router={router}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

function PlaylistSelector({ 
  onSelect, 
  router 
}: { 
  onSelect: (playlistId: string) => void
  router: any
}) {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string>("")
  const [showYouTubeCelebration, setShowYouTubeCelebration] = useState(false)

  const playlists = [
    {
      id: "1",
      name: "JavaScript Tutorials",
      videoCount: 25,
      thumbnail: "/javascript-coding-tutorial-thumbnail.png",
    },
    {
      id: "2",
      name: "Web Development Tips",
      videoCount: 18,
      thumbnail: "/modern-javascript-development.png",
    },
    {
      id: "3",
      name: "React & Next.js",
      videoCount: 12,
      thumbnail: "/nextjs-fullstack-app.png",
    },
  ]

  const handlePlaylistSelect = useCallback(
    (playlistId: string) => {
      // Defer state updates to prevent setState during render
      setTimeout(() => {
        setIsUploading(true)
        setUploadProgress(0)
        setSelectedPlaylistId(playlistId) // Store selected playlist ID

        // Simulate 30-second upload
        const interval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval)
              setIsUploading(false)
              // Show YouTube celebration popup instead of calling onSelect immediately
              setShowYouTubeCelebration(true)
              return 100
            }
            return prev + 100 / 30
          })
        }, 1000)
      }, 0)
    },
    [],
  )

  if (isUploading) {
    return (
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-base lg:text-lg font-medium mb-2">Uploading to YouTube...</div>
          <div className="text-sm text-muted-foreground mb-4">Please wait while we upload your video</div>
        </div>
        <Progress value={uploadProgress} />
        <div className="text-center text-sm text-muted-foreground">{Math.round(uploadProgress)}% complete</div>
      </div>
    )
  }

  // YouTube Upload Celebration Popup
  if (showYouTubeCelebration) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-background rounded-lg p-8 max-w-md w-full mx-4 text-center relative animate-in zoom-in-95 duration-300">
          <button
            onClick={() => setShowYouTubeCelebration(false)}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <PartyPopper className="w-8 h-8 text-green-600 animate-bounce" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">🎉 YouTube Upload Complete!</h2>
            <p className="text-muted-foreground">
              Your video has been successfully uploaded to YouTube! The celebration is complete.
            </p>
          </div>

          <Button
            onClick={() => {
              setShowYouTubeCelebration(false)
              router.push("/dashboard/videos")
            }}
            className="w-full bg-green-600 hover:bg-green-700 text-white cursor-pointer"
          >
            YouTube Video
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {playlists.map((playlist) => (
        <Card
          key={playlist.id}
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handlePlaylistSelect(playlist.id)}
        >
          <CardContent className="p-4">
            <img
              src={playlist.thumbnail || "/placeholder.svg"}
              alt={playlist.name}
              className="w-full h-20 lg:h-24 object-cover rounded mb-3"
            />
            <h3 className="font-medium mb-1 text-sm lg:text-base">{playlist.name}</h3>
            <p className="text-xs lg:text-sm text-muted-foreground">{playlist.videoCount} videos</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
