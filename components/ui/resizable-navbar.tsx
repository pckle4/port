
import React, { useState, useEffect, useRef, createContext, useContext } from "react"
import { cn } from "../../lib/utils"
import { Menu, X } from "lucide-react"

// Create a context to share scroll state
const NavbarContext = createContext({ isScrolled: false })

export const Navbar = ({ children }: { children?: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const updateNavbar = () => {
      const currentScrollY = window.scrollY
      
      // Determine if scrolled from top for border/shadow effect AND shrinking effect
      // Trigger shrinking slightly earlier for better UX
      const scrolled = currentScrollY > 50
      setIsScrolled(prev => prev !== scrolled ? scrolled : prev)

      // Determine direction for hide/show
      // Added threshold to prevent flickering at top
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      
      lastScrollY.current = currentScrollY
      ticking.current = false
    }

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateNavbar)
        ticking.current = true
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <NavbarContext.Provider value={{ isScrolled }}>
      <header
        className={cn(
          "fixed top-4 left-0 right-0 z-50 mx-auto transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)",
          "will-change-transform translate-z-0", // Hardware acceleration hint
          // Adjust width based on scroll state for a sleek look
          isScrolled ? "max-w-fit" : "w-[95%] max-w-5xl",
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-[200%] opacity-0"
        )}
      >
        <div 
          className={cn(
            "rounded-full border transition-all duration-500 px-4 sm:px-6",
            isScrolled 
              ? "bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-lg border-black/10 dark:border-white/10 py-1" 
              : "bg-transparent border-transparent shadow-none py-2"
          )}
        >
          <div className="flex h-12 items-center justify-between gap-4">{children}</div>
        </div>
      </header>
    </NavbarContext.Provider>
  )
}

export const NavBody = ({ children }: { children?: React.ReactNode }) => {
  return <div className="hidden md:flex flex-1 items-center justify-between gap-4">{children}</div>
}

export const NavbarLogo = ({ children }: { children?: React.ReactNode }) => {
  const { isScrolled } = useContext(NavbarContext)
  return (
    <div className={cn(
        "transition-all duration-500 will-change-transform",
        isScrolled ? "mr-2 scale-90" : "mr-4 scale-100"
    )}>
        {children}
    </div>
  )
}

export const NavItems = ({
  items,
  activeItem,
  onItemClick,
}: {
  items: { name: string; link: string; id: string; icon?: React.ReactNode }[]
  activeItem: string
  onItemClick: (link: string, id: string) => void
}) => {
  const { isScrolled } = useContext(NavbarContext)

  return (
    <nav className="flex items-center gap-1">
      {items.map((item) => {
        // Logic: Always show "Home" and "Resume". Hide others when scrolled.
        const isAlwaysVisible = item.id === "home" || item.id === "resume";
        const isHidden = isScrolled && !isAlwaysVisible;

        return (
          <button
            key={item.id}
            onClick={() => onItemClick(item.link, item.id)}
            className={cn(
              "relative text-sm font-medium transition-all duration-500 ease-in-out rounded-full overflow-hidden whitespace-nowrap will-change-[width,opacity]",
              // Collapsing logic
              isHidden ? "w-0 opacity-0 px-0 m-0" : "w-auto opacity-100 px-3 py-1.5",
              activeItem === item.id ? "text-foreground font-semibold" : "text-muted-foreground hover:bg-muted/50"
            )}
            // Prevent interaction when hidden
            tabIndex={isHidden ? -1 : 0}
            aria-hidden={isHidden}
          >
            {activeItem === item.id && !isHidden && (
              <span className="absolute inset-0 bg-secondary rounded-full -z-10 animate-fade-in shadow-sm" />
            )}
            <span className="flex items-center gap-2">
                {item.icon && <span className={cn(item.id === 'resume' && isScrolled ? "text-purple-500" : "")}>{item.icon}</span>}
                {item.name}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

export const MobileNav = ({ children }: { children?: React.ReactNode }) => {
  return <div className="flex flex-1 flex-col md:hidden">{children}</div>
}

export const MobileNavHeader = ({ children }: { children?: React.ReactNode }) => {
  return <div className="flex items-center justify-between w-full">{children}</div>
}

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean
  onClick: () => void
}) => {
  return (
    <button
      onClick={onClick}
      className="p-2 mr-2 hover:bg-muted rounded-full transition-colors"
    >
      {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </button>
  )
}

export const MobileNavMenu = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
}) => {
  if (!isOpen) return null

  return (
    <div className="absolute top-full left-0 right-0 mt-2 p-2 rounded-2xl border bg-popover/95 backdrop-blur-xl text-popover-foreground shadow-xl animate-in slide-in-from-top-2 duration-200">
      <nav className="grid grid-flow-row auto-rows-max gap-1">{children}</nav>
    </div>
  )
}
