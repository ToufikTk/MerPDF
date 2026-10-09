import React from 'react';
import { UploadCloud, SlidersHorizontal, Download, ArrowRight } from 'lucide-react';

interface HowItWorksPageProps {
  onGoToMerge: () => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onGoToMerge }) => {
  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-16 animate-in fade-in duration-200">
      {/* 1. Header & Lead */}
      <div className="text-center sm:text-left">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-950 mb-4 font-['Plus_Jakarta_Sans']">
          How MergePDF Works
        </h1>
        <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed max-w-3xl">
          From upload to unified PDF in three simple steps — typically under 5 seconds.
        </p>
      </div>

      {/* 2. Step Cards (3 Horizontal Cards matching Screenshot) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Step 1 */}
        <div className="bg-[#fcfbf9] border border-[#f1ece5] rounded-3xl p-7 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-11 h-11 rounded-2xl bg-[#ede9fe] text-[#7c3aed] flex items-center justify-center">
                <UploadCloud className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-3xl font-extrabold text-gray-200 font-mono tracking-tighter">
                01
              </span>
            </div>
            <h2 className="text-lg font-bold text-gray-950 mb-2.5 font-['Plus_Jakarta_Sans']">
              Upload Your Files
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed font-normal">
              Drag and drop or click to select any PDF, JPG, PNG, or TIFF files up to 20 MB. Your documents are never uploaded to servers — they are processed in local browser memory and discarded immediately.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-[#fcfbf9] border border-[#f1ece5] rounded-3xl p-7 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-11 h-11 rounded-2xl bg-[#fae8ff] text-[#c026d3] flex items-center justify-center">
                <SlidersHorizontal className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-3xl font-extrabold text-gray-200 font-mono tracking-tighter">
                02
              </span>
            </div>
            <h2 className="text-lg font-bold text-gray-950 mb-2.5 font-['Plus_Jakarta_Sans']">
              Arrange &amp; Rotate
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed font-normal">
              Reorder pages and files with intuitive drag-and-drop controls. Rotate page orientations in 90° increments, delete unneeded sheets, or reverse document sequences with a single click.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-[#fcfbf9] border border-[#f1ece5] rounded-3xl p-7 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-11 h-11 rounded-2xl bg-[#ffedd5] text-[#ea580c] flex items-center justify-center">
                <Download className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-3xl font-extrabold text-gray-200 font-mono tracking-tighter">
                03
              </span>
            </div>
            <h2 className="text-lg font-bold text-gray-950 mb-2.5 font-['Plus_Jakarta_Sans']">
              Merge &amp; Download
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed font-normal">
              Click &quot;Merge all&quot; and within seconds you&apos;ll have a unified, standard ISO 32000 PDF. Download directly to your device or preview in crisp vector fidelity directly in your browser.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Supported Formats & Limits Card */}
      <div className="bg-[#fcfbf9] border border-[#f1ece5] rounded-3xl p-8 sm:p-10 shadow-2xs space-y-6">
        <h2 className="text-xl font-bold text-gray-950 font-['Plus_Jakarta_Sans']">
          Supported Formats &amp; Limits
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-1">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
              FORMATS
            </span>
            <span className="text-sm sm:text-base font-semibold text-gray-900">
              PDF, JPG, PNG, WebP
            </span>
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
              MAX FILE SIZE
            </span>
            <span className="text-sm sm:text-base font-semibold text-gray-900">
              20 MB total
            </span>
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
              PROCESSING LOCATION
            </span>
            <span className="text-sm sm:text-base font-semibold text-gray-900">
              100% In-Browser (Zero Cloud Upload)
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-gray-500 pt-3 border-t border-gray-200/60 leading-relaxed">
          Vector lines, high-resolution embedded fonts, and print color spaces are preserved losslessly during merging, ensuring sharp readability across screens and commercial printers.
        </p>
      </div>

      {/* 4. The Technology Behind It */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-950 font-['Plus_Jakarta_Sans']">
          The Technology Behind It
        </h2>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          MergePDF is powered by the <strong className="text-gray-900 font-semibold">pdf-lib</strong> WebAssembly client engine, combined with HTML5 FileSystem and ArrayBuffer streaming. The engine parses document cross-reference tables (XREF), merges object hierarchies, reconciles font dictionaries, and generates a standardized PDF file without network round-trips.
        </p>
      </div>

      {/* 5. Pipeline & Feature Comparison Table matching Screenshot */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-950 font-['Plus_Jakarta_Sans']">
          Processing Pipeline Comparison
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-[#f1ece5] shadow-2xs">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#fcfbf9] border-b border-[#f1ece5] text-gray-500 text-[11px] font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">Operation</th>
                <th className="py-3.5 px-4 sm:px-6">Engine</th>
                <th className="py-3.5 px-4 sm:px-6">Best For</th>
                <th className="py-3.5 px-4 sm:px-6">Output Standard</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white text-gray-600">
              <tr className="hover:bg-gray-50/60 transition-colors">
                <td className="py-3.5 px-4 sm:px-6 font-semibold text-gray-900">Standard PDF Merge</td>
                <td className="py-3.5 px-4 sm:px-6">pdf-lib Vector Parser</td>
                <td className="py-3.5 px-4 sm:px-6">Reports, contracts, multi-page PDFs</td>
                <td className="py-3.5 px-4 sm:px-6 font-mono text-xs">ISO 32000-2</td>
              </tr>
              <tr className="hover:bg-gray-50/60 transition-colors">
                <td className="py-3.5 px-4 sm:px-6 font-semibold text-gray-900">Image Conversion</td>
                <td className="py-3.5 px-4 sm:px-6">HTML5 Canvas Rasterizer</td>
                <td className="py-3.5 px-4 sm:px-6">Receipts, scanned IDs, photo attachments</td>
                <td className="py-3.5 px-4 sm:px-6 font-mono text-xs">A4 Standardized</td>
              </tr>
              <tr className="hover:bg-gray-50/60 transition-colors">
                <td className="py-3.5 px-4 sm:px-6 font-semibold text-gray-900">Page Rotation</td>
                <td className="py-3.5 px-4 sm:px-6">Matrix Degree Transform</td>
                <td className="py-3.5 px-4 sm:px-6">Correcting landscape scans &amp; upside-down pages</td>
                <td className="py-3.5 px-4 sm:px-6 font-mono text-xs">Lossless 90°/180°</td>
              </tr>
              <tr className="hover:bg-gray-50/60 transition-colors">
                <td className="py-3.5 px-4 sm:px-6 font-semibold text-gray-900">Memory Pipeline</td>
                <td className="py-3.5 px-4 sm:px-6">Blob Stream Buffer</td>
                <td className="py-3.5 px-4 sm:px-6">Confidential agreements, tax filings</td>
                <td className="py-3.5 px-4 sm:px-6 font-mono text-xs">Zero Server Footprint</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Ready to try it? CTA Card matching Screenshot */}
      <div className="bg-[#fcfbf9] border border-[#f1ece5] rounded-3xl p-10 sm:p-14 text-center space-y-6 shadow-2xs">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 mb-2 font-['Plus_Jakarta_Sans']">
            Ready to try it?
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            No sign-up or installation required. Free forever.
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={onGoToMerge}
            className="inline-flex items-center px-7 py-3 rounded-full bg-[#111827] hover:bg-black text-white text-sm font-semibold shadow-sm hover:shadow transition-all"
          >
            Open the Merger
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};
