import React, { Suspense, useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { EnhancedHeader } from './components/enhanced-header';
import { OptimizedMobileHero } from './components/optimized-mobile-hero';
import { smoothScrollToElement } from './lib/utils';
import MagicLoader from './components/ui/magic-loader';

const AboutSection = React.lazy(() => import('./components/about-section'));
const EnhancedSkills = React.lazy(() => import('./components/enhanced-skills'));
const MobileOptimizedProjects = React.lazy(() => import('./components/mobile-optimized-projects'));
const CompactContactSection = React.lazy(() => import('./components/compact-contact-section'));
const EnhancedFooter = React.lazy(() => import('./components/enhanced-footer'));
const ResumePage = React.lazy(() => import('./components/resume-page'));
const NotFound = React.lazy(() => import('./components/not-found'));

const ScrollToHash = () => {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (hash) {
      const targetId = hash.slice(1);
      let cancelled = false;
      let attempts = 0;

      const tryScroll = () => {
        if (cancelled) return;
        const el = document.getElementById(targetId);
        if (el) {
          smoothScrollToElement(el);
          return;
        }
        attempts += 1;
        if (attempts < 12) {
          window.setTimeout(tryScroll, 120);
        }
      };

      requestAnimationFrame(tryScroll);
      return () => {
        cancelled = true;
      };
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash, pathname]);
  return null;
};

type ViewportMountProps = {
  children: React.ReactNode;
  rootMargin?: string;
  forceMount?: boolean;
};

const ViewportMount = ({ children, rootMargin = '900px', forceMount = false }: ViewportMountProps) => {
  const [mounted, setMounted] = useState(forceMount);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (forceMount) {
      setMounted(true);
      return;
    }
  }, [forceMount]);

  useEffect(() => {
    if (mounted || forceMount) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [mounted, forceMount, rootMargin]);

  return (
    <div ref={ref} style={{ minHeight: 1 }} className="content-visibility-auto">
      {mounted ? children : null}
    </div>
  );
};

const HomePage = () => {
  const { hash } = useLocation();
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  // Cursor glow effect
  React.useEffect(() => {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);
    
    const moveGlow = (e: MouseEvent) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    };
    window.addEventListener('mousemove', moveGlow, { passive: true });
    return () => {
      window.removeEventListener('mousemove', moveGlow);
      glow.remove();
    };
  }, []);

  const forceAbout = hash === '#about';
  const forceSkills = hash === '#skills';
  const forceProjects = hash === '#projects';
  const forceContact = hash === '#contact';

  return (
    <div className="min-h-screen bg-transparent selection:bg-[#cc8b86] selection:text-white">
      {/* Scroll Progress Indicator */}
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} />
      
      <EnhancedHeader />
      <main>
        <div id="home" style={{ scrollMarginTop: '96px' }}>
          <OptimizedMobileHero />
        </div>

        <ViewportMount forceMount={forceAbout} rootMargin="1200px">
          <Suspense fallback={null}>
            <AboutSection />
          </Suspense>
        </ViewportMount>

        <ViewportMount forceMount={forceSkills}>
          <Suspense fallback={null}>
            <EnhancedSkills />
          </Suspense>
        </ViewportMount>

        <ViewportMount forceMount={forceProjects}>
          <Suspense fallback={null}>
            <MobileOptimizedProjects />
          </Suspense>
        </ViewportMount>

        <ViewportMount forceMount={forceContact}>
          <Suspense fallback={null}>
            <CompactContactSection />
          </Suspense>
        </ViewportMount>
      </main>

      <ViewportMount rootMargin="800px">
        <Suspense fallback={null}>
          <EnhancedFooter />
        </Suspense>
      </ViewportMount>
    </div>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure preloader visualizes for at least 2.5 seconds for smoothness
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#faf8f6] dark:bg-[#0a0909]">
        <MagicLoader 
          size={250} 
          speed={1.8} 
          particleCount={3} 
          hueRange={[0, 0]} 
          saturation={0} 
        />
      </div>
    );
  }

  return (
    <Router>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resume" element={
            <Suspense fallback={null}>
              <ResumePage />
            </Suspense>
          } />
          <Route path="*" element={
            <Suspense fallback={null}>
              <NotFound />
            </Suspense>
          } />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}
