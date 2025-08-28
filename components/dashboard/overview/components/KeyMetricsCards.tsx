import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Video, Eye, Users, BarChart3, TrendingUp } from "lucide-react"

interface KeyMetricsCardsProps {
  channelInfo: {
    total_videos: number
    total_views: number
    subscriber_count: number
  }
  performanceMetrics: {
    videos_per_month: number
    views_per_month: number
    subscribers_per_month: number
    overall_engagement_rate: number
  }
}

export default function KeyMetricsCards({ 
  channelInfo, 
  performanceMetrics 
}: KeyMetricsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-green-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
          <Video className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{channelInfo.total_videos}</div>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-green-500" />
            +{performanceMetrics.videos_per_month.toFixed(1)}/month
          </p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-green-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Views</CardTitle>
          <Eye className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{channelInfo.total_views.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-green-500" />
            +{performanceMetrics.views_per_month.toFixed(1)}/month
          </p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-green-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
          <Users className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{channelInfo.subscriber_count}</div>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-green-500" />
            +{performanceMetrics.subscribers_per_month.toFixed(2)}/month
          </p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-green-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
          <BarChart3 className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{performanceMetrics.overall_engagement_rate.toFixed(2)}%</div>
          <p className="text-xs text-muted-foreground">
            Avg per video
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
