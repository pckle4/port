"use client"

import { useEffect, useState } from "react"
import { Globe, Monitor, Shield, Loader2, Info } from "lucide-react"

interface SystemData {
  ipv4: string
  os: string
  isp: string
}

export function EnhancedSystemInfo() {
  const [systemData, setSystemData] = useState<SystemData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const fetchSystemData = async () => {
      try {
        // Get OS info immediately
        const getOSInfo = () => {
          const userAgent = navigator.userAgent
          if (userAgent.includes("Windows")) return "Windows"
          if (userAgent.includes("Mac")) return "macOS"
          if (userAgent.includes("Linux")) return "Linux"
          if (userAgent.includes("Android")) return "Android"
          if (userAgent.includes("iPhone") || userAgent.includes("iPad")) return "iOS"
          return "Unknown"
        }

        // Set initial data with OS
        const initialData: SystemData = {
          ipv4: "Detecting...",
          os: getOSInfo(),
          isp: "Detecting...",
        }
        setSystemData(initialData)

        // Fetch real-time IPv4 and ISP data
        try {
          // First, get the real IPv4 address
          const ipResponse = await fetch("https://api.ipify.org?format=json")
          const ipData = await ipResponse.json()

          if (ipData.ip) {
            // Update with real IP immediately
            setSystemData((prev) => ({
              ...prev!,
              ipv4: ipData.ip,
            }))

            // Then get ISP information
            try {
              const ispResponse = await fetch(`https://ipapi.co/${ipData.ip}/json/`)
              const ispData = await ispResponse.json()

              setSystemData((prev) => ({
                ...prev!,
                isp: ispData.org || ispData.isp || "Unknown ISP",
              }))
            } catch (ispError) {
              console.error("ISP detection failed:", ispError)
              setSystemData((prev) => ({
                ...prev!,
                isp: "ISP lookup failed",
              }))
            }
          }
        } catch (error) {
          console.error("IP detection failed:", error)
          setSystemData((prev) => ({
            ...prev!,
            ipv4: "Detection failed",
            isp: "Unknown ISP",
          }))
        }
      } catch (error) {
        console.error("System info error:", error)
        setSystemData({
          ipv4: "Error",
          os: "Unknown",
          isp: "Error",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchSystemData()
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-gray-400">
          <Loader2 className="h-3 w-3 animate-spin text-blue-400" />
          <span className="text-xs">Loading system info...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2 mb-3">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <h5 className="text-xs font-semibold text-gray-300 uppercase tracking-wide">System Info</h5>
        <div className="relative">
          <Info
            className="h-3 w-3 text-gray-500 cursor-help"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          />
          {showTooltip && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap z-50 border border-gray-700">
              <div className="text-center">
                <div className="font-medium text-yellow-400 mb-1">Real-time Data</div>
                <div>Live system information</div>
                <div>fetched from your device</div>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          )}
        </div>
      </div>

      {/* IPv4 Address - Real-time */}
      <div className="flex items-center py-1 hover:bg-gray-800/20 rounded transition-colors duration-200">
        <Globe className="h-3 w-3 text-blue-400 mr-2" />
        <span className="text-gray-400 text-xs mr-2">IPv4:</span>
        <span className="text-blue-300 font-mono text-xs">{systemData?.ipv4}</span>
      </div>

      {/* Operating System */}
      <div className="flex items-center py-1 hover:bg-gray-800/20 rounded transition-colors duration-200">
        <Monitor className="h-3 w-3 text-green-400 mr-2" />
        <span className="text-gray-400 text-xs mr-2">OS:</span>
        <span className="text-green-300 text-xs">{systemData?.os}</span>
      </div>

      {/* ISP - Real-time */}
      <div className="flex items-start py-1 hover:bg-gray-800/20 rounded transition-colors duration-200">
        <Shield className="h-3 w-3 text-purple-400 mr-2 mt-0.5" />
        <span className="text-gray-400 text-xs mr-2">ISP:</span>
        <span className="text-purple-300 text-xs leading-tight flex-1">
          {systemData?.isp && systemData.isp.length > 25 ? (
            <div className="break-words">{systemData.isp}</div>
          ) : (
            <div>{systemData?.isp}</div>
          )}
        </span>
      </div>
    </div>
  )
}
