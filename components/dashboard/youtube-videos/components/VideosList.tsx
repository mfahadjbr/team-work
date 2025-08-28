import { VideoData } from "@/types/dashboard/youtube-videos"
import VideoCard from "./VideoCard"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, Clock, MoreHorizontal, Eye, ThumbsUp, MessageCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface VideosListProps {
  videos: VideoData[]
  viewMode: "grid" | "list"
}

export default function VideosList({ videos, viewMode }: VideosListProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "public":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "private":
        return <AlertCircle className="h-4 w-4 text-orange-500" />
      case "unlisted":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return null
    }
  }

  const getPerformanceColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100 border-green-200"
    if (score >= 60) return "text-blue-600 bg-blue-100 border-blue-200"
    if (score >= 40) return "text-yellow-600 bg-yellow-100 border-yellow-200"
    if (score >= 20) return "text-orange-600 bg-orange-100 border-orange-200"
    return "text-red-600 bg-red-100 border-red-200"
  }

  const getEngagementColor = (rate: number) => {
    if (rate >= 10) return "text-green-600 bg-green-100 border-green-200"
    if (rate >= 5) return "text-blue-600 bg-blue-100 border-blue-200"
    if (rate >= 2) return "text-yellow-600 bg-yellow-100 border-yellow-200"
    return "text-red-600 bg-red-100 border-red-200"
  }

  const formatDuration = (duration: string) => {
    if (!duration || duration === "PT0S") return "0:00"
    
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
    if (!match) return duration
    
    const hours = parseInt(match[1] || "0")
    const minutes = parseInt(match[2] || "0")
    const seconds = parseInt(match[3] || "0")
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    })
  }

  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {videos.map((video) => (
          <VideoCard key={video.video_id} video={video} />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {videos.map((video) => (
        <Card key={video.video_id} className="hover:shadow-md transition-all duration-200 hover:scale-[1.01]">
          <CardContent className="p-3 sm:p-4">
            <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
              {/* Thumbnail */}
              <div className="relative flex-shrink-0 w-full lg:w-48">
                <img
                  src={video.thumbnail_url || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full lg:w-48 h-32 lg:h-28 object-cover rounded-lg"
                />
                <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                  {formatDuration(video.duration)}
                </div>
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                    {getStatusIcon(video.privacy_status)}
                    <span className="hidden sm:inline">{video.privacy_status}</span>
                  </Badge>
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0 space-y-3">
                {/* Title and Actions */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base mb-2 line-clamp-2 leading-tight">
                      {video.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                      {video.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/videos/${video.video_id}`}>
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`https://www.youtube.com/watch?v=${video.video_id}`} target="_blank">
                            Watch on YouTube
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit Video</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Eye className="h-3 w-3 text-blue-500" />
                      <span className="font-medium text-sm">{video.view_count.toLocaleString()}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <ThumbsUp className="h-3 w-3 text-green-500" />
                      <span className="font-medium text-sm">{video.like_count}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Likes</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <MessageCircle className="h-3 w-3 text-purple-500" />
                      <span className="font-medium text-sm">{video.comment_count}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Comments</div>
                  </div>
                  <div className="text-center">
                    <Badge className={`${getPerformanceColor(video.performance_score)} text-xs`}>
                      {video.performance_score.toFixed(1)}
                    </Badge>
                    <div className="text-xs text-muted-foreground mt-1">Performance</div>
                  </div>
                  <div className="text-center">
                    <Badge className={`${getEngagementColor(video.engagement_rate)} text-xs`}>
                      {video.engagement_rate.toFixed(1)}%
                    </Badge>
                    <div className="text-xs text-muted-foreground mt-1">Engagement</div>
                  </div>
                  <div className="text-center col-span-2 sm:col-span-1">
                    <div className="text-xs text-muted-foreground">
                      <div>Published {formatDate(video.published_at)}</div>
                      <div className="mt-1">{video.days_since_published} days ago</div>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <Button asChild size="sm" className="flex-1 bg-[#00C951] hover:bg-[#00A843] text-white">
                    <Link href={`/dashboard/videos/${video.video_id}`}>
                      View Details
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="sm:w-auto">
                    <Link href={`https://www.youtube.com/watch?v=${video.video_id}`} target="_blank">
                      Watch on YouTube
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
