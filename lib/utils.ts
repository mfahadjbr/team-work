import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to safely convert values to numbers with fallback
export const asNumber = (value: any, fallback = 0): number => {
  if (value === null || value === undefined) return fallback
  const num = Number(value)
  return Number.isFinite(num) ? num : fallback
}

// Utility function to safely format dates
export const safeFormatDate = (dateString: string | null | undefined, fallback = 'N/A'): string => {
  if (!dateString) return fallback
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return fallback
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    })
  } catch (error) {
    return fallback
  }
}

// Utility function to safely format duration
export const safeFormatDuration = (duration: string | null | undefined, fallback = '0:00'): string => {
  if (!duration || duration === "PT0S") return fallback
  
  try {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
    if (!match) return duration
    
    const hours = parseInt(match[1] || "0")
    const minutes = parseInt(match[2] || "0")
    const seconds = parseInt(match[3] || "0")
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  } catch (error) {
    return fallback
  }
}

// Utility function to safely get performance color
export const getSafePerformanceColor = (score: number | null | undefined): string => {
  const safeScore = asNumber(score)
  if (safeScore < 0) return "text-gray-600 bg-gray-100 border-gray-200"
  if (safeScore >= 80) return "text-green-600 bg-green-100 border-green-200"
  if (safeScore >= 60) return "text-blue-600 bg-blue-100 border-blue-200"
  if (safeScore >= 40) return "text-yellow-600 bg-yellow-100 border-yellow-200"
  if (safeScore >= 20) return "text-orange-600 bg-orange-100 border-orange-200"
  return "text-red-600 bg-red-100 border-red-200"
}

// Utility function to safely get engagement color
export const getSafeEngagementColor = (rate: number | null | undefined): string => {
  const safeRate = asNumber(rate)
  if (safeRate < 0) return "text-gray-600 bg-gray-100 border-gray-200"
  if (safeRate >= 10) return "text-green-600 bg-green-100 border-green-200"
  if (safeRate >= 5) return "text-blue-600 bg-blue-100 border-blue-200"
  if (safeRate >= 2) return "text-yellow-600 bg-yellow-100 border-yellow-200"
  return "text-red-600 bg-red-100 border-red-200"
}
