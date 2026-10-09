import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { MergeTool } from './components/MergeTool';
import { HowItWorks } from './components/HowItWorks';
import { Features } from './components/Features';
import { Products } from './components/Products';
import { TechnicalSpecs } from './components/TechnicalSpecs';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { PreviewModal } from './components/PreviewModal';

export default function App() {
  const [previewState, setPreviewState] = useState<{
    isOpen: boolean;
    url: string | null;
    name: string;
  }>({
    isOpen: false,
    url: null,
    name: '',
  });

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
    const el = document.getElementById('merge-tool');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#111827] flex flex-col selection:bg-gray-900 selection:text-white">
      {/* Navigation */}
      <Navbar onOpenUpload={scrollToMerge} />

      {/* Main Content Area */}
      <main className="flex-1">
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
      </main>

      {/* Footer (H4) */}
      <Footer />

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
