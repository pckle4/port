"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileDownloadButtonProps {
  fileName: string
  fileUrl?: string
  fileContent?: string
  fileType?: "text" | "pdf" | "image" | "document"
  className?: string
  variant?: "default" | "outline" | "ghost" | "secondary"
  size?: "sm" | "default" | "lg"
  children?: React.ReactNode
}

export function FileDownloadButton({
  fileName,
  fileUrl,
  fileContent,
  fileType = "document",
  className,
  variant = "default",
  size = "default",
  children,
}: FileDownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)

    try {
      let blob: Blob
      let mimeType: string

      if (fileUrl) {
        const response = await fetch(fileUrl)
        blob = await response.blob()
        mimeType = response.headers.get("content-type") || "application/octet-stream"
      } else if (fileContent) {
        switch (fileType) {
          case "text":
            mimeType = "text/plain"
            break
          case "pdf":
            mimeType = "application/pdf"
            break
          case "image":
            mimeType = "image/png"
            break
          default:
            mimeType = "application/octet-stream"
        }
        blob = new Blob([fileContent], { type: mimeType })
      } else {
        throw new Error("No file URL or content provided")
      }

      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Download failed:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  const getFileIcon = () => {
    switch (fileType) {
      case "text":
        return <FileText className="h-4 w-4" />
      case "pdf":
        return <FileText className="h-4 w-4" />
      default:
        return <Download className="h-4 w-4" />
    }
  }

  return (
    <Button
      onClick={handleDownload}
      disabled={isDownloading}
      variant={variant}
      size={size}
      className={cn("relative overflow-hidden", className)}
    >
      <span className="mr-2">{getFileIcon()}</span>
      {children || (isDownloading ? "Downloading..." : "Download")}
    </Button>
  )
}
