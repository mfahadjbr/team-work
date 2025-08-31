"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Filter, CheckSquare } from "lucide-react"

export default function ContentPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-green-800">Channel content</h1>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-green-200">
        <nav className="flex space-x-8">
          <button className="px-1 py-4 text-green-800 border-b-2 border-green-600 font-medium">
            Inspiration
          </button>
          <button className="px-1 py-4 text-green-800 border-b-2 border-green-600 font-medium">
            Videos
          </button>
          <button className="px-1 py-4 text-green-600 hover:text-green-800 transition-colors">
            Shorts
          </button>
          <button className="px-1 py-4 text-green-600 hover:text-green-800 transition-colors">
            Live
          </button>
          <button className="px-1 py-4 text-green-600 hover:text-green-800 transition-colors">
            Posts
          </button>
          <button className="px-1 py-4 text-green-600 hover:text-green-800 transition-colors">
            Playlists
          </button>
          <button className="px-1 py-4 text-green-600 hover:text-green-800 transition-colors">
            Podcasts
          </button>
          <button className="px-1 py-4 text-green-600 hover:text-green-800 transition-colors">
            Promotions
          </button>
        </nav>
      </div>

      {/* Filter and Table Headers */}
      <div className="space-y-4">
        {/* Filter Bar */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-green-600 hover:text-green-800 hover:bg-green-50">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Table Headers */}
        <div className="grid grid-cols-6 gap-4 text-sm text-green-600 border-b border-green-200 pb-2">
          <div className="flex items-center space-x-2">
            <CheckSquare className="h-4 w-4" />
            <span>Video</span>
          </div>
          <div className="text-center">Visibility</div>
          <div className="text-center">Restrictions</div>
          <div className="text-center">Date</div>
          <div className="text-center">Views</div>
          <div className="text-center">Comments</div>
        </div>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-16 space-y-6">
        {/* Illustration */}
        <div className="relative">
          <div className="w-48 h-48 bg-green-400 rounded-full flex items-center justify-center relative">
            <div className="w-32 h-32 bg-green-300 rounded-full flex items-center justify-center">
              <div className="w-20 h-20 bg-green-200 rounded-full flex items-center justify-center">
                <Upload className="h-10 w-10 text-green-600" />
              </div>
            </div>
          </div>
          
          {/* Table and Camera */}
          <div className="absolute -bottom-4 -right-4 w-16 h-12 bg-green-300 rounded-lg border-2 border-green-500"></div>
          <div className="absolute -bottom-2 -right-8 w-8 h-6 bg-white rounded border-2 border-green-500"></div>
          <div className="absolute -bottom-6 -right-2 w-4 h-4 bg-white rounded-full border-2 border-green-500"></div>
        </div>

        {/* Message */}
        <div className="text-center space-y-2">
          <p className="text-xl text-green-600">No content available</p>
        </div>

        {/* Call to Action */}
        <Button className="bg-green-600 text-white hover:bg-green-700 border-0 px-8 py-3 text-lg">
          Upload videos
        </Button>
      </div>
    </div>
  )
}
