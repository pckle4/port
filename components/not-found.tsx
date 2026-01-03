
"use client"

import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "./ui/button"
import { Home, AlertTriangle, RefreshCw, Globe } from "lucide-react"

export default function NotFound() {
  const location = useLocation()
  const [currentTime, setCurrentTime] = useState(new Date())
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatIST = (date: Date) => {
    return date.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })
  }

  const fullUrl = typeof window !== 'undefined' 
    ? `${window.location.hostname}${location.pathname}` 
    : `localhost${location.pathname}`

  return (
    <div className="dark min-h-screen bg-[#050505] text-white flex items-center justify-center relative overflow-hidden font-sans selection:bg-red-500/30">

      <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-900/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 animate-pulse duration-1000" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-900/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#200000_1px,transparent_1px),linear-gradient(to_bottom,#200000_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      </div>

      <div className="container max-w-6xl mx-auto px-6 relative z-10 py-12">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          <div className="relative flex flex-col items-center justify-start h-[400px] md:h-[500px]">
              
              <div className="w-full max-w-xs h-6 bg-gradient-to-b from-gray-800 to-gray-900 rounded-full shadow-2xl border-b border-gray-700 z-20 relative flex items-center justify-between px-6">
                  <div className="w-3 h-3 rounded-full bg-gray-600 shadow-inner"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-600 shadow-inner"></div>
              </div>

              <div className="animate-swing origin-top z-10 -mt-2">
                  <div className="h-32 w-64 mx-auto flex justify-between px-12 relative">
                      <div className="w-1 h-full bg-gradient-to-b from-gray-700 via-gray-600 to-gray-800 opacity-90 shadow-sm origin-top"></div>
                      <div className="w-1 h-full bg-gradient-to-b from-gray-700 via-gray-600 to-gray-800 opacity-90 shadow-sm origin-top"></div>
                  </div>

                  <div className="relative bg-[#080808] border-[3px] border-red-900/60 p-8 rounded-xl shadow-[0_0_40px_rgba(220,38,38,0.15)] flex flex-col items-center justify-center w-[300px] sm:w-[350px] transition-transform duration-300 group hover:rotate-1">

                      <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-gray-800 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]"><div className="w-full h-px bg-gray-600 rotate-45 mt-1.5"></div></div>
                      <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-gray-800 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]"><div className="w-full h-px bg-gray-600 rotate-12 mt-1.5"></div></div>
                      <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-gray-800 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]"><div className="w-full h-px bg-gray-600 -rotate-45 mt-1.5"></div></div>
                      <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-gray-800 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]"><div className="w-full h-px bg-gray-600 rotate-90 mt-1.5"></div></div>

                      <div className="flex items-center gap-2 mb-3 opacity-90">
                          <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse" />
                          <span className="text-red-500 font-mono text-[10px] tracking-[0.2em] uppercase">System Failure</span>
                      </div>
                      
                      <h1 className="text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gray-100 to-gray-600 drop-shadow-sm group-hover:scale-105 transition-transform duration-500">
                          404
                      </h1>

                      <div className="w-full h-px bg-red-900/30 my-4"></div>

                      <div className="font-mono text-xs text-red-400/80 tracking-widest uppercase">
                          Page Not Found
                      </div>

                      <div className="absolute -bottom-5 -right-5 bg-red-600 text-black font-extrabold text-[10px] px-4 py-1.5 rotate-[-10deg] shadow-lg border border-red-400 z-20">
                          CRITICAL ERROR
                      </div>
                  </div>
              </div>
          </div>

          <div className="text-center md:text-left space-y-6 max-w-lg mx-auto md:mx-0">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-ping"></div>
                    CONNECTION_LOST
                </div>

                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
                    Houston, we have a <span className="text-red-500">problem</span>.
                </h2>
                
                <p className="text-gray-400 text-lg leading-relaxed">
                    The page you are looking for has been abducted by aliens 👽, eaten by a black hole, or simply never existed. 
                </p>
              </div>

              <div 
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-900/80 border border-gray-800 select-none pointer-events-none"
              >
                <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                  <Globe className="w-4 h-4 text-red-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-sm text-gray-300 truncate">
                    {fullUrl}
                  </div>
                  <div className="text-[10px] text-red-400 uppercase tracking-wider font-semibold">
                    This page does not exist
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center md:justify-start">
                  <Button 
                    asChild 
                    size="lg" 
                    className="h-12 px-8 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)] transition-all hover:scale-105 border-0 font-semibold"
                  >
                    <Link to="/">
                        <Home className="w-4 h-4 mr-2" />
                        Emergency Reboot
                    </Link>
                  </Button>
                  
                   <Button 
                    asChild 
                    variant="outline"
                    size="lg" 
                    className="h-12 px-8 rounded-full border-gray-700 bg-transparent text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <Link to="#" onClick={(e) => { e.preventDefault(); window.location.reload(); }}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Retry Signal
                    </Link>
                  </Button>
              </div>

              <div className="pt-4 border-t border-gray-900/50">
                  <p className="font-mono text-xs text-gray-600">
                      ERROR_CODE: 0x404_NOT_FOUND <br/>
                      TIMESTAMP: {formatIST(currentTime)} IST
                  </p>
              </div>
          </div>

        </div>
      </div>
    </div>
  )
}
