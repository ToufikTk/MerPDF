import React from 'react';
import { MergeTool } from './MergeTool';
import { Layers, Shield, ArrowRight, Image as ImageIcon } from 'lucide-react';

interface StudioPageProps {
  onGoToMerge?: () => void;
  onPreviewPdf: (url: string, name: string) => void;
}

export const StudioPage: React.FC<StudioPageProps> = ({ onGoToMerge, onPreviewPdf }) => {
  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 animate-in fade-in duration-200">
      {/* 1. Studio Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#f4f5f7] border border-gray-200 text-gray-800 mb-4 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Studio Workspace • All-in-One PDF Engine</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 mb-4 font-['Plus_Jakarta_Sans']">
          PDF Studio
        </h1>
        <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed max-w-2xl mx-auto">
          Add, reorder, rotate, and combine your PDF and image files with real-time vector rendering directly in your browser.
        </p>
      </div>

      {/* 2. Embedded Interactive Merger Workspace */}
      <div className="!mt-6 sm:!mt-8">
        <MergeTool
          onPreviewPdf={onPreviewPdf}
          hideHeaderTitle={true}
          embedded={true}
        />
      </div>

      {/* 3. Studio Pro Capabilities Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-950 font-['Plus_Jakarta_Sans']">
            Studio Capabilities
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Built for everyday document workflows and professional binder preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-[#fcfbf9] border border-[#f1ece5] rounded-3xl p-7 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-[#ede9fe] text-[#7c3aed] flex items-center justify-center mb-6">
                <Layers className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h3 className="text-lg font-bold text-gray-950 mb-2 font-['Plus_Jakarta_Sans']">
                Vector Precision Stacking
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-normal">
                Embedded typography, vectors, form fields, and resolution geometries are combined losslessly without raster downsampling or compression artifacts.
              </p>
            </div>
            <div className="pt-6 border-t border-gray-200/50 mt-6 flex items-center justify-between text-xs text-gray-500">
              <span className="font-semibold text-gray-800">Engine</span>
              <span>pdf-lib WebAssembly</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#fcfbf9] border border-[#f1ece5] rounded-3xl p-7 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-[#fae8ff] text-[#c026d3] flex items-center justify-center mb-6">
                <ImageIcon className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h3 className="text-lg font-bold text-gray-950 mb-2 font-['Plus_Jakarta_Sans']">
                Multi-Asset Stitching
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-normal">
                Drop PNG, JPG, and WebP receipts or IDs alongside standard PDFs. The studio standardizes page dimensions and seamlessly integrates them into your master document.
              </p>
            </div>
            <div className="pt-6 border-t border-gray-200/50 mt-6 flex items-center justify-between text-xs text-gray-500">
              <span className="font-semibold text-gray-800">Support</span>
              <span>PDF • JPG • PNG • WebP</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#fcfbf9] border border-[#f1ece5] rounded-3xl p-7 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-[#ffedd5] text-[#ea580c] flex items-center justify-center mb-6">
                <Shield className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h3 className="text-lg font-bold text-gray-950 mb-2 font-['Plus_Jakarta_Sans']">
                Zero Cloud Transmission
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-normal">
                Files are manipulated in local browser RAM using client-side buffers. No sensitive invoices, tax documents, or medical records ever transit third-party servers.
              </p>
            </div>
            <div className="pt-6 border-t border-gray-200/50 mt-6 flex items-center justify-between text-xs text-gray-500">
              <span className="font-semibold text-gray-800">Security</span>
              <span>100% In-Browser Memory</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Ready to Combine More Files CTA */}
      <div className="bg-[#fcfbf9] border border-[#f1ece5] rounded-3xl p-8 sm:p-12 text-center space-y-5 shadow-2xs">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-950 font-['Plus_Jakarta_Sans']">
          Ready to merge another document?
        </h3>
        <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
          You can combine as many PDF and image files as you need. No account, sign-in, or payment required.
        </p>
        {onGoToMerge && (
          <div className="pt-2">
            <button
              type="button"
              onClick={onGoToMerge}
              className="inline-flex items-center px-6 py-3 rounded-full bg-[#111827] hover:bg-black text-white text-sm font-semibold shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <span>Return to Overview</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
