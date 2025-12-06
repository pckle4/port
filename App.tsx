

import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { EnhancedHeader } from './components/enhanced-header';
import { OptimizedMobileHero } from './components/optimized-mobile-hero';
import { PageTransition } from './components/page-transition';
import { Button } from './components/ui/button';
import { TechPreloader } from './components/tech-preloader';

// Lazy load non-critical sections to improve initial load time (Speed Boost)
// Using standard React.lazy with default exports for robustness
const AboutSection = React.lazy(() => import('./components/about-section'));
const EnhancedSkills = React.lazy(() => import('./components/enhanced-skills'));
const MobileOptimizedProjects = React.lazy(() => import('./components/mobile-optimized-projects'));
const CompactContactSection = React.lazy(() => import('./components/compact-contact-section'));
const EnhancedFooter = React.lazy(() => import('./components/enhanced-footer'));
const ResumePage = React.lazy(() => import('./components/resume-page'));
const NotFound = React.lazy(() => import('./components/not-found'));

// Skeleton Loader for Sections
const SectionSkeleton = () => (
  <div className="py-20 w-full animate-pulse px-6">
    <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-8"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
      <div className="h-64 bg-muted/50 rounded-xl"></div>
      <div className="h-64 bg-muted/50 rounded-xl"></div>
    </div>
  </div>
);

// Component to handle scrolling to hash
const ScrollToHash = () => {
  const { hash, pathname } = useLocation();

  React.useEffect(() => {
    // Only scroll to hash if it exists
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Scroll to top on route change (e.g. / to /resume)
      window.scrollTo(0, 0);
    }
  }, [hash, pathname]);

  return null;
};

// Component for handling external redirects via client-side router
const ExternalRedirect = ({ to }: { to: string }) => {
  useEffect(() => {
    window.location.href = to;
  }, [to]);
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-muted-foreground">Redirecting to {to}...</p>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div className="h-20" />}>
        <EnhancedHeader />
      </Suspense>
      <main>
        <div id="home">
          <OptimizedMobileHero />
        </div>
        
        {/* Wrap lazy-loaded sections in Suspense */}
        <Suspense fallback={<SectionSkeleton />}>
          <AboutSection />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <EnhancedSkills />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <MobileOptimizedProjects />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <CompactContactSection />
        </Suspense>
      </main>
      
      <Suspense fallback={<div className="h-20 bg-black" />}>
        <EnhancedFooter />
      </Suspense>
    </div>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user has visited in this session
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (hasVisited) {
      setLoading(false);
    } else {
      // If first time, keep loading true (TechPreloader handles timing)
    }
  }, []);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem("hasVisited", "true");
    setLoading(false);
  };

  return (
    <>
      {loading && <TechPreloader onComplete={handlePreloaderComplete} />}
      
      {/* 
        The app is rendered immediately behind the preloader to ensure 
        assets are loaded and layout is ready when preloader fades out.
      */}
      <div className="block">
        <Router>
          <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <PageTransition>
              <ScrollToHash />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/resume" element={
                  <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
                    <ResumePage />
                  </Suspense>
                } />
                
                {/* Redirect Routes */}
                <Route path="/l" element={<ExternalRedirect to="https://l.nowhile.com" />} />
                <Route path="/qr" element={<ExternalRedirect to="https://qr.nowhile.com" />} />
                <Route path="/file" element={<ExternalRedirect to="https://file.nowhile.com" />} />
                
                <Route path="*" element={
                  <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
                    <NotFound />
                  </Suspense>
                } />
              </Routes>
            </PageTransition>
          </ThemeProvider>
        </Router>
      </div>
    </>
  );
}
