"use client";
import { useState, useEffect } from "react";
import { ComprehensivePlaylistResponse } from "@/types/dashboard/playlists";

const usePlaylistAnalytics = (playlistId: string) => {
  const [playlistData, setPlaylistData] =
    useState<ComprehensivePlaylistResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylistData = async () => {
      setIsLoading(true);
      setError(null);
      try {
                const token = localStorage.getItem('auth_token') 

        const response = await fetch(
          `http://localhost:8000/dashboard/playlists/${playlistId}/comprehensive`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch comprehensive playlist data");
        }

        const data: ComprehensivePlaylistResponse = await response.json();
        setPlaylistData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (playlistId) {
      fetchPlaylistData();
    }
  }, [playlistId]);

  return { playlistData, isLoading, error };
};

export default usePlaylistAnalytics;
