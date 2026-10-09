import React from 'react';
import { ShieldCheck, Cpu, Database, CheckCheck, Smartphone, Lock } from 'lucide-react';

export const TechnicalSpecs: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-[#fcfbf9] border border-[#f3eee7] rounded-3xl p-8 sm:p-12">
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Enterprise Grade Engine
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 mb-3 font-['Plus_Jakarta_Sans']">
            Engineered for precision, speed, and privacy
          </h3>
          <p className="text-sm sm:text-base text-gray-600">
            Our browser-based client engine complies with global document interchange standards while preserving 100% data confidentiality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Spec Group 1 */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-gray-900 flex items-center">
              <ShieldCheck className="w-5 h-5 text-emerald-600 mr-2 shrink-0" />
              Document Specifications & Standards
            </h4>

            <div className="space-y-4 pl-7 border-l-2 border-gray-200">
              <div>
                <h5 className="text-sm font-semibold text-gray-900 mb-1">
                  ISO 32000-2 & PDF/A Archival Preservation
                </h5>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Every combined file maintains structural tags, embedded TrueType/OpenType font glyphs, and metadata compliance necessary for long-term document archiving.
                </p>
              </div>

              <div>
                <h5 className="text-sm font-semibold text-gray-900 mb-1">
                  Zero-Knowledge In-Browser Security
                </h5>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Your files are assembled in client memory via WebAssembly and HTML5 streams. No confidential contracts or financial sheets ever leave your device without explicit consent.
                </p>
              </div>

              <div>
                <h5 className="text-sm font-semibold text-gray-900 mb-1">
                  Lossless Vector Graphics & Color Profiling
                </h5>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Preserves both sRGB and CMYK print profiles along with vector charts, hyperlinks, and interactive form fields without downsampling or degradation.
                </p>
              </div>
            </div>
          </div>

          {/* Spec Group 2 */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-gray-900 flex items-center">
              <Cpu className="w-5 h-5 text-blue-600 mr-2 shrink-0" />
              Ecosystem & Connectivity
            </h4>

            <div className="space-y-4 pl-7 border-l-2 border-gray-200">
              <div>
                <h5 className="text-sm font-semibold text-gray-900 mb-1">
                  Cloud Integration with Google Workspace
                </h5>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Direct compatibility with Google Drive documents, Google Docs, Sheets, and Slides exports with instant cloud syncing.
                </p>
              </div>

              <div>
                <h5 className="text-sm font-semibold text-gray-900 mb-1">
                  Multi-Touch & Mobile Viewport Support
                </h5>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Full gesture support for drag-and-drop file reordering on iOS Mobile Safari, Android Chrome, and touch laptops.
                </p>
              </div>

              <div>
                <h5 className="text-sm font-semibold text-gray-900 mb-1">
                  Multi-Format Image & Raster Conversion
                </h5>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Stitches JPEG, PNG, and WebP graphics alongside existing PDFs into standardized, print-ready document pages.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
