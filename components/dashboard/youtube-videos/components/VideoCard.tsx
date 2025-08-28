import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, Clock, Eye, ThumbsUp, MessageCircle } from "lucide-react"
import Link from "next/link"
import { VideoData } from "@/types/dashboard/youtube-videos"

interface VideoCardProps {
  video: VideoData
}

export default function VideoCard({ video }: VideoCardProps) {
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

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 hover:scale-[1.02] h-full flex flex-col group">
      <CardContent className="p-0 flex flex-col h-full">
        {/* Thumbnail Section */}
        <div className="relative">
          <img
            src={video.thumbnail_url || "/placeholder.svg"}
            alt={video.title}
            className="w-full h-40 sm:h-44 lg:h-40 xl:h-44 2xl:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Status Badge */}
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="flex items-center gap-1 text-xs bg-white/90 backdrop-blur-sm">
              {getStatusIcon(video.privacy_status)}
              <span className="hidden sm:inline lg:hidden xl:inline">{video.privacy_status}</span>
            </Badge>
          </div>
          
          {/* Duration Badge */}
          <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
            {formatDuration(video.duration)}
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-3 sm:p-4 lg:p-3 xl:p-4 space-y-3 flex-1 flex flex-col">
          {/* Title and Description */}
          <div className="flex-1">
            <h3 className="font-semibold text-sm lg:text-xs xl:text-sm line-clamp-2 mb-2 leading-tight group-hover:text-primary transition-colors">
              {video.title}
            </h3>
            <p className="text-xs lg:text-[11px] xl:text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {video.description}
            </p>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 text-xs lg:text-[11px] xl:text-xs">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Eye className="h-3 w-3 text-blue-500" />
                <span className="font-medium truncate">{video.view_count.toLocaleString()}</span>
              </div>
              <div className="text-muted-foreground">Views</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <ThumbsUp className="h-3 w-3 text-green-500" />
                <span className="font-medium">{video.like_count}</span>
              </div>
              <div className="text-muted-foreground">Likes</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <MessageCircle className="h-3 w-3 text-purple-500" />
                <span className="font-medium">{video.comment_count}</span>
              </div>
              <div className="text-muted-foreground">Comments</div>
            </div>
          </div>
          
          {/* Performance and Engagement */}
          <div className="flex flex-col gap-2 text-xs lg:text-[11px] xl:text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground hidden sm:inline lg:hidden xl:inline">Performance:</span>
                <span className="text-muted-foreground sm:hidden lg:inline xl:hidden">Perf:</span>
                <Badge className={`${getPerformanceColor(video.performance_score)} text-xs`}>
                  {video.performance_score.toFixed(1)}
                </Badge>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground hidden sm:inline lg:hidden xl:inline">Engagement:</span>
                <span className="text-muted-foreground sm:hidden lg:inline xl:hidden">Eng:</span>
                <Badge className={`${getEngagementColor(video.engagement_rate)} text-xs`}>
                  {video.engagement_rate.toFixed(1)}%
                </Badge>
              </div>
            </div>
          </div>
          
          {/* Date and Time */}
          <div className="flex items-center justify-between text-xs lg:text-[11px] xl:text-xs text-muted-foreground">
            <span className="truncate">{formatDate(video.published_at)}</span>
            <span className="whitespace-nowrap ml-2">{video.days_since_published}d ago</span>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-2 mt-auto pt-2">
            <Button 
              asChild 
              size="sm" 
              className="flex-1 bg-[#00C951] hover:bg-[#00A843] text-white text-xs lg:text-[11px] xl:text-xs h-8"
            >
              <Link href={`/dashboard/videos/${video.video_id}`}>
                <span className="hidden sm:inline lg:hidden xl:inline">View Details</span>
                <span className="sm:hidden lg:inline xl:hidden">Details</span>
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="sm:w-auto lg:w-full xl:w-auto text-xs lg:text-[11px] xl:text-xs h-8"
            >
              <Link href={`https://www.youtube.com/watch?v=${video.video_id}`} target="_blank">
                Watch
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
