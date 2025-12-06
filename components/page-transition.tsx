"use client"

import React from "react"
import { useLocation } from "react-router-dom"

export const PageTransition = ({ children }: { children?: React.ReactNode }) => {
  const location = useLocation()

  return (
    <div
      key={location.pathname}
      className="animate-fade-in transition-opacity duration-300"
    >
      {children}
    </div>
  )
}