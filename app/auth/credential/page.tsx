"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Key, Eye, EyeOff, CheckCircle } from 'lucide-react'
import { useCreateYouTubeCredentials } from '@/hooks/youtube'
import { useYouTubeCredentials } from '@/hooks/youtube'
import { useAuth } from '@/hooks/auth'

export default function CredentialPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const { createCredentials, isLoading, error, clearError } = useCreateYouTubeCredentials()
  const { 
    checkYouTubeCredentials, 
    hasCredentials, 
    isChecking, 
    error: credentialsError 
  } = useYouTubeCredentials()
  
  const [clientId, setClientId] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [showSecret, setShowSecret] = useState(false)
  const [validationErrors, setValidationErrors] = useState<{
    clientId?: string
    clientSecret?: string
  }>({})

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      router.push('/auth/login')
    }
  }, [isAuthenticated, authLoading, router])

  // Check for existing credentials when component mounts
  useEffect(() => {
    if (isAuthenticated) {
      console.log('🔍 Checking for existing YouTube credentials...')
      checkYouTubeCredentials(false)
    }
  }, [isAuthenticated, checkYouTubeCredentials])

  // Auto-redirect to YouTube connect if credentials already exist
  useEffect(() => {
    if (hasCredentials && !isChecking) {
      console.log('✅ Credentials found, redirecting to YouTube connect...')
      router.push('/auth/youtube-connect')
    }
  }, [hasCredentials, isChecking, router])

  // Clear error when form changes
  useEffect(() => {
    if (error) {
      clearError()
    }
  }, [clientId, clientSecret, error, clearError])

  const validateForm = () => {
    const errors: { clientId?: string; clientSecret?: string } = {}
    
    if (!clientId.trim()) {
      errors.clientId = 'Client ID is required'
    } else if (clientId.trim().length < 10) {
      errors.clientId = 'Client ID must be at least 10 characters'
    }
    
    if (!clientSecret.trim()) {
      errors.clientSecret = 'Client Secret is required'
    } else if (clientSecret.trim().length < 10) {
      errors.clientSecret = 'Client Secret must be at least 10 characters'
    }
    
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      await createCredentials({
        client_id: clientId.trim(),
        client_secret: clientSecret.trim()
      })
      
      // Redirect to YouTube connect page after successful creation
      router.push('/auth/youtube-connect')
    } catch (err) {
      // Error is already handled by the hook
      console.error('Failed to create credentials:', err)
    }
  }

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    )
  }

  // Show loading while checking credentials
  if (isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto" />
          <p className="text-green-700 text-lg font-medium">Checking for existing credentials...</p>
          <p className="text-green-600 text-sm">Please wait while we verify your setup</p>
        </div>
      </div>
    )
  }

  // Show credentials already exist message (briefly before redirect)
  if (hasCredentials) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-green-800">Credentials Found!</h2>
          <p className="text-green-600">Redirecting to YouTube connect...</p>
          <Loader2 className="h-6 w-6 animate-spin text-green-600 mx-auto" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0 bg-white">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Key className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-800">
              YouTube Credentials
            </CardTitle>
            <CardDescription className="text-green-600">
              Enter your YouTube API credentials to continue
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Client ID Field */}
              <div className="space-y-2">
                <Label htmlFor="clientId" className="text-sm font-medium text-green-700">
                  Client ID
                </Label>
                <Input
                  id="clientId"
                  type="text"
                  placeholder="Enter your YouTube Client ID"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className={`border-green-200 focus:border-green-500 focus:ring-green-500 ${validationErrors.clientId ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  disabled={isLoading}
                />
                {validationErrors.clientId && (
                  <p className="text-sm text-red-500">{validationErrors.clientId}</p>
                )}
              </div>

              {/* Client Secret Field */}
              <div className="space-y-2">
                <Label htmlFor="clientSecret" className="text-sm font-medium text-green-700">
                  Client Secret
                </Label>
                <div className="relative">
                  <Input
                    id="clientSecret"
                    type={showSecret ? 'text' : 'password'}
                    placeholder="Enter your YouTube Client Secret"
                    value={clientSecret}
                    onChange={(e) => setClientSecret(e.target.value)}
                    className={`pr-10 border-green-200 focus:border-green-500 focus:ring-green-500 ${validationErrors.clientSecret ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-green-50 text-green-600"
                    onClick={() => setShowSecret(!showSecret)}
                    disabled={isLoading}
                  >
                    {showSecret ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {validationErrors.clientSecret && (
                  <p className="text-sm text-red-500">{validationErrors.clientSecret}</p>
                )}
              </div>

              {/* Error Alert */}
              {error && (
                <Alert variant="destructive" className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={isLoading || !clientId.trim() || !clientSecret.trim()}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Credentials...
                  </>
                ) : (
                  'Create Credentials'
                )}
              </Button>
            </form>

            {/* Help Text */}
            <div className="mt-6 text-center">
              <p className="text-sm text-green-600">
                Don't have credentials?{' '}
                <a
                  href="https://developers.google.com/youtube/v3/getting-started"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 hover:text-green-800 underline font-medium"
                >
                  Learn how to get them
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
