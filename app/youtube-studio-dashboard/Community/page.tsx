"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Filter, ChevronDown, X, CheckSquare } from "lucide-react"

export default function CommunityPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-green-800">Community</h1>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-green-200">
        <nav className="flex space-x-8">
          <button className="px-1 py-4 text-green-800 border-b-2 border-green-600 font-medium">
            Comments
          </button>
          <button className="px-1 py-4 text-green-600 hover:text-green-800 transition-colors">
            Viewer posts
          </button>
          <button className="px-1 py-4 text-green-600 hover:text-green-800 transition-colors">
            Mentions
          </button>
        </nav>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" className="text-green-600 hover:text-green-800 hover:bg-green-50">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
        
        <Button variant="outline" className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100">
          Published
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
        
        <Button variant="outline" className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100">
          Sort by
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
        
        {/* Active Filter Tag */}
        <div className="flex items-center space-x-2 bg-green-100 px-3 py-2 rounded-lg">
          <span className="text-sm text-green-800">Response status: Unresponded</span>
          <Button variant="ghost" size="sm" className="h-5 w-5 p-0 text-green-800 hover:bg-green-200">
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <div className="space-y-4">
        {/* Checkbox */}
        <div className="flex items-center space-x-2">
          <CheckSquare className="h-4 w-4 text-green-600" />
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-16 space-y-6">
          {/* Illustration */}
          <div className="relative">
            <div className="w-48 h-48 bg-green-400 rounded-full flex items-center justify-center relative">
              {/* Multiple eyes on the creature */}
              <div className="absolute top-4 left-4 w-3 h-3 bg-black rounded-full"></div>
              <div className="absolute top-4 right-4 w-3 h-3 bg-black rounded-full"></div>
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-black rounded-full"></div>
              <div className="absolute top-12 left-6 w-3 h-3 bg-black rounded-full"></div>
              <div className="absolute top-12 right-6 w-3 h-3 bg-black rounded-full"></div>
              
              {/* Binoculars at feet */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-black rounded-full flex items-center justify-center">
                <div className="w-6 h-3 bg-green-300 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="text-center space-y-2">
            <p className="text-xl text-green-600">No comments found. Try searching for something else or removing filters.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
