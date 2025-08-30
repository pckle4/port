"use client"

import { useEffect } from "react"

export function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => {
          // warm the cache after registration
          const resumePath = "/Ansh_Shah_Resume.jpg"
          fetch(resumePath, { cache: "force-cache" }).catch(() => {})
        })
        .catch(() => {
          // ignore
        })
    }
  }, [])
  return null
}
