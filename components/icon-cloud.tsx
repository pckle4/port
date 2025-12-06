
import React, { useEffect, useMemo, useState } from "react"
import { Cloud, fetchSimpleIcons, ICloud, renderSimpleIcon, SimpleIcon } from "react-icon-cloud"
import { useTheme } from "./theme-provider"

export const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      paddingTop: 0,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1], // Restored faster initial spin
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.04, // Increased speed cap for responsive dragging
    minSpeed: 0.02, // Faster idle rotation
    dragControl: true, // Ensure dragging is enabled
    decel: 0.95, // Smooth momentum
    pinchZoom: false,
    freezeActive: true,
    freezeDecel: false,
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
      style: { cursor: 'pointer' }
    },
  })
}

export type DynamicCloudProps = {
  iconSlugs: string[]
}

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>

export function IconCloud({ iconSlugs }: DynamicCloudProps) {
  const [data, setData] = useState<IconData | null>(null)
  const { theme } = useTheme()

  useEffect(() => {
    fetchSimpleIcons({ slugs: iconSlugs }).then(setData)
  }, [iconSlugs])

  const renderedIcons = useMemo(() => {
    if (!data) return null

    // Determine current effective theme (resolve system to light or dark)
    let effectiveTheme = theme
    if (theme === 'system') {
        effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light'
    }

    return Object.values(data.simpleIcons).map((icon) => renderCustomIcon(icon, effectiveTheme))
  }, [data, theme])

  if (!data) return (
    <div className="flex items-center justify-center h-full w-full">
        <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="relative w-full h-full flex items-center justify-center group perspective-1000">
      {/* Ambient Glow Background - pointer-events-none to prevent blocking drag */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none transform scale-75 group-hover:scale-110" />
      
      {/* Center Core Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

      <Cloud {...cloudProps}>
        <>{renderedIcons}</>
      </Cloud>
    </div>
  )
}
