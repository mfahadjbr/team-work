"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { FileText, RefreshCw, Sparkles } from "lucide-react"
import { UploadState, UploadHandlers } from "@/types/upload"

interface DescriptionSectionProps {
  state: UploadState
  updateState: (updates: Partial<UploadState>) => void
  handlers: UploadHandlers
  generatedDescription: string
  descriptionLoading: boolean
  uploadedVideoData: any
  saveDescription: (videoId: string, description: string) => Promise<any>
  regenerateDescriptionWithTemplate: (videoId: string, template: string) => Promise<any>
  isSavingDescription?: boolean
}

export function DescriptionSection({
  state,
  updateState,
  handlers,
  generatedDescription,
  descriptionLoading,
  uploadedVideoData,
  saveDescription,
  regenerateDescriptionWithTemplate,
  isSavingDescription = false
}: DescriptionSectionProps) {
  const [customDescription, setCustomDescription] = useState("")

  const handleSaveAndNext = async () => {
    // Save the description if it's generated
    if ((state.content.description || generatedDescription) && uploadedVideoData?.id) {
      try {
        await saveDescription(uploadedVideoData.id, state.content.description || generatedDescription)
      } catch (error) {
        console.error('Failed to save description:', error)
      }
    }
    updateState({ currentStep: "timestamps" })
  }

  const handleTemplateRegenerate = async () => {
    if (state.customDescriptionTemplate && uploadedVideoData?.id) {
      try {
        await regenerateDescriptionWithTemplate(uploadedVideoData.id, state.customDescriptionTemplate)
      } catch (error) {
        console.error('Failed to regenerate with template:', error)
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
          <FileText className="h-5 w-5" />
          Generate Description
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Button 
          onClick={handlers.generateDescription} 
          disabled={state.isProcessing || descriptionLoading} 
          className="w-full"
        >
          <FileText className="w-4 h-4 mr-2" />
          Generate Description with AI
        </Button>

        {(state.content.description || generatedDescription) && (
          <div className="space-y-3">
            <Label>Generated Description:</Label>
            <div className="p-4 border rounded-lg bg-muted/50 max-h-60 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm">{state.content.description || generatedDescription}</pre>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={handlers.generateDescription}
                disabled={state.isProcessing || descriptionLoading}
                className="sm:w-auto w-full bg-transparent"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate Description
              </Button>
              {(state.content.description || generatedDescription) && uploadedVideoData?.id && (
                <Button
                  variant="outline"
                  onClick={async () => {
                    try {
                      await saveDescription(uploadedVideoData.id, state.content.description || generatedDescription)
                    } catch (error) {
                      console.error('Failed to save description:', error)
                    }
                  }}
                  disabled={isSavingDescription}
                  className="sm:w-auto w-full bg-transparent"
                >
                  {isSavingDescription ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Description'
                  )}
                </Button>
              )}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="description-template">Custom Description Template (optional):</Label>
          <Textarea
            id="description-template"
            placeholder="Enter a template for description generation"
            value={state.customDescriptionTemplate}
            onChange={(e) => updateState({ customDescriptionTemplate: e.target.value })}
            rows={3}
            className="resize-none"
          />
          {state.customDescriptionTemplate && (
            <Button
              variant="outline"
              onClick={handleTemplateRegenerate}
              disabled={state.isProcessing || descriptionLoading}
              className="w-full sm:w-auto bg-transparent"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Generate with Template
            </Button>
          )}
        </div>

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

        {(state.content.description || generatedDescription || customDescription) && (
          <Button 
            onClick={handleSaveAndNext}
            disabled={isSavingDescription}
            className="w-full"
          >
            {isSavingDescription ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Saving Description...
              </>
            ) : (
              'Save & Next: Generate Timestamps'
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
