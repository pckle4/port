
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

type IconCloudCoreProps = {
  iconSlugs: string[]
  theme: string
}

// Core component - PURE, no hooks that subscribe to context
const IconCloudCore = memo(function IconCloudCore({ iconSlugs, theme }: IconCloudCoreProps) {
  // Resolve system theme here if needed, but only once per mount if we want cache,
  // or just memoize the result.
  // Since "system" can change, we actually WANT to listen to media queries if theme is "system",
  // but NOT if theme is "dark" or "light".
  
  const [resolvedTheme, setResolvedTheme] = useState(() => {
    if (theme === "system") {
      return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches 
        ? "dark" 
        : "light"
    }
    return theme
  })

  // Update resolved theme if prop changes, but purely.
  // Actually, if theme prop changes from "dark" to "light", we need to update.
  useEffect(() => {
    if (theme === "system") {
         // Could add listener here if we really wanted live system theme updates
         // But for now, just initial is fine, or re-check.
         const media = window.matchMedia("(prefers-color-scheme: dark)")
         const update = () => setResolvedTheme(media.matches ? "dark" : "light")
         update() // Set initial
         media.addEventListener("change", update)
         return () => media.removeEventListener("change", update)
    } else {
        setResolvedTheme(theme)
    }
  }, [theme])

  const renderedIcons = useMemo(() => {
    return iconSlugs.map((slug) => {
      const icon = slugToIcon[slug]
      if (!icon) {
        console.warn(`Icon not found for slug: ${slug}`)
        return null
      }
      return renderCustomIcon(icon, resolvedTheme)
    }).filter(Boolean)
  }, [iconSlugs, resolvedTheme])

  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ contain: "layout style" }}>
      <Cloud {...cloudProps}>
        <>{renderedIcons}</>
      </Cloud>
    </div>
  )
})

// Wrapper that calls useTheme()
const IconCloudWithContext = memo(({ iconSlugs }: { iconSlugs: string[] }) => {
    const { theme } = useTheme()
    return <IconCloudCore iconSlugs={iconSlugs} theme={theme || "light"} />
})

// Main Export which decides which path to take
export const IconCloud = memo(({ iconSlugs, forcedTheme }: DynamicCloudProps) => {
  if (forcedTheme) {
      return <IconCloudCore iconSlugs={iconSlugs} theme={forcedTheme} />
  }
  return <IconCloudWithContext iconSlugs={iconSlugs} />
})

