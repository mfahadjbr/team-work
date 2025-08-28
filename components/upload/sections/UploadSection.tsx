"use client"

import { Upload, Link } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { UploadState, UploadHandlers } from "@/types/upload"

interface UploadSectionProps {
  state: UploadState
  updateState: (updates: Partial<UploadState>) => void
  handlers: UploadHandlers
  videoDownloading: boolean
  downloadProgress: number
  downloadError: string | null
}

export const UploadSection = ({ 
  state, 
  updateState, 
  handlers, 
  videoDownloading, 
  downloadProgress, 
  downloadError 
}: UploadSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
          <Upload className="h-5 w-5" />
          Upload Your Video
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Gemini API Key */}
        <div className="space-y-2">
          <Label htmlFor="gemini-key">Gemini API Key</Label>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              id="gemini-key"
              type="password"
              placeholder="Enter your Gemini API key"
              value={state.geminiApiKey}
              onChange={(e) => updateState({ geminiApiKey: e.target.value })}
              className="flex-1"
            />
            <Button
              onClick={handlers.handleSaveApiKey}
              disabled={!state.geminiApiKey || state.isSaving}
              className="sm:w-auto w-full"
            >
              {state.saveButtonText}
            </Button>
          </div>
        </div>

        {/* Upload Method Toggle */}
        <div className="space-y-4">
          <Label>Choose Upload Method</Label>
          <div className="flex gap-2 p-1 bg-muted rounded-lg">
            <Button
              variant={state.uploadMethod === "file" ? "default" : "ghost"}
              size="sm"
              onClick={() => updateState({ uploadMethod: "file" })}
              className="flex-1"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload File
            </Button>
            <Button
              variant={state.uploadMethod === "url" ? "default" : "ghost"}
              size="sm"
              onClick={() => updateState({ uploadMethod: "url" })}
              className="flex-1"
            >
              <Link className="w-4 h-4 mr-2" />
              YouTube URL
            </Button>
          </div>
        </div>

        {/* File Upload Section */}
        {state.uploadMethod === "file" && (
          <div className="space-y-4">
            <Label htmlFor="video-upload">Upload Video File</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 lg:p-8 text-center">
              <Upload className="mx-auto h-8 w-8 lg:h-12 lg:w-12 text-muted-foreground mb-4" />
              <Input
                id="video-upload"
                type="file"
                accept="video/*"
                onChange={handlers.handleFileUpload}
                className="hidden"
                disabled={state.isUploading || videoDownloading}
              />
              <Label htmlFor="video-upload" className="cursor-pointer">
                <div className="text-base lg:text-lg font-medium mb-2">
                  Drop your video here or click to browse
                </div>
                <div className="text-sm text-muted-foreground">Supports MP4, MOV, AVI, WMV (Max: 10GB)</div>
              </Label>
            </div>
          </div>
        )}

        {/* YouTube URL Section */}
        {state.uploadMethod === "url" && (
          <div className="space-y-4">
            <Label htmlFor="youtube-url">YouTube Video URL</Label>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  id="youtube-url"
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={state.youtubeUrl}
                  onChange={(e) => updateState({ youtubeUrl: e.target.value })}
                  className="flex-1"
                  disabled={videoDownloading || state.isUploading}
                />
                <Button
                  onClick={handlers.handleYouTubeUrlDownload}
                  disabled={!state.youtubeUrl.trim() || videoDownloading || state.isUploading}
                  className="sm:w-auto w-full"
                >
                  Download Video
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                Enter a YouTube video URL to download and process it automatically
              </div>
              {downloadError && (
                <div className="text-sm text-destructive bg-destructive/10 p-2 rounded">
                  {downloadError}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Progress Indicators */}
        {state.isUploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="truncate mr-2">Uploading {state.uploadedFile?.name}</span>
              <span className="flex-shrink-0">{Math.round(state.uploadProgress)}%</span>
            </div>
            <Progress value={state.uploadProgress} />
          </div>
        )}

        {videoDownloading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="truncate mr-2">Downloading video from YouTube...</span>
              <span className="flex-shrink-0">{Math.round(downloadProgress)}%</span>
            </div>
            <Progress value={downloadProgress} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
