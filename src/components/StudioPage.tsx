import React from 'react';
import { MergeTool } from './MergeTool';

interface StudioPageProps {
  onGoToMerge?: () => void;
  onPreviewPdf: (url: string, name: string) => void;
}

export const StudioPage: React.FC<StudioPageProps> = ({ onPreviewPdf }) => {
  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-in fade-in duration-200">
      {/* 1. Studio Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#f4f5f7] border border-gray-200 text-gray-800 mb-4 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Studio Workspace • All-in-One PDF Engine</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 mb-3 font-['Plus_Jakarta_Sans']">
          PDF Studio
        </h1>
        <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed max-w-2xl mx-auto">
          Add, reorder, rotate, and combine your PDF and image files with real-time vector rendering directly in your browser.
        </p>
      </div>

      {/* 2. Embedded Interactive Merger Workspace */}
      <div className="mt-4 sm:mt-5">
        <MergeTool
          onPreviewPdf={onPreviewPdf}
          hideHeaderTitle={true}
          embedded={true}
        />
      </div>
    </div>
  );
};
