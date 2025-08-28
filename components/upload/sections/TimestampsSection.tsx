"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Clock, RefreshCw } from "lucide-react"
import { UploadState, UploadHandlers } from "@/types/upload"

interface TimestampsSectionProps {
  state: UploadState
  updateState: (updates: Partial<UploadState>) => void
  handlers: UploadHandlers
  generatedTimestamps: string
  timestampsLoading: boolean
  uploadedVideoData: any
  saveTimestamps: (videoId: string, timestamps: string) => Promise<any>
}

export function TimestampsSection({
  state,
  updateState,
  handlers,
  generatedTimestamps,
  timestampsLoading,
  uploadedVideoData,
  saveTimestamps
}: TimestampsSectionProps) {
  const [customTimestamps, setCustomTimestamps] = useState("")

  const handleSaveAndNext = async () => {
    // Save the timestamps if they're generated
    if ((state.content.timestamps || generatedTimestamps) && uploadedVideoData?.id) {
      try {
        await saveTimestamps(uploadedVideoData.id, state.content.timestamps || generatedTimestamps)
      } catch (error) {
        console.error('Failed to save timestamps:', error)
      }
    }
    updateState({ currentStep: "thumbnail" })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
          <Clock className="h-5 w-5" />
          Generate Timestamps
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Button 
          onClick={handlers.generateTimestamps} 
          disabled={state.isProcessing || timestampsLoading} 
          className="w-full"
        >
          {state.isProcessing || timestampsLoading ? (
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

        {(state.content.timestamps || generatedTimestamps) && (
          <div className="space-y-3">
            <Label>Generated Timestamps:</Label>
            <div className="p-4 border rounded-lg bg-muted/50 max-h-60 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm font-mono">{state.content.timestamps || generatedTimestamps}</pre>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={handlers.generateTimestamps}
                disabled={state.isProcessing || timestampsLoading}
                className="sm:w-auto w-full bg-transparent"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate Timestamps
              </Button>
              {(state.content.timestamps || generatedTimestamps) && uploadedVideoData?.id && (
                <Button
                  variant="outline"
                  onClick={async () => {
                    try {
                      await saveTimestamps(uploadedVideoData.id, state.content.timestamps || generatedTimestamps)
                    } catch (error) {
                      console.error('Failed to save timestamps:', error)
                    }
                  }}
                  disabled={state.isProcessing || timestampsLoading}
                  className="sm:w-auto w-full bg-transparent"
                >
                  Save Timestamps
                </Button>
              )}
            </div>
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

        {(state.content.timestamps || generatedTimestamps || customTimestamps) && (
          <Button 
            onClick={handleSaveAndNext}
            className="w-full"
          >
            Save & Next: Generate Thumbnail
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
