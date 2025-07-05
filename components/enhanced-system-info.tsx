"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cpu, HardDrive, Wifi, Shield, Clock, Activity, AlertTriangle, Lock, Database, Server } from "lucide-react"

export function EnhancedSystemInfo() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [systemLoad, setSystemLoad] = useState(45)
  const [networkStatus, setNetworkStatus] = useState("Connected")

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      setSystemLoad(Math.floor(Math.random() * 30) + 40)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  return (
    <Card className="bg-black/90 text-green-400 font-mono text-xs border-green-500/30 shadow-lg shadow-green-500/20">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-green-500/30 pb-2">
          <div className="flex items-center space-x-2">
            <Server className="h-4 w-4 text-green-400" />
            <span className="text-green-300 font-semibold">SYSTEM STATUS</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400">ONLINE</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Cpu className="h-3 w-3 text-blue-400" />
              <span className="text-gray-300">CPU:</span>
              <span className="text-blue-400">{systemLoad}%</span>
            </div>
            <div className="flex items-center space-x-2">
              <HardDrive className="h-3 w-3 text-purple-400" />
              <span className="text-gray-300">RAM:</span>
              <span className="text-purple-400">8.2GB</span>
            </div>
            <div className="flex items-center space-x-2">
              <Wifi className="h-3 w-3 text-cyan-400" />
              <span className="text-gray-300">NET:</span>
              <span className="text-cyan-400">{networkStatus}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Clock className="h-3 w-3 text-yellow-400" />
              <span className="text-gray-300">TIME:</span>
              <span className="text-yellow-400">{formatTime(currentTime)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="h-3 w-3 text-red-400" />
              <span className="text-gray-300">LOAD:</span>
              <span className="text-red-400">Normal</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-3 w-3 text-green-400" />
              <span className="text-gray-300">SEC:</span>
              <span className="text-green-400">Active</span>
            </div>
          </div>
        </div>

        <div className="border-t border-green-500/30 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-orange-400 animate-bounce" />
              <Lock className="h-3 w-3 text-blue-400" />
              <span className="text-orange-400 font-semibold">ENCRYPTED DATA</span>
            </div>
            <Badge variant="outline" className="border-red-500/50 text-red-400 bg-red-500/10">
              <Database className="h-3 w-3 mr-1" />
              CLASSIFIED
            </Badge>
          </div>
        </div>

        <div className="text-center pt-2 border-t border-green-500/30">
          <div className="flex justify-center space-x-4 text-xs">
            <span className="text-gray-400">UPTIME: 24:07:15</span>
            <span className="text-gray-400">TEMP: 42°C</span>
            <span className="text-gray-400">FAN: 1200RPM</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
