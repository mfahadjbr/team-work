
"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"
import { useDashboardOverview } from "@/hooks/dashboard/overview"

// Import separated components
import DashboardHeader from "./components/DashboardHeader"
import KeyMetricsCards from "./components/KeyMetricsCards"
import MonetizationProgress from "./components/MonetizationProgress"
import TopPerformingContent from "./components/TopPerformingContent"
import ChannelInsightsGrid from "./components/ChannelInsightsGrid"
import QuickActions from "./components/QuickActions"
import WeeklyPerformanceChart from "./charts/WeeklyPerformanceChart"
import ContentTypeChart from "./charts/ContentTypeChart"
import ViewDistributionChart from "./charts/ViewDistributionChart"
import DurationDistributionChart from "./charts/DurationDistributionChart"

export default function DashboardOverview() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const { overviewData, isLoading: dataLoading, error, refetch } = useDashboardOverview()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login")
      return
    }
    setIsLoading(false)
  }, [router])

  const handleRefresh = useCallback(async () => {
    if (refetch) {
      await refetch()
    }
  }, [refetch])

  if (isLoading || dataLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Error Loading Dashboard</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  if (!overviewData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">No Data Available</h2>
          <p className="text-muted-foreground">Unable to load dashboard data</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header Section */}
      <DashboardHeader 
        channelInfo={overviewData.channel_info}
        channelStatus={overviewData.channel_status}
        competitiveAnalysis={overviewData.competitive_analysis}
        onRefresh={handleRefresh}
      />

      {/* Key Metrics Cards */}
      <KeyMetricsCards 
        channelInfo={overviewData.channel_info}
        performanceMetrics={overviewData.performance_metrics}
      />

      {/* Monetization Progress */}
      <MonetizationProgress 
        channelInfo={overviewData.channel_info}
        summaryStats={overviewData.summary_stats}
      />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeeklyPerformanceChart 
          weeklyData={overviewData.weekly_analytics.weekly_data}
        />
        <ContentTypeChart 
          contentTypeBreakdown={overviewData.advanced_analytics.content_type_breakdown}
        />
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ViewDistributionChart 
          viewDistribution={overviewData.content_analysis.view_distribution}
        />
        <DurationDistributionChart 
          durationDistribution={overviewData.advanced_analytics.duration_distribution}
        />
      </div>

      {/* Top Performing Content */}
      <TopPerformingContent 
        topPerformingContent={overviewData.top_performing_content}
      />

      {/* Channel Insights Grid */}
      <ChannelInsightsGrid 
        performanceMetrics={overviewData.performance_metrics}
        channelStatus={overviewData.channel_status}
        competitiveAnalysis={overviewData.competitive_analysis}
        summaryStats={overviewData.summary_stats}
      />

      {/* Quick Actions */}
      <QuickActions />
    </div>
  )
}