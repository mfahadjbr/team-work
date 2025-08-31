"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wand2, Palette, Image, Type } from "lucide-react"

export default function CustomizationPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-green-800">Channel customization</h1>
      </div>

      {/* Customization Options */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Branding */}
        <Card className="bg-white border-green-200 text-green-900 shadow-sm">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center space-x-2">
              <Palette className="h-5 w-5" />
              <span>Branding</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-green-700">
              Customize your channel's visual identity with profile pictures, banners, and watermarks.
            </p>
            <Button className="bg-green-600 hover:bg-green-700 text-white border-0">
              Customize branding
            </Button>
          </CardContent>
        </Card>

        {/* Layout */}
        <Card className="bg-white border-green-200 text-green-900 shadow-sm">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center space-x-2">
              <Wand2 className="h-5 w-5" />
              <span>Layout</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-green-700">
              Organize your channel's layout and featured content sections.
            </p>
            <Button className="bg-green-600 hover:bg-green-700 text-white border-0">
              Customize layout
            </Button>
          </CardContent>
        </Card>

        {/* Basic Info */}
        <Card className="bg-white border-green-200 text-green-900 shadow-sm">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center space-x-2">
              <Type className="h-5 w-5" />
              <span>Basic info</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-green-700">
              Update your channel name, description, and other basic information.
            </p>
            <Button className="bg-green-600 hover:bg-green-700 text-white border-0">
              Edit basic info
            </Button>
          </CardContent>
        </Card>

        {/* Featured Sections */}
        <Card className="bg-white border-green-200 text-green-900 shadow-sm">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center space-x-2">
              <Image className="h-5 w-5" />
              <span>Featured sections</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-green-700">
              Create and organize featured sections to showcase your best content.
            </p>
            <Button className="bg-green-600 hover:bg-green-700 text-white border-0">
              Manage sections
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Coming Soon */}
      <div className="text-center py-8">
        <p className="text-green-600 text-lg">More customization options coming soon!</p>
      </div>
    </div>
  )
}
