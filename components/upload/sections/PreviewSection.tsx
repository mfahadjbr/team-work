"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Eye, RefreshCw, AlertCircle, ImageIcon, Globe, Lock, Users, Play } from "lucide-react"
import { UploadState, UploadHandlers } from "@/types/upload"

interface PreviewSectionProps {
  state: UploadState
  updateState: (updates: Partial<UploadState>) => void
  handlers: UploadHandlers
  previewData: any
  previewLoading: boolean
  previewError: string | null
  playlists: any[]
  playlistsLoading: boolean
  playlistsError: string | null
  uploadedVideoData: any
  getCurrentVideoId: () => string | null
  getVideoPreview: (videoId: string) => Promise<void>
  fetchPlaylists: () => Promise<any>
}

export function PreviewSection({
  state,
  updateState,
  handlers,
  previewData,
  previewLoading,
  previewError,
  playlists,
  playlistsLoading,
  playlistsError,
  uploadedVideoData,
  getCurrentVideoId,
  getVideoPreview,
  fetchPlaylists
}: PreviewSectionProps) {

  const privacyOptions = [
    { value: 'public' as const, label: 'Public', description: 'Anyone can search for and view', icon: Globe },
    { value: 'unlisted' as const, label: 'Unlisted', description: 'Anyone with the link can view', icon: Users },
    { value: 'private' as const, label: 'Private', description: 'Only you can view', icon: Lock },
  ]

  const handlePrivacySelect = (privacy: 'public' | 'private' | 'unlisted') => {
    updateState({ selectedPrivacy: privacy })
  }

  const handlePlaylistSelect = (playlist: any) => {
    updateState({ selectedPlaylist: playlist })
  }

  const handleShowPreview = () => {
    updateState({ showFinalPreview: true })
    const videoId = uploadedVideoData?.id || getCurrentVideoId()
    if (videoId) {
      getVideoPreview(videoId)
    }
  }

  const handleStageNavigation = (stage: 1 | 2 | 3) => {
    updateState({ previewStage: stage })
    
    // Load playlists when entering stage 2
    if (stage === 2) {
      fetchPlaylists()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
          <Eye className="h-5 w-5" />
          {state.previewStage === 1 ? "Review Content" : state.previewStage === 2 ? "Settings" : "Final Preview"}
        </CardTitle>
        <p className="text-muted-foreground">
          {state.previewStage === 1 ? "Review your generated content" : 
           state.previewStage === 2 ? "Configure privacy and playlist settings" : 
           "Final review before upload"}
        </p>
        
        {/* Stage Progress Indicator */}
        <div className="flex items-center gap-2 mt-4">
          {[1, 2, 3].map((stageNum) => (
            <div key={stageNum} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  state.previewStage === stageNum
                    ? "border-primary bg-primary text-primary-foreground"
                    : state.previewStage > stageNum
                      ? "border-green-500 bg-green-500 text-white"
                      : "border-muted-foreground bg-background"
                }`}
              >
                <span className="text-xs font-medium">{stageNum}</span>
              </div>
              <span className="ml-2 text-sm">
                {stageNum === 1 ? "Content" : stageNum === 2 ? "Settings" : "Preview"}
              </span>
              {stageNum < 3 && (
                <div className={`h-0.5 flex-1 mx-2 ${state.previewStage > stageNum ? "bg-green-500" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        
        {/* Stage 1: Content Review */}
        {state.previewStage === 1 && (
          <>
            {/* Title Section */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Selected Title</Label>
              <div className="p-4 border rounded-lg bg-muted/20">
                <h3 className="font-semibold text-lg">
                  {state.content.selectedTitle || state.customTitle || 'No title selected'}
                </h3>
              </div>
            </div>

            {/* Thumbnail Section */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Selected Thumbnail</Label>
              <div className="p-4 border rounded-lg bg-muted/20">
                {state.content.selectedThumbnail ? (
                  <div className="w-full max-w-sm mx-auto">
                    <img
                      src={state.content.selectedThumbnail}
                      alt="Selected thumbnail"
                      className="w-full h-auto rounded-lg border"
                    />
                  </div>
                ) : (
                  <div className="w-full max-w-sm mx-auto h-32 border rounded-lg flex items-center justify-center text-muted-foreground">
                    <ImageIcon className="w-8 h-8" />
                    <span className="ml-2">No thumbnail selected</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Description</Label>
              <div className="p-4 border rounded-lg bg-muted/20 max-h-48 overflow-y-auto">
                {state.content.description || state.customDescription ? (
                  <pre className="text-sm whitespace-pre-wrap">
                    {state.content.description || state.customDescription}
                  </pre>
                ) : (
                  <p className="text-sm text-muted-foreground italic">No description generated</p>
                )}
              </div>
            </div>

            {/* Timestamps Section */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Timestamps</Label>
              <div className="p-4 border rounded-lg bg-muted/20 max-h-48 overflow-y-auto">
                {state.content.timestamps || state.customTimestamps ? (
                  <pre className="text-sm whitespace-pre-wrap font-mono">
                    {state.content.timestamps || state.customTimestamps}
                  </pre>
                ) : (
                  <p className="text-sm text-muted-foreground italic">No timestamps generated</p>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-4">
              <Button 
                variant="outline"
                onClick={() => updateState({ currentStep: "thumbnail" })}
              >
                Back to Thumbnails
              </Button>
              <Button 
                onClick={() => handleStageNavigation(2)}
              >
                Continue to Settings
              </Button>
            </div>
          </>
        )}

        {/* Stage 2: Privacy & Playlist Settings */}
        {state.previewStage === 2 && (
          <>
            {/* Privacy Settings */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Choose Privacy Setting</Label>
              <div className="grid gap-3">
                {privacyOptions.map((option) => {
                  const IconComponent = option.icon
                  return (
                    <div
                      key={option.value}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        state.selectedPrivacy === option.value
                          ? "border-primary bg-primary/5"
                          : "border-muted hover:border-primary/50"
                      }`}
                      onClick={() => handlePrivacySelect(option.value)}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className="w-5 h-5" />
                        <div className="flex-1">
                          <div className="font-medium">{option.label}</div>
                          <div className="text-sm text-muted-foreground">{option.description}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Playlist Selection */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Add to Playlist (Optional)</Label>
              
              {playlistsLoading && (
                <div className="text-center p-4">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Loading playlists...</p>
                </div>
              )}

              {playlistsError && (
                <div className="text-center p-4 border rounded-lg bg-destructive/10">
                  <AlertCircle className="w-6 h-6 text-destructive mx-auto mb-2" />
                  <p className="text-sm text-destructive">{playlistsError}</p>
                </div>
              )}

              {!playlistsLoading && !playlistsError && playlists.length > 0 && (
                <div className="grid gap-2 max-h-60 overflow-y-auto">
                  {playlists.map((playlist) => (
                    <div
                      key={playlist.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        state.selectedPlaylist?.id === playlist.id
                          ? "border-primary bg-primary/5"
                          : "border-muted hover:border-primary/50"
                      }`}
                      onClick={() => handlePlaylistSelect(playlist)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{playlist.snippet?.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {playlist.contentDetails?.itemCount || 0} videos
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs capitalize">
                          {playlist.status?.privacyStatus}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!playlistsLoading && !playlistsError && playlists.length === 0 && (
                <div className="text-center p-6 text-muted-foreground text-sm border rounded-lg bg-muted/20">
                  <Play className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No playlists found</p>
                  <p className="text-xs">Create playlists on YouTube first</p>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-4">
              <Button 
                variant="outline"
                onClick={() => handleStageNavigation(1)}
              >
                Back to Content
              </Button>
              <Button 
                onClick={() => handleStageNavigation(3)}
              >
                Continue to Preview
              </Button>
            </div>
          </>
        )}

        {/* Stage 3: Final Preview & Upload */}
        {state.previewStage === 3 && (
          <>
            {!state.showFinalPreview ? (
              <div className="text-center py-8">
                <Eye className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Ready to Preview</h3>
                <p className="text-muted-foreground mb-6">
                  Click below to see a comprehensive preview of your video content before uploading.
                </p>
                <Button 
                  onClick={handleShowPreview}
                  className="gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Show Preview
                </Button>
              </div>
            ) : (
              <>
                {/* Preview Loading/Error States */}
                {previewLoading && (
                  <div className="text-center p-8">
                    <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading preview data...</p>
                  </div>
                )}

                {previewError && (
                  <div className="text-center p-8 border rounded-lg bg-destructive/10">
                    <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Failed to Load Preview</h3>
                    <p className="text-sm text-muted-foreground mb-4">{previewError}</p>
                    <Button
                      onClick={() => {
                        const videoId = uploadedVideoData?.id || getCurrentVideoId()
                        if (videoId) {
                          getVideoPreview(videoId)
                        }
                      }}
                      variant="outline"
                      size="sm"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Retry
                    </Button>
                  </div>
                )}

                {/* Final Preview - Only Important Content */}
                {!previewLoading && !previewError && (
                  <div className="space-y-6">
                    
                    {/* Video Title */}
                    <div className="space-y-3">
                      <Label className="text-lg font-semibold">Title</Label>
                      <div className="p-4 border rounded-lg bg-muted/20">
                        <h3 className="font-semibold text-lg">
                          {previewData?.title || state.content.selectedTitle || state.customTitle || 'No title generated'}
                        </h3>
                      </div>
                    </div>

                    {/* Thumbnail */}
                    <div className="space-y-3">
                      <Label className="text-lg font-semibold">Thumbnail</Label>
                      <div className="p-4 border rounded-lg bg-muted/20">
                        {(previewData?.thumbnail_url || state.content.selectedThumbnail) ? (
                          <div className="w-full max-w-md mx-auto">
                            <img
                              src={previewData?.thumbnail_url || state.content.selectedThumbnail}
                              alt="Video thumbnail"
                              className="w-full h-auto rounded-lg border shadow-sm"
                            />
                          </div>
                        ) : (
                          <div className="w-full max-w-md mx-auto h-48 border rounded-lg flex items-center justify-center text-muted-foreground bg-muted/10">
                            <div className="text-center">
                              <ImageIcon className="w-12 h-12 mx-auto mb-2" />
                              <span>No thumbnail available</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-3">
                      <Label className="text-lg font-semibold">Description</Label>
                      <div className="border rounded-lg p-4 bg-muted/20 max-h-60 overflow-y-auto">
                        {(previewData?.description || state.content.description || state.customDescription) ? (
                          <pre className="text-sm whitespace-pre-wrap leading-relaxed">
                            {previewData?.description || state.content.description || state.customDescription}
                          </pre>
                        ) : (
                          <p className="text-sm text-muted-foreground italic">No description generated</p>
                        )}
                      </div>
                    </div>

                    {/* Timestamps */}
                    <div className="space-y-3">
                      <Label className="text-lg font-semibold">Timestamps</Label>
                      <div className="border rounded-lg p-4 bg-muted/20 max-h-60 overflow-y-auto">
                        {(previewData?.timestamps || state.content.timestamps || state.customTimestamps) ? (
                          <pre className="text-sm whitespace-pre-wrap font-mono leading-relaxed">
                            {previewData?.timestamps || state.content.timestamps || state.customTimestamps}
                          </pre>
                        ) : (
                          <p className="text-sm text-muted-foreground italic">No timestamps generated</p>
                        )}
                      </div>
                    </div>

                    {/* Summary Info */}
                    <div className="border rounded-lg p-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 border-blue-200/30">
                      <h3 className="text-lg font-semibold mb-4 text-blue-900">Upload Settings</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Privacy</Label>
                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                              state.selectedPrivacy === 'public' ? 'bg-green-100 text-green-800' :
                              state.selectedPrivacy === 'unlisted' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {state.selectedPrivacy}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Playlist</Label>
                          <div className="text-sm">
                            {state.selectedPlaylist ? state.selectedPlaylist.snippet?.title : 'No playlist selected'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Upload Buttons */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 pt-4">
                      <Button
                        onClick={() => handlers.handlePublish('public')}
                        className="bg-green-600 hover:bg-green-700"
                        disabled={state.isUploading}
                      >
                        <Globe className="w-4 h-4 mr-2" />
                        Upload as Public
                      </Button>
                      <Button
                        onClick={() => handlers.handlePublish('unlisted')}
                        className="bg-blue-600 hover:bg-blue-700"
                        disabled={state.isUploading}
                      >
                        <Users className="w-4 h-4 mr-2" />
                        Upload as Unlisted
                      </Button>
                      <Button
                        onClick={() => handlers.handlePublish('private')}
                        className="bg-gray-600 hover:bg-gray-700"
                        disabled={state.isUploading}
                      >
                        <Lock className="w-4 h-4 mr-2" />
                        Upload as Private
                      </Button>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between pt-4">
                  <Button 
                    variant="outline"
                    onClick={() => handleStageNavigation(2)}
                  >
                    Back to Settings
                  </Button>
                </div>
              </>
            )}
          </>
        )}

      </CardContent>
    </Card>
  )
}
