import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { MergeTool } from './components/MergeTool';
import { HowItWorks } from './components/HowItWorks';
import { Features } from './components/Features';
import { Products } from './components/Products';
import { TechnicalSpecs } from './components/TechnicalSpecs';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { PreviewModal } from './components/PreviewModal';
import { AboutPage } from './components/AboutPage';
import { HowItWorksPage } from './components/HowItWorksPage';

export default function App() {
  const [activePage, setActivePage] = useState<'home' | 'how-it-works' | 'about'>(() => {
    if (window.location.hash === '#about') return 'about';
    if (window.location.hash === '#how-it-works') return 'how-it-works';
    return 'home';
  });

  const [previewState, setPreviewState] = useState<{
    isOpen: boolean;
    url: string | null;
    name: string;
  }>({
    isOpen: false,
    url: null,
    name: '',
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#about') {
        setActivePage('about');
      } else if (window.location.hash === '#how-it-works') {
        setActivePage('how-it-works');
      } else if (window.location.hash === '' || window.location.hash === '#merge-tool') {
        setActivePage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: 'home' | 'how-it-works' | 'about') => {
    setActivePage(page);
    if (page === 'about') {
      window.location.hash = '#about';
    } else if (page === 'how-it-works') {
      window.location.hash = '#how-it-works';
    } else {
      if (window.location.hash === '#about' || window.location.hash === '#how-it-works') {
        window.history.pushState(null, '', window.location.pathname);
      }
    }
  };

  const handleOpenPreview = (url: string, name: string) => {
    setPreviewState({
      isOpen: true,
      url,
      name,
    });
  };

  const handleClosePreview = () => {
    setPreviewState({
      isOpen: false,
      url: null,
      name: '',
    });
  };

  const scrollToMerge = () => {
    if (activePage !== 'home') {
      handleNavigate('home');
      setTimeout(() => {
        const el = document.getElementById('merge-tool');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('merge-tool');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#111827] flex flex-col selection:bg-gray-900 selection:text-white">
      {/* Navigation */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenUpload={scrollToMerge}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activePage === 'about' && (
          <AboutPage onGoToMerge={() => handleNavigate('home')} />
        )}

        {activePage === 'how-it-works' && (
          <HowItWorksPage onGoToMerge={() => handleNavigate('home')} />
        )}

        {activePage === 'home' && (
          <>
            {/* 1. Hero Merge Tool (H1) */}
            <MergeTool onPreviewPdf={handleOpenPreview} />

            {/* 2. How to merge PDF files online (H2 -> H3) */}
            <HowItWorks />

            {/* 3. Merging PDFs made simple (H2 -> H3) */}
            <Features />

            {/* 4. Discover PDF's products (H2 -> H3) */}
            <Products />

            {/* 5. Enterprise Standards & Specifications (H4 -> H5) */}
            <TechnicalSpecs />

            {/* 6. Frequently Asked Questions (H2 -> H3) */}
            <FAQ />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigateAbout={() => handleNavigate('about')} />

      {/* PDF Document Preview Modal */}
      {previewState.isOpen && (
        <PreviewModal
          url={previewState.url}
          name={previewState.name}
          onClose={handleClosePreview}
        />
      )}
    </div>
  );
}
