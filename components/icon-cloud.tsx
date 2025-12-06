
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
    activeCursor: "pointer",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.03, // Slower rotation
    minSpeed: 0.01, // Slower rotation
    dragControl: true,
    pinchZoom: false,
    freezeActive: false,
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
    size: 38, // Reduced from 42 for a cleaner look
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: any) => e.preventDefault(),
      title: icon.title, // This enables the tooltip
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

  if (!data) return <div>Loading icons...</div>;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <Cloud {...cloudProps}>
        <>{renderedIcons}</>
      </Cloud>
    </div>
  )
}
