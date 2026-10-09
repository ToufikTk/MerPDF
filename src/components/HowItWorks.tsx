import React from 'react';
import { UploadCloud, ArrowRight, ArrowLeft, Download, MousePointer } from 'lucide-react';
import { getSiteConfig } from '../services/siteConfigService';

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="max-w-3xl mb-12">
        <h3 className="text-3xl sm:text-4xl lg:text-4xl font-bold tracking-tight text-gray-950 mb-3 font-['Plus_Jakarta_Sans']">
          {getSiteConfig().seo.h3 || 'How to Merge PDF Files Online'}
        </h3>
        <p className="text-base sm:text-lg text-gray-600 font-normal">
          Follow these simple steps to combine your PDF documents into a single file:
        </p>
      </div>

      {/* 4 Steps Grid matching Screenshot 4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Step 1: Upload */}
        <div className="bg-[#fcfbf9] border border-[#f3eee7] rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all hover:shadow-sm">
          <div>
            <div className="w-9 h-9 rounded-full bg-[#1c1917] text-white flex items-center justify-center font-bold text-sm mb-5 shadow-xs">
              1
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2 font-['Plus_Jakarta_Sans']">
              Upload
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Select the PDF files to upload from the computer.
            </p>
          </div>

          {/* Miniature UI Mockup */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-2xs aspect-[4/3] flex flex-col items-center justify-center relative overflow-hidden">
            <div className="w-full h-full border border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-2 bg-[#fafafa]">
              <div className="w-8 h-8 rounded-full bg-amber-100/70 flex items-center justify-center mb-1">
                <UploadCloud className="w-4 h-4 text-amber-700" />
              </div>
              <div className="w-16 h-1.5 bg-gray-300 rounded-full mb-1"></div>
              <div className="w-12 h-1 bg-gray-200 rounded-full mb-2"></div>
              <div className="px-2 py-0.5 bg-[#111827] text-[8px] text-white rounded-full font-medium">
                Upload file ▾
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Arrange files */}
        <div className="bg-[#fcfbf9] border border-[#f3eee7] rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all hover:shadow-sm">
          <div>
            <div className="w-9 h-9 rounded-full bg-[#1c1917] text-white flex items-center justify-center font-bold text-sm mb-5 shadow-xs">
              2
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2 font-['Plus_Jakarta_Sans']">
              Arrange files
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Drag and drop the files to arrange them in the desired order directly in the dropdown.
            </p>
          </div>

          {/* Miniature UI Mockup */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-3 shadow-2xs aspect-[4/3] flex flex-col justify-center relative overflow-hidden">
            <div className="flex items-center justify-center space-x-1.5 w-full">
              {/* Document 1 */}
              <div className="w-12 h-16 bg-white border border-gray-200 rounded-lg shadow-2xs p-1 flex flex-col space-y-1">
                <div className="w-6 h-1 bg-gray-300 rounded"></div>
                <div className="w-8 h-0.5 bg-gray-200 rounded"></div>
                <div className="w-7 h-0.5 bg-gray-200 rounded"></div>
                <div className="w-8 h-0.5 bg-gray-200 rounded"></div>
                <div className="text-[6px] text-gray-400 mt-auto truncate">Doc 1</div>
              </div>
              {/* Document 2 with dragging indicator */}
              <div className="w-12 h-16 bg-blue-50/60 border border-blue-400 rounded-lg shadow-sm p-1 flex flex-col space-y-1 scale-105 z-10">
                <div className="w-6 h-1 bg-blue-400 rounded"></div>
                <div className="w-8 h-0.5 bg-blue-200 rounded"></div>
                <div className="w-7 h-0.5 bg-blue-200 rounded"></div>
                <div className="w-8 h-0.5 bg-blue-200 rounded"></div>
                <div className="text-[6px] text-blue-700 font-semibold mt-auto truncate">Doc 2</div>
              </div>
              {/* Document 3 */}
              <div className="w-12 h-16 bg-white border border-gray-200 rounded-lg shadow-2xs p-1 flex flex-col space-y-1">
                <div className="w-6 h-1 bg-gray-300 rounded"></div>
                <div className="w-8 h-0.5 bg-gray-200 rounded"></div>
                <div className="w-7 h-0.5 bg-gray-200 rounded"></div>
                <div className="w-8 h-0.5 bg-gray-200 rounded"></div>
                <div className="text-[6px] text-gray-400 mt-auto truncate">Doc 3</div>
              </div>
            </div>
            {/* Cursor */}
            <MousePointer className="w-4 h-4 text-gray-900 absolute bottom-3 right-6 fill-black drop-shadow" />
          </div>
        </div>

        {/* Step 3: Merge PDFs */}
        <div className="bg-[#fcfbf9] border border-[#f3eee7] rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all hover:shadow-sm">
          <div>
            <div className="w-9 h-9 rounded-full bg-[#1c1917] text-white flex items-center justify-center font-bold text-sm mb-5 shadow-xs">
              3
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2 font-['Plus_Jakarta_Sans']">
              Merge PDFs
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Select Merge All to combine the files into a single PDF.
            </p>
          </div>

          {/* Miniature UI Mockup */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-2xs aspect-[4/3] flex items-center justify-center relative overflow-hidden">
            <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-xl border border-gray-100">
              <div className="flex items-center text-[9px] font-semibold text-gray-700 bg-white border border-gray-200 px-2 py-1 rounded-lg">
                <ArrowLeft className="w-2.5 h-2.5 mr-1" />
                Back
              </div>
              <div className="flex items-center text-[9px] font-semibold text-white bg-[#111827] px-2.5 py-1 rounded-lg shadow-2xs">
                Merge all
                <ArrowRight className="w-2.5 h-2.5 ml-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Step 4: Edit and download */}
        <div className="bg-[#fcfbf9] border border-[#f3eee7] rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all hover:shadow-sm">
          <div>
            <div className="w-9 h-9 rounded-full bg-[#1c1917] text-white flex items-center justify-center font-bold text-sm mb-5 shadow-xs">
              4
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2 font-['Plus_Jakarta_Sans']">
              Edit and download
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              After merging, the app will open the web browser. Sign in to PDF to continue editing the merged PDF or download it.
            </p>
          </div>

          {/* Miniature UI Mockup */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-2xs aspect-[4/3] flex items-center justify-center relative overflow-hidden">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-14 bg-white border border-gray-200 rounded shadow-2xs p-1 flex flex-col space-y-0.5">
                <div className="w-5 h-1 bg-gray-300 rounded"></div>
                <div className="w-7 h-0.5 bg-gray-200 rounded"></div>
                <div className="w-6 h-0.5 bg-gray-200 rounded"></div>
              </div>
              <div className="w-10 h-14 bg-white border border-gray-200 rounded shadow-2xs p-1 flex flex-col space-y-0.5">
                <div className="w-5 h-1 bg-gray-300 rounded"></div>
                <div className="w-7 h-0.5 bg-gray-200 rounded"></div>
                <div className="w-6 h-0.5 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="absolute bottom-3 right-4 flex items-center bg-[#1e293b] text-white text-[8px] font-semibold px-2 py-1 rounded-md shadow-sm">
              <Download className="w-2.5 h-2.5 mr-1" />
              Download
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
