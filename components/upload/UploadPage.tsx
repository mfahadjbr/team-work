"use client"

import { useUploadPage } from "@/hooks/upload/useUploadPage"
import { useUploadHandlers } from "@/hooks/upload/useUploadHandlers"
import useUpdateVideo from "@/hooks/upload/useUpdateVideo"
import { UploadStepsIndicator } from "@/components/upload/UploadStepsIndicator"
import { CelebrationModal } from "@/components/upload/ui/CelebrationModal"
import { UploadSection } from "@/components/upload/sections/UploadSection"
import { TitleSection } from "@/components/upload/sections/TitleSection"
import { DescriptionSection } from "@/components/upload/sections/DescriptionSection"
import { TimestampsSection } from "@/components/upload/sections/TimestampsSection"
import { ThumbnailSection } from "@/components/upload/sections/ThumbnailSection"
import { PreviewSection } from "@/components/upload/sections/PreviewSection"

export default function UploadPage() {
  const uploadPageData = useUploadPage()
  const { updateVideo, isUpdating: isUpdatingVideo, error: updateError } = useUpdateVideo()
  
  const {
    state,
    updateState,
    steps,
    credentialChecking,
    shouldAllowAccess,
    router,
    toast,
    generatedTitles,
    titleLoading,
    generatedDescription,
    descriptionLoading,
    generatedTimestamps,
    timestampsLoading,
    generatedThumbnails,
    thumbnailsLoading,
    previewData,
    previewLoading,
    previewError,
    privacyUpdating,
    privacyError,
    playlists,
    playlistsLoading,
    playlistsError,
    youtubeUploading,
    uploadError,
    videoDownloading,
    downloadError,
    downloadProgress,
    uploadVideo,
    resetUploadState,
    getCurrentVideoData,
    getCurrentVideoId,
    generateTitles,
    saveTitle,
    generateDescriptionAPI,
    saveDescription,
    regenerateDescriptionWithTemplate,
    generateTimestampsAPI,
    saveTimestamps,
    generateThumbnailsAPI,
    getVideoPreview,
    updatePrivacyStatus,
    resetPrivacyState,
    fetchPlaylists,
    uploadToYouTube,
    resetYouTubeUploadState,
    downloadVideo,
  } = uploadPageData

  const handlers = useUploadHandlers({
    state,
    updateState,
    toast,
    uploadVideo,
    resetUploadState,
    downloadVideo,
    generateTitles,
    generateDescriptionAPI,
    regenerateDescriptionWithTemplate,
    generateTimestampsAPI,
    generateThumbnailsAPI,
    updatePrivacyStatus,
    resetPrivacyState,
    uploadToYouTube,
    resetYouTubeUploadState,
    getCurrentVideoId,
    previewData,
    uploadedVideoData: state.uploadedVideoData,
    privacyError,
    uploadError,
  })

  const handleUpdateVideo = async (updates: any) => {
    const videoId = state.uploadedVideoData?.id || getCurrentVideoId()
    if (!videoId) {
      toast({
        title: "Error",
        description: "No video ID found. Please try uploading again.",
        variant: "destructive",
      })
      return
    }

    try {
      await updateVideo(videoId, updates)
    } catch (error) {
      console.error('Failed to update video:', error)
      // Error handling is done in the useUpdateVideo hook
    }
  }

  // Show loading screen while checking YouTube credentials
  if (credentialChecking || !shouldAllowAccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">
            {credentialChecking ? 'Checking YouTube credentials...' : 'Redirecting to YouTube connection...'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={state.showCelebration}
        onClose={() => updateState({ showCelebration: false })}
        onContinue={() => {
          updateState({ showCelebration: false, currentStep: "title" })
        }}
        title="🎉 Upload Successful!"
        description="Your video has been uploaded successfully! Now let's optimize it with AI-generated content."
        continueText="Continue to Title Generation"
      />

      <div className="container mx-auto px-4 py-6 space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="text-center lg:text-left">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Upload Video</h1>
          <p className="text-muted-foreground mt-2">Create and optimize your YouTube content with AI assistance.</p>
        </div>

        {/* Steps Indicator */}
        <UploadStepsIndicator steps={steps} currentStep={state.currentStep} />

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-6 lg:space-y-8">
          
          {/* Upload Section */}
          {state.currentStep === "upload" && (
            <UploadSection
              state={state}
              updateState={updateState}
              handlers={handlers}
              videoDownloading={videoDownloading}
              downloadProgress={downloadProgress}
              downloadError={downloadError}
            />
          )}

          {/* Title Section */}
          {state.currentStep === "title" && (
            <TitleSection
              state={state}
              updateState={updateState}
              handlers={handlers}
              generatedTitles={generatedTitles}
              titleLoading={titleLoading}
              uploadedVideoData={state.uploadedVideoData}
              saveTitle={saveTitle}
            />
          )}

          {/* Description Section */}
          {state.currentStep === "description" && (
            <DescriptionSection
              state={state}
              updateState={updateState}
              handlers={handlers}
              generatedDescription={generatedDescription}
              descriptionLoading={descriptionLoading}
              uploadedVideoData={state.uploadedVideoData}
              saveDescription={saveDescription}
              regenerateDescriptionWithTemplate={regenerateDescriptionWithTemplate}
            />
          )}

          {/* Timestamps Section */}
          {state.currentStep === "timestamps" && (
            <TimestampsSection
              state={state}
              updateState={updateState}
              handlers={handlers}
              generatedTimestamps={generatedTimestamps}
              timestampsLoading={timestampsLoading}
              uploadedVideoData={state.uploadedVideoData}
              saveTimestamps={saveTimestamps}
            />
          )}

          {/* Thumbnail Section */}
          {state.currentStep === "thumbnail" && (
            <ThumbnailSection
              state={state}
              updateState={updateState}
              handlers={handlers}
              generatedThumbnails={generatedThumbnails}
              thumbnailsLoading={thumbnailsLoading}
            />
          )}

          {/* Preview Section */}
          {state.currentStep === "preview" && (
            <PreviewSection
              state={state}
              updateState={updateState}
              handlers={handlers}
              previewData={previewData}
              previewLoading={previewLoading}
              previewError={previewError}
              playlists={playlists}
              playlistsLoading={playlistsLoading}
              playlistsError={playlistsError}
              uploadedVideoData={state.uploadedVideoData}
              getCurrentVideoId={getCurrentVideoId}
              getVideoPreview={getVideoPreview}
              fetchPlaylists={fetchPlaylists}
              onUpdateVideo={handleUpdateVideo}
              isUpdatingVideo={isUpdatingVideo}
            />
          )}

        </div>
      </div>
    </div>
  )
}
