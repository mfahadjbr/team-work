"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, RefreshCw, CheckCircle } from "lucide-react"
import { UploadState, UploadHandlers } from "@/types/upload"

interface TitleSectionProps {
  state: UploadState
  updateState: (updates: Partial<UploadState>) => void
  handlers: UploadHandlers
  generatedTitles: string[]
  titleLoading: boolean
  uploadedVideoData: any
  saveTitle: (videoId: string, title: string) => Promise<any>
}

export function TitleSection({
  state,
  updateState,
  handlers,
  generatedTitles,
  titleLoading,
  uploadedVideoData,
  saveTitle
}: TitleSectionProps) {
  const [customTitle, setCustomTitle] = useState("")

  const handleTitleSelect = (title: string) => {
    updateState({
      content: {
        ...state.content,
        selectedTitle: title
      }
    })
  }

  const handleSaveAndNext = async () => {
    // Save the selected title if it's from generated ones
    if (state.content.selectedTitle && uploadedVideoData?.id) {
      try {
        await saveTitle(uploadedVideoData.id, state.content.selectedTitle)
      } catch (error) {
        console.error('Failed to save title:', error)
      }
    }
    updateState({ currentStep: "description" })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
          <Sparkles className="h-5 w-5" />
          Generate Title
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Button 
          onClick={handlers.generateTitlesHandler} 
          disabled={state.isProcessing || titleLoading} 
          className="w-full"
        >
          {state.isProcessing || titleLoading ? (
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

        {(state.content.titles.length > 0 || generatedTitles.length > 0) && (
          <div className="space-y-3">
            <Label>Select a title:</Label>
            {(state.content.titles.length > 0 ? state.content.titles : generatedTitles).map((title, index) => (
              <div
                key={index}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  state.content.selectedTitle === title
                    ? "border-primary bg-primary/5"
                    : "border-muted hover:border-primary/50"
                }`}
                onClick={() => handleTitleSelect(title)}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm flex-1">{title}</span>
                  {state.content.selectedTitle === title && (
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  )}
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              onClick={handlers.generateTitlesHandler}
              disabled={state.isProcessing || titleLoading}
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

        {(state.content.selectedTitle || customTitle) && (
          <Button 
            onClick={handleSaveAndNext}
            className="w-full"
          >
            Save & Next: Generate Description
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
