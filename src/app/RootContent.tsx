'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports with error handling
const TopBar = dynamic(() => import('../components/TopBar'), {
  loading: () => <div className="h-16 bg-white border-b" />,
  ssr: false
});

const BottomNav = dynamic(() => import('../components/BottomNav'), {
  loading: () => null,
  ssr: false
});

const Footer = dynamic(() => import('../components/Footer'), {
  loading: () => null,
  ssr: false
});

const BackInStockPopup = dynamic(() => import('../components/BackInStockPopup'), {
  loading: () => null,
  ssr: false
});

const WelcomePopup = dynamic(() => import('../components/WelcomePopup'), {
  loading: () => null,
  ssr: false
});

const LoadingSpinner = dynamic(() => import('../components/LoadingSpinner'), {
  loading: () => <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />,
  ssr: false
});

const LoadingFallback = dynamic(() => import('../components/LoadingFallback'), {
  loading: () => <div className="flex h-screen items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>,
  ssr: false
});

const ErrorBoundary = dynamic(() => import('../components/ErrorBoundary'), {
  loading: () => <div />,
  ssr: false
});

const Toaster = dynamic(() => import('../components/ui/toast').then(mod => ({ default: mod.Toaster })), {
  loading: () => null,
  ssr: false
});

export default function RootContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [pathname, setPathname] = useState('');
  
  useEffect(() => {
    try {
      setMounted(true);
      if (typeof window !== 'undefined') {
        setPathname(window.location.pathname);
      }
    } catch (error) {
      console.error('RootContent mount error:', error);
      setMounted(true);
    }
  }, []);

  if (!mounted) {
    return <LoadingFallback />;
  }

  const isAdminRoute = pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <RootContentInner>{children}</RootContentInner>
    </ErrorBoundary>
  );
}

function RootContentInner({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    try {
      // Small delay to ensure everything is mounted
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 100);
      
      return () => clearTimeout(timer);
    } catch (error) {
      console.error('RootContentInner error:', error);
      setIsReady(true);
    }
  }, []);

  if (!isReady) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <ErrorBoundary>
          <TopBar />
        </ErrorBoundary>
        
        <main className="container py-4 pb-24 md:pb-8 flex-grow">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
        
        <ErrorBoundary>
          <Footer />
        </ErrorBoundary>
      </div>
      
      <ErrorBoundary>
        <BottomNav />
      </ErrorBoundary>

      <ErrorBoundary>
        <BackInStockPopup />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <WelcomePopup />
      </ErrorBoundary>
      
      <Toaster />
    </>
  );
}