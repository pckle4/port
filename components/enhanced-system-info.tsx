
import React, { useState, useEffect } from "react"
import { Eye, EyeOff, Globe, Shield, Terminal, Activity, Wifi, Lock } from "lucide-react"

interface SystemInfo {
  ip: string
  isp: string
  region: string
  city: string
  country: string
}

export function EnhancedSystemInfo() {
  const [isRevealed, setIsRevealed] = useState(false)
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [deviceInfo, setDeviceInfo] = useState({ os: "Unknown", browser: "Unknown", type: "Desktop" })

  useEffect(() => {
    const ua = navigator.userAgent
    let os = "Unknown OS"
    if (ua.indexOf("Win") !== -1) os = "Windows"
    if (ua.indexOf("Mac") !== -1) os = "MacOS"
    if (ua.indexOf("Linux") !== -1) os = "Linux"
    if (ua.indexOf("Android") !== -1) os = "Android"
    if (ua.indexOf("like Mac") !== -1) os = "iOS"

    let browser = "Unknown Browser"
    if (ua.indexOf("Chrome") !== -1) browser = "Chrome"
    else if (ua.indexOf("Firefox") !== -1) browser = "Firefox"
    else if (ua.indexOf("Safari") !== -1) browser = "Safari"
    else if (ua.indexOf("Edge") !== -1) browser = "Edge"

    const type = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) ? "Mobile" : "Desktop"

    setDeviceInfo({ os, browser, type })
  }, [])

  const fetchSystemInfo = async () => {
    setIsLoading(true)


    try {
      const response = await fetch("https://ipwho.is/")
      const data = await response.json()
      
      let ipData: SystemInfo;

      if (data.success) {
          ipData = {
              ip: data.ip,
              isp: data.connection?.isp || data.connection?.org || "Unknown ISP",
              region: data.region_code || "UNK",
              city: data.city || "Unknown City",
              country: data.country || "Unknown Country"
          }
      } else {
          const fallback = await fetch("https://api.ipify.org?format=json");
          const fallbackData = await fallback.json();
          ipData = {
              ip: fallbackData.ip,
              isp: "Unknown ISP",
              region: "UNK",
              city: "Unknown",
              country: "Unknown"
          }
      }


      setSystemInfo(ipData)
      setIsLoading(false)

    } catch (error) {

      setIsLoading(false)
      setSystemInfo({
        ip: "Connection Error",
        isp: "Unknown",
        region: "ERR",
        city: "Unknown",
        country: "Unknown"
      })
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
    <div className="relative group w-full">
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <h5 
          className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-2 cursor-help"
          title="Fetched for educational purpose, no data is being taken or stored."
        >
            <Terminal className="h-3 w-3 text-green-500" />
            Network Identity
        </h5>
        <button
          onClick={toggleReveal}
          className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-200 border border-white/5 hover:border-white/10"
          title={isRevealed ? "Secure Identity" : "Reveal Connection"}
        >
          {isRevealed ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
        </button>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-gray-800 bg-[#0A0A0A] shadow-inner shadow-black/50">

        <div className="flex items-center px-3 py-1.5 bg-white/5 border-b border-white/5">
             <div className="flex space-x-1.5">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500/50"></div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-500/50"></div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500/50"></div>
             </div>
             <div className="ml-auto text-[9px] sm:text-[10px] text-gray-600 font-mono">
                sys_monitor.exe
             </div>
        </div>

        {isLoading && (
             <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/90 backdrop-blur-[2px]">
                 <div className="w-full max-w-[180px] space-y-3">
                    <div className="flex justify-between text-[10px] font-mono text-green-500 animate-pulse">
                        <span>TRACING_ROUTE...</span>
                    </div>
                    <div className="h-0.5 w-full bg-gray-800 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-[progress_2s_ease-in-out_infinite]"
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div className="text-[9px] font-mono text-gray-500 text-center">
                        ESTABLISHING HANDSHAKE
                    </div>
                 </div>
             </div>
        )}

        <div className={`transition-all duration-500 ${isRevealed ? 'opacity-100 filter-none' : 'opacity-20 blur-sm pointer-events-none select-none'}`}>
             <div className="p-3 sm:p-4 space-y-2 sm:space-y-3 font-mono text-[10px] sm:text-xs">

                <div className="group/item">
                    <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-gray-500 mb-0.5">
                        <span className="flex items-center"><Globe className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1.5 text-blue-500" /> PUBLIC IP</span>
                        <span className="opacity-0 group-hover/item:opacity-100 transition-opacity text-blue-500">v4</span>
                    </div>
                    <div className="text-gray-200 bg-white/5 px-2 py-1.5 rounded border border-white/5 flex justify-between items-center">
                         <span>{systemInfo?.ip || "192.168.x.x"}</span>
                         <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_5px_rgba(59,130,246,0.8)]"></div>
                    </div>
                </div>

                <div className="group/item">
                    <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-gray-500 mb-0.5">
                        <span className="flex items-center"><Wifi className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1.5 text-purple-500" /> PROVIDER</span>
                        <span className="opacity-0 group-hover/item:opacity-100 transition-opacity text-purple-500">{systemInfo?.region}</span>
                    </div>
                     <div className="text-gray-200 bg-white/5 px-2 py-1.5 rounded border border-white/5 truncate" title={systemInfo?.isp}>
                         {systemInfo?.isp || "Localhost Loopback"}
                    </div>
                </div>
                
                 <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-2">
                    <div className="flex items-center text-[9px] sm:text-[10px] text-gray-500 gap-2">
                        <div className="flex items-center">
                           <Activity className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 text-green-500" />
                           <span>{deviceInfo.os}</span>
                        </div>
                        <div className="w-px h-3 bg-gray-800"></div>
                        <span>{deviceInfo.browser}</span>
                        <div className="w-px h-3 bg-gray-800"></div>
                        <span>{deviceInfo.type}</span>
                    </div>
                    <div className="flex items-center text-[9px] sm:text-[10px] font-bold text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded border border-green-500/20">
                        SECURE
                    </div>
                </div>
             </div>
        </div>

        {!isRevealed && !isLoading && (
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-10 backdrop-blur-[1px]">
                 <div className="relative">
                    <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full"></div>
                    <Shield className="h-8 w-8 text-gray-400 relative z-10" />
                 </div>
                 <div className="mt-3 px-3 py-1 bg-gray-900/90 rounded border border-gray-700/50 shadow-lg">
                    <span className="flex items-center text-[10px] font-bold text-gray-400 tracking-widest">
                        <Lock className="h-2.5 w-2.5 mr-1.5" /> ENCRYPTED
                    </span>
                 </div>
             </div>
        )}
      </div>
    </div>
  )
}
