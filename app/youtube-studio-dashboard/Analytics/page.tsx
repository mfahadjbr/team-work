"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, Info } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-green-800">Channel analytics</h1>
        <Button className="bg-green-600 hover:bg-green-700 text-white border-0">
          Advanced mode
        </Button>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-green-200">
        <nav className="flex space-x-8">
          <button className="px-1 py-4 text-green-800 border-b-2 border-green-600 font-medium">
            Overview
          </button>
          <button className="px-1 py-4 text-green-600 hover:text-green-800 transition-colors">
            Content
          </button>
          <button className="px-1 py-4 text-green-600 hover:text-green-800 transition-colors">
            Audience
          </button>
          <button className="px-1 py-4 text-green-600 hover:text-green-800 transition-colors">
            Trends
          </button>
        </nav>
      </div>

      {/* Date Range and Main Message */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-2xl font-bold text-green-800">Your channel didn't get any views in the last 28 days</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-green-600">Jul 29 – Aug 25, 2025</p>
          <div className="flex items-center space-x-2">
            <span className="text-green-800 font-medium">Last 28 days</span>
            <ChevronDown className="h-4 w-4 text-green-600" />
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="bg-white border-green-200 text-green-900 shadow-sm">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-green-600 mb-2">Views</p>
            <p className="text-3xl font-bold text-green-800">—</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-green-200 text-green-900 shadow-sm">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-green-600 mb-2">Watch time (hours)</p>
            <p className="text-3xl font-bold text-green-800">—</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-green-200 text-green-900 shadow-sm">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-green-600 mb-2">Subscribers</p>
            <p className="text-3xl font-bold text-green-800">—</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Chart Area */}
      <Card className="bg-white border-green-200 text-green-900 shadow-sm">
        <CardContent className="p-6">
          <div className="h-64 relative">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-sm text-green-600">
              <span>3</span>
              <span>2</span>
              <span>1</span>
              <span>0</span>
            </div>
            
            {/* Chart area */}
            <div className="ml-8 h-full relative">
              {/* Horizontal line at 0 */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-green-400"></div>
              
              {/* X-axis labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-sm text-green-600">
                <span>Jul 29, 2025</span>
                <span>Aug 3, 2025</span>
                <span>Aug 7, 2025</span>
                <span>Aug 12, 2025</span>
                <span>Aug 16, 2025</span>
                <span>Aug 21, 2025</span>
                <span>Aug 25,...</span>
              </div>
            </div>
            
            {/* See more button */}
            <Button className="absolute bottom-4 left-0 bg-green-600 hover:bg-green-700 text-white border-0">
              See more
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Right Sidebar - Realtime */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          {/* Content area for additional charts */}
        </div>
        
        <Card className="bg-white border-green-200 text-green-900 shadow-sm">
          <CardHeader>
            <CardTitle className="text-green-800">Realtime</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-600">Updating live</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-green-800">—</span>
                <span className="text-sm text-green-600">Subscribers</span>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white border-0">
                See live count
              </Button>
            </div>
            
            <div className="space-y-2 pt-4 border-t border-green-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-green-800">0</span>
                  <span className="text-sm text-green-600">Views · Last 48 hours</span>
                </div>
                <span className="text-sm text-green-600">Now</span>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white border-0">
                See more
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
