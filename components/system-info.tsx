"use client"

import { useState, useEffect } from "react"
import { Eye, EyeOff, Globe, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface SystemInfo {
  ip: string
  isp: string
}

export function SystemInfo() {
  const [isRevealed, setIsRevealed] = useState(false)
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchSystemInfo = async () => {
    setIsLoading(true)
    try {
      // Try multiple IP detection services
      let ipData = null

      try {
        const response = await fetch("https://api.ipify.org?format=json")
        const data = await response.json()
        if (data.ip) {
          ipData = { ip: data.ip, isp: "Detecting ISP..." }

          // Try to get ISP info
          try {
            const ispResponse = await fetch(`https://ipapi.co/${data.ip}/json/`)
            const ispData = await ispResponse.json()
            if (ispData.org) {
              ipData.isp = ispData.org
            }
          } catch (error) {
            console.log("ISP detection failed, using basic info")
          }
        }
      } catch (error) {
        // Fallback to ipapi.co
        try {
          const response = await fetch("https://ipapi.co/json/")
          const data = await response.json()
          ipData = {
            ip: data.ip || "Unable to detect",
            isp: data.org || "Unknown ISP",
          }
        } catch (fallbackError) {
          console.error("All IP detection methods failed")
        }
      }

      setSystemInfo(
        ipData || {
          ip: "Unable to detect",
          isp: "Unknown ISP",
        },
      )
    } catch (error) {
      console.error("Failed to fetch system info:", error)
      setSystemInfo({
        ip: "Detection failed",
        isp: "Unknown ISP",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isRevealed && !systemInfo) {
      fetchSystemInfo()
    }
  }, [isRevealed, systemInfo])

  const toggleReveal = () => {
    setIsRevealed(!isRevealed)
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-3">
        <h5 className="text-sm font-medium text-gray-200">System Information</h5>
        <button
          onClick={toggleReveal}
          className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300 hover:scale-110"
        >
          {isRevealed ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
        </button>
      </div>

      <div className="relative">
        <Card
          className={`bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 transition-all duration-500 ${
            !isRevealed ? "blur-sm opacity-60" : "blur-none opacity-100"
          }`}
        >
          <CardContent className="p-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-6">
                <span className="text-gray-300 text-sm">Detecting IP address...</span>
              </div>
            ) : systemInfo ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded-lg bg-black/30">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-blue-400" />
                    <span className="text-gray-300 text-sm">IPv4 Address</span>
                  </div>
                  <span className="text-green-300 font-mono text-sm">{systemInfo.ip}</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-black/30">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-purple-400" />
                    <span className="text-gray-300 text-sm">ISP</span>
                  </div>
                  <span className="text-purple-300 text-sm truncate max-w-32">{systemInfo.isp}</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-300 text-sm">Click the eye icon to reveal system details</div>
            )}
          </CardContent>
        </Card>

        {!isRevealed && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/90 px-3 py-1.5 rounded-lg border border-gray-700">
              <span className="text-gray-300 text-xs font-medium">● CLASSIFIED</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
