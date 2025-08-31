"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImageIcon, RefreshCw, CheckCircle } from "lucide-react"
import { UploadState, UploadHandlers } from "@/types/upload"

interface ThumbnailSectionProps {
  state: UploadState
  updateState: (updates: Partial<UploadState>) => void
  handlers: UploadHandlers
  generatedThumbnails: string[]
  thumbnailsLoading: boolean
}

export function ThumbnailSection({
  state,
  updateState,
  handlers,
  generatedThumbnails,
  thumbnailsLoading
}: ThumbnailSectionProps) {

  const handleThumbnailSelect = (thumbnail: string) => {
    console.log('[ThumbnailSection] Thumbnail selected:', {
      thumbnail: thumbnail.substring(0, 100) + '...',
      currentSelected: state.content.selectedThumbnail,
      thumbnailsCount: state.content.thumbnails.length,
      generatedThumbnailsCount: generatedThumbnails.length
    })
    
    updateState({
      content: {
        ...state.content,
        selectedThumbnail: thumbnail
      }
    })
  }

  const handleCustomThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      updateState({
        content: {
          ...state.content,
          selectedThumbnail: url
        }
      })
    }
  }

  const handleSaveAndNext = () => {
    updateState({ currentStep: "preview" })
  }

  // Debug logging
  console.log('[ThumbnailSection] Component state:', {
    stateThumbnailsCount: state.content.thumbnails.length,
    generatedThumbnailsCount: generatedThumbnails.length,
    selectedThumbnail: state.content.selectedThumbnail,
    isProcessing: state.isProcessing,
    thumbnailsLoading,
    thumbnailsToShow: state.content.thumbnails.length > 0 ? state.content.thumbnails : generatedThumbnails,
    stateThumbnails: state.content.thumbnails,
    generatedThumbnailsArray: generatedThumbnails
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
          <ImageIcon className="h-5 w-5" />
          Generate Thumbnail
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Button 
          onClick={() => {
            console.log('[ThumbnailSection] Generate button clicked!')
            console.log('[ThumbnailSection] Current state before generation:', {
              stateThumbnails: state.content.thumbnails,
              generatedThumbnails: generatedThumbnails,
              isProcessing: state.isProcessing,
              thumbnailsLoading
            })
            handlers.generateThumbnails()
          }} 
          disabled={state.isProcessing || thumbnailsLoading} 
          className="w-full"
        >
          <ImageIcon className="w-4 h-4 mr-2" />
          Generate 5 Thumbnails with AI
        </Button>

        {(state.content.thumbnails.length > 0 || generatedThumbnails.length > 0) && (
          <div className="space-y-3">
            <Label>Select a thumbnail:</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {(state.content.thumbnails.length > 0 ? state.content.thumbnails : generatedThumbnails).map((thumbnail, index) => (
                <div
                  key={index}
                  className={`relative aspect-video border-2 rounded-lg cursor-pointer transition-all hover:scale-105 ${
                    state.content.selectedThumbnail === thumbnail
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-muted hover:border-primary/50"
                  }`}
                  onClick={() => handleThumbnailSelect(thumbnail)}
                >
                  <img
                    src={thumbnail}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {state.content.selectedThumbnail === thumbnail && (
                    <div className="absolute top-1 right-1 bg-primary rounded-full p-1">
                      <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-primary bg-white rounded-full" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={handlers.generateThumbnails}
              disabled={state.isProcessing || thumbnailsLoading}
              className="w-full sm:w-auto bg-transparent"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Regenerate 5 Thumbnails
            </Button>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="custom-thumbnail">Or upload custom thumbnail:</Label>
          <Input
            id="custom-thumbnail"
            type="file"
            accept="image/*"
            onChange={handleCustomThumbnailUpload}
          />
        </div>

        {state.content.selectedThumbnail && (
          <Button 
            onClick={handleSaveAndNext}
            className="w-full"
          >
            Save & Next: Preview
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
