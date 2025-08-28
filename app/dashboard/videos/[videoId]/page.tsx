"use client";

import { useParams } from 'next/navigation';
import useVideo from '@/hooks/dashboard/videos/useVideo';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Eye, MessageCircle, ThumbsUp, Calendar, Clock, Tag, ExternalLink, TrendingUp, TrendingDown, Target, Activity, BarChart3, Lightbulb } from "lucide-react"
import Link from "next/link"
import RefreshButton from "@/components/ui/refresh-button"

// Helper functions
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
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getPerformanceColor = (level: string) => {
  switch (level.toLowerCase()) {
    case "excellent": return "text-green-600 bg-green-100"
    case "good": return "text-blue-600 bg-blue-100"
    case "average": return "text-yellow-600 bg-yellow-100"
    case "poor": return "text-red-600 bg-red-100"
    default: return "text-gray-600 bg-gray-100"
  }
}

const getEngagementColor = (level: string) => {
  switch (level.toLowerCase()) {
    case "high": return "text-green-600 bg-green-100"
    case "medium": return "text-yellow-600 bg-yellow-100"
    case "low": return "text-red-600 bg-red-100"
    default: return "text-gray-600 bg-gray-100"
  }
}

const getGrowthColor = (potential: string) => {
  switch (potential.toLowerCase()) {
    case "high": return "text-green-600 bg-green-100"
    case "medium": return "text-yellow-600 bg-yellow-100"
    case "low": return "text-red-600 bg-red-100"
    default: return "text-gray-600 bg-gray-100"
  }
}

export default function VideoDetailPage() {
  const params = useParams();
  const videoId = params.videoId as string;
  
  const { data, video: videoData, isLoading, error } = useVideo(videoId);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-red-600">Error Loading Video</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button asChild>
            <Link href="/dashboard/videos">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Videos
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!videoData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Video Not Found</h2>
          <p className="text-muted-foreground mb-4">The video you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/dashboard/videos">Back to Videos</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/videos">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Videos
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Video Details</h1>
            <p className="text-muted-foreground mt-1">Comprehensive video analytics and insights</p>
          </div>
        </div>
        <div className="flex justify-end">
          <RefreshButton 
            onRefresh={() => window.location.reload()}
            variant="outline"
            size="sm"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Video Card */}
          <Card>
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={videoData.thumbnail_url || "/placeholder.svg"}
                  alt={videoData.title}
                  className="w-full h-64 md:h-80 object-cover rounded-t-lg"
                />
                <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-1 rounded text-sm font-medium">
                  {formatDuration(videoData.duration)}
                </div>
                <div className="absolute top-4 right-4">
                  <Button size="sm" asChild style={{ backgroundColor: "#00C951" }} className="hover:bg-[#00A843]">
                    <Link href={videoData.youtube_url} target="_blank">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Watch on YouTube
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">{videoData.title}</h2>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Published {formatDate(videoData.published_at)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatDuration(videoData.duration)}
                    </span>
                    <Badge variant="secondary">{videoData.content_category}</Badge>
                    <Badge variant={videoData.privacy_status === "public" ? "default" : "secondary"}>
                      {videoData.privacy_status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">Views</span>
                    </div>
                    <div className="text-2xl font-bold">{videoData.view_count.toLocaleString()}</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm">Likes</span>
                    </div>
                    <div className="text-2xl font-bold">{videoData.like_count}</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">Comments</span>
                    </div>
                    <div className="text-2xl font-bold">{videoData.comment_count}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{videoData.description}</p>
            </CardContent>
          </Card>

          {/* Performance Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Performance Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Performance Score</span>
                      <span className="text-sm text-muted-foreground">{videoData.performance_score}</span>
                    </div>
                    <Progress value={Math.min(videoData.performance_score, 100)} className="h-2" />
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getPerformanceColor(videoData.performance_level)}>
                        {videoData.performance_level}
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Engagement Rate</span>
                      <span className="text-sm text-muted-foreground">{videoData.engagement_rate}%</span>
                    </div>
                    <Progress value={Math.min(videoData.engagement_rate * 10, 100)} className="h-2" />
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getEngagementColor(videoData.engagement_level)}>
                        {videoData.engagement_level}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{videoData.views_per_day}</div>
                      <div className="text-xs text-muted-foreground">Views per Day</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{videoData.watch_time_hours.toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground">Watch Time (hrs)</div>
                    </div>
                  </div>
                  
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{videoData.days_since_published}</div>
                    <div className="text-xs text-muted-foreground">Days Since Published</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {videoData.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span className="text-sm text-blue-800">{recommendation}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Performance Indicators */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Performance Indicators
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded border">
                  <span className="text-sm">High Performing</span>
                  <Badge variant={videoData.analytics_summary.performance_indicators.is_high_performing ? "default" : "secondary"}>
                    {videoData.analytics_summary.performance_indicators.is_high_performing ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded border">
                  <span className="text-sm">Viral Potential</span>
                  <Badge variant={videoData.analytics_summary.performance_indicators.is_viral_potential ? "default" : "secondary"}>
                    {videoData.analytics_summary.performance_indicators.is_viral_potential ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded border">
                  <span className="text-sm">High Engagement</span>
                  <Badge variant={videoData.analytics_summary.performance_indicators.is_high_engagement ? "default" : "secondary"}>
                    {videoData.analytics_summary.performance_indicators.is_high_engagement ? "Yes" : "No"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Engagement Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Engagement Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Likes</span>
                  <span className="text-sm font-medium">{videoData.analytics_summary.engagement_breakdown.likes_percentage}%</span>
                </div>
                <Progress value={videoData.analytics_summary.engagement_breakdown.likes_percentage} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Comments</span>
                  <span className="text-sm font-medium">{videoData.analytics_summary.engagement_breakdown.comments_percentage}%</span>
                </div>
                <Progress value={videoData.analytics_summary.engagement_breakdown.comments_percentage} className="h-2" />
              </div>
              
              <div className="pt-3 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{videoData.analytics_summary.total_engagement}</div>
                  <div className="text-xs text-muted-foreground">Total Engagement</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Content Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Content Type</span>
                  <Badge variant="outline">{videoData.content_type}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Growth Potential</span>
                  <Badge className={getGrowthColor(videoData.growth_potential)}>
                    {videoData.growth_potential}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Category ID</span>
                  <Badge variant="outline">{videoData.category_id}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Tags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {videoData.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" style={{ backgroundColor: "#00C951" }}>
                Edit Video
              </Button>
              <Button variant="outline" className="w-full">
                Regenerate Content
              </Button>
              <Button variant="outline" className="w-full">
                Schedule Publishing
              </Button>
              <Button variant="outline" className="w-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in YouTube Studio
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
