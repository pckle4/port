
import React, { useMemo, useState, useEffect, memo } from "react"
import { Cloud, ICloud, renderSimpleIcon, SimpleIcon } from "react-icon-cloud"
import { useTheme } from "./theme-provider"
import {
  siTypescript,
  siJavascript,
  siReact,
  siNodedotjs,
  siPostgresql,
  siMongodb,
  siTailwindcss,
  siDocker,
  siGit,
  siGithub,
  siPython,
  siHtml5,
  siCss,
  siNextdotjs,
  siVercel,
  siVite,
  siFigma,
  siApachekafka,
  siNginx,
  siGraphql,
  siRedis,
  siDotnet,
  siKubernetes,
  siLinux,
  siAndroid
} from "simple-icons"

const slugToIcon: Record<string, SimpleIcon> = {
  "typescript": siTypescript,
  "javascript": siJavascript,
  "react": siReact,
  "nodedotjs": siNodedotjs,
  "postgresql": siPostgresql,
  "mongodb": siMongodb,
  "tailwindcss": siTailwindcss,
  "docker": siDocker,
  "git": siGit,
  "github": siGithub,
  "python": siPython,
  "html5": siHtml5,
  "css3": siCss,
  "nextdotjs": siNextdotjs,
  "vercel": siVercel,
  "vite": siVite,
  "figma": siFigma,
  "apachekafka": siApachekafka,
  "nginx": siNginx,
  "graphql": siGraphql,
  "redis": siRedis,
  "dotnet": siDotnet,
  "kubernetes": siKubernetes,
  "linux": siLinux,
  "android": siAndroid
}

export const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      paddingTop: 0,
      contain: "layout style",
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.03,
    minSpeed: 0.01,
    dragControl: true,
    decel: 0.98,
    pinchZoom: false,
    freezeActive: true,
    freezeDecel: true,
  },
}

export const renderCustomIcon = (icon: SimpleIcon, theme: string) => {
  const bgHex = theme === "light" ? "#f3f2f1" : "#080510"
  const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff"
  const minContrastRatio = theme === "dark" ? 2 : 1.2

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 40, 
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: any) => e.preventDefault(),
      style: { cursor: "pointer" }
    },
  })
}

export type DynamicCloudProps = {
  iconSlugs: string[]
  forcedTheme?: string
}

export function IconCloud({ iconSlugs, forcedTheme }: DynamicCloudProps) {
  const { theme: globalTheme } = useTheme()
  const theme = forcedTheme || globalTheme

  const renderedIcons = useMemo(() => {
    let effectiveTheme = theme
    if (theme === "system") {
        effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }

    return iconSlugs.map((slug) => {
      const icon = slugToIcon[slug]
      if (!icon) {
        console.warn(`Icon not found for slug: ${slug}`)
        return null
      }
      return renderCustomIcon(icon, effectiveTheme)
    }).filter(Boolean)
  }, [iconSlugs, theme])

  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ contain: "layout style" }}>
      <Cloud {...cloudProps}>
        <>{renderedIcons}</>
      </Cloud>
    </div>
  )
}

