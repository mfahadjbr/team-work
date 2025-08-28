import { useState, useCallback } from 'react'
import axios from 'axios'
import useAuth from './useAuth'
import { useToast } from './use-toast'

const API_BASE_URL = 'http://localhost:8000'

export interface TitleGenerateResponse {
  video_id: string
  generated_titles: string[]
  success: boolean
  message: string
}

export interface TitleSaveRequest {
  title: string
}

export interface TitleSaveResponse {
  id: number
  title: string
  video_id: string
  user_id: string
  created_at: string
  updated_at: string
}

export interface TitleRegenerateRequest {
  user_requirements: string
}

export default function useTitle() {
  const { getAuthHeaders } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [generatedTitles, setGeneratedTitles] = useState<string[]>([])

  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  const generateTitles = useCallback(async (videoId: string): Promise<TitleGenerateResponse | undefined> => {
    if (!videoId) {
      const errorMsg = 'Video ID is required'
      setError(errorMsg)
      toast({ title: 'Missing Video ID', description: errorMsg })
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const headers = getAuthHeaders()
      const url = `/title-generator/${videoId}/generate`
      
      console.log('[Title][Generate] Request', {
        url: `${API_BASE_URL}${url}`,
        videoId,
        hasAuthHeader: !!(headers as any)?.Authorization,
        headers: { ...headers, Authorization: (headers as any)?.Authorization ? 'Bearer ***' : undefined },
      })

      const res = await axiosInstance.post(url, '', { headers })
      
      console.log('[Title][Generate] Response', {
        status: res.status,
        keys: Object.keys(res.data || {}),
        titlesCount: res.data?.generated_titles?.length,
        videoId: res.data?.video_id,
        success: res.data?.success,
        message: res.data?.message,
        fullData: res.data,
      })

      const titles = res.data?.generated_titles || []
      setGeneratedTitles(titles)

      toast({ 
        title: 'Titles Generated', 
        description: `Generated ${titles.length} titles successfully.` 
      })
      
      return res.data
    } catch (error: any) {
      let errorMessage = 'Failed to generate titles'
      
      if (axios.isAxiosError(error)) {
        console.error('[Title][Generate] Error', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          url: error.config?.url,
          data: error.response?.data,
          message: error.message,
        })

        if (error.response?.status === 401) {
          errorMessage = 'Authentication failed. Please login again.'
        } else if (error.response?.status === 400) {
          errorMessage = error.response.data?.detail || 'Invalid video ID or request'
        } else if (error.response?.status === 404) {
          errorMessage = 'Video not found. Please upload a video first.'
        } else if (error.response?.status === 422) {
          errorMessage = 'Invalid request data. Please check the video ID.'
        } else if (error.response?.status === 500) {
          errorMessage = 'Server error. Please try again later.'
        } else {
          errorMessage = `Request failed: ${error.response?.status} ${error.response?.statusText}`
        }
      } else {
        console.error('[Title][Generate] Error (non-axios)', error)
        errorMessage = error.message || 'Network error occurred'
      }
      
      setError(errorMessage)
      toast({ 
        title: 'Failed to generate titles', 
        description: errorMessage 
      })
      
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [getAuthHeaders, toast])

  const saveTitle = useCallback(async (videoId: string, title: string): Promise<TitleSaveResponse | undefined> => {
    if (!videoId || !title) {
      const errorMsg = 'Video ID and title are required'
      setError(errorMsg)
      toast({ title: 'Missing Data', description: errorMsg })
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const headers = getAuthHeaders()
      const url = `/title-generator/${videoId}/save`
      
      console.log('[Title][Save] Request', {
        url: `${API_BASE_URL}${url}`,
        videoId,
        titleLength: title.length,
        hasAuthHeader: !!(headers as any)?.Authorization,
        headers: { ...headers, Authorization: (headers as any)?.Authorization ? 'Bearer ***' : undefined },
      })

      const requestData: TitleSaveRequest = {
        title
      }

      const res = await axiosInstance.post(url, requestData, { headers })
      
      console.log('[Title][Save] Response', {
        status: res.status,
        keys: Object.keys(res.data || {}),
        id: res.data?.id,
        title: res.data?.title,
        videoId: res.data?.video_id,
        userId: res.data?.user_id,
      })

      toast({ 
        title: 'Title Saved', 
        description: 'Title saved successfully.' 
      })
      
      return res.data
    } catch (error: any) {
      let errorMessage = 'Failed to save title'
      
      if (axios.isAxiosError(error)) {
        console.error('[Title][Save] Error', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          url: error.config?.url,
          data: error.response?.data,
          message: error.message,
        })

        if (error.response?.status === 401) {
          errorMessage = 'Authentication failed. Please login again.'
        } else if (error.response?.status === 400) {
          errorMessage = error.response.data?.detail || 'Invalid title or video ID'
        } else if (error.response?.status === 404) {
          errorMessage = 'Video not found. Please upload a video first.'
        } else if (error.response?.status === 422) {
          errorMessage = 'Invalid request data. Please check your input.'
        } else if (error.response?.status === 500) {
          errorMessage = 'Server error. Please try again later.'
        } else {
          errorMessage = `Request failed: ${error.response?.status} ${error.response?.statusText}`
        }
      } else {
        console.error('[Title][Save] Error (non-axios)', error)
        errorMessage = error.message || 'Network error occurred'
      }
      
      setError(errorMessage)
      toast({ 
        title: 'Failed to save title', 
        description: errorMessage 
      })
      
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [getAuthHeaders, toast])

  const regenerateTitlesWithRequirements = useCallback(async (
    videoId: string, 
    userRequirements: string
  ): Promise<TitleGenerateResponse | undefined> => {
    if (!videoId || !userRequirements) {
      const errorMsg = 'Video ID and requirements are required'
      setError(errorMsg)
      toast({ title: 'Missing Data', description: errorMsg })
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const headers = getAuthHeaders()
      const url = `/title-generator/${videoId}/regenerate-with-requirements`
      
      console.log('[Title][Regenerate] Request', {
        url: `${API_BASE_URL}${url}`,
        videoId,
        requirementsLength: userRequirements.length,
        hasAuthHeader: !!(headers as any)?.Authorization,
        headers: { ...headers, Authorization: (headers as any)?.Authorization ? 'Bearer ***' : undefined },
      })

      const requestData: TitleRegenerateRequest = {
        user_requirements: userRequirements
      }

      const res = await axiosInstance.post(url, requestData, { headers })
      
      console.log('[Title][Regenerate] Response', {
        status: res.status,
        keys: Object.keys(res.data || {}),
        titlesCount: res.data?.generated_titles?.length,
        videoId: res.data?.video_id,
        success: res.data?.success,
        message: res.data?.message,
        fullData: res.data,
      })

      const titles = res.data?.generated_titles || []
      setGeneratedTitles(titles)

      toast({ 
        title: 'Titles Regenerated', 
        description: `Generated ${titles.length} new titles based on your requirements.` 
      })
      
      return res.data
    } catch (error: any) {
      let errorMessage = 'Failed to regenerate titles'
      
      if (axios.isAxiosError(error)) {
        console.error('[Title][Regenerate] Error', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          url: error.config?.url,
          data: error.response?.data,
          message: error.message,
        })

        if (error.response?.status === 401) {
          errorMessage = 'Authentication failed. Please login again.'
        } else if (error.response?.status === 400) {
          errorMessage = error.response.data?.detail || 'Invalid requirements or video ID'
        } else if (error.response?.status === 404) {
          errorMessage = 'Video not found. Please upload a video first.'
        } else if (error.response?.status === 422) {
          errorMessage = 'Invalid request data. Please check your requirements.'
        } else if (error.response?.status === 500) {
          errorMessage = 'Server error. Please try again later.'
        } else {
          errorMessage = `Request failed: ${error.response?.status} ${error.response?.statusText}`
        }
      } else {
        console.error('[Title][Regenerate] Error (non-axios)', error)
        errorMessage = error.message || 'Network error occurred'
      }
      
      setError(errorMessage)
      toast({ 
        title: 'Failed to regenerate titles', 
        description: errorMessage 
      })
      
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [getAuthHeaders, toast])

  const clearTitles = useCallback(() => {
    setGeneratedTitles([])
    setError(null)
  }, [])

  return {
    isLoading,
    error,
    generatedTitles,
    generateTitles,
    saveTitle,
    regenerateTitlesWithRequirements,
    clearTitles,
  }
}