import React, { useEffect, useRef, useState } from 'react';
import {
  X,
  Download,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Maximize2,
  RotateCcw,
} from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Configure PDF.js worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
}

interface PreviewModalProps {
  url: string | null;
  name: string;
  onClose: () => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({ url, name, onClose }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.15);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pdfDocRef = useRef<pdfjsLib.PDFDocumentProxy | null>(null);
  const renderTaskRef = useRef<any>(null);

  // Load the PDF Document from the Blob URL
  useEffect(() => {
    let isCancelled = false;

    if (!url) return;

    setLoading(true);
    setError(null);

    const loadDocument = async () => {
      try {
        // Fetch arrayBuffer to ensure reliable parsing in all environments
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();

        if (isCancelled) return;

        const loadingTask = pdfjsLib.getDocument({
          data: new Uint8Array(arrayBuffer),
        });

        const pdf = await loadingTask.promise;
        if (isCancelled) return;

        pdfDocRef.current = pdf;
        setNumPages(pdf.numPages);
        setCurrentPage(1);
        setLoading(false);
      } catch (err: any) {
        if (isCancelled) return;
        console.error('Failed to load PDF with pdfjs:', err);
        setError('Could not render PDF preview in-browser. You can still download the file directly.');
        setLoading(false);
      }
    };

    loadDocument();

    return () => {
      isCancelled = true;
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {}
      }
    };
  }, [url]);

  // Render the current page onto HTML5 Canvas
  useEffect(() => {
    let isCancelled = false;

    const renderPage = async () => {
      if (!pdfDocRef.current || !canvasRef.current || loading) return;

      try {
        if (renderTaskRef.current) {
          try {
            renderTaskRef.current.cancel();
          } catch {}
        }

        const page = await pdfDocRef.current.getPage(currentPage);
        if (isCancelled) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        const viewport = page.getViewport({ scale });
        const pixelRatio = window.devicePixelRatio || 1;

        // Set high-resolution display buffer
        canvas.width = Math.floor(viewport.width * pixelRatio);
        canvas.height = Math.floor(viewport.height * pixelRatio);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
          canvas: canvas,
        };

        const renderTask = page.render(renderContext);
        renderTaskRef.current = renderTask;

        await renderTask.promise;
      } catch (err: any) {
        if (err?.name !== 'RenderingCancelledException') {
          console.warn('Page render warning:', err);
        }
      }
    };

    renderPage();

    return () => {
      isCancelled = true;
    };
  }, [currentPage, scale, loading]);

  if (!url) return null;

  const handleNextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 2.5));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.6));
  };

  const handleResetZoom = () => {
    setScale(1.15);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl h-[88vh] flex flex-col overflow-hidden border border-gray-200">
        {/* Header - Matching exact design */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b border-gray-100 bg-white z-10 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs shrink-0">
              PDF
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate max-w-xs sm:max-w-md">
                {name || 'merged_document.pdf'}
              </h3>
              <p className="text-xs text-gray-500">
                {numPages > 0 ? `Page ${currentPage} of ${numPages}` : 'Document preview'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 sm:space-x-2">
            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center space-x-1 mr-2 px-2 py-1 bg-gray-100/80 rounded-full text-gray-600 text-xs">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={scale <= 0.6}
                className="p-1 hover:text-black rounded-full hover:bg-gray-200 transition-colors disabled:opacity-40 cursor-pointer"
                title="Zoom out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                className="px-1.5 font-medium hover:text-black cursor-pointer"
                title="Reset zoom"
              >
                {Math.round(scale * 100)}%
              </button>
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={scale >= 2.5}
                className="p-1 hover:text-black rounded-full hover:bg-gray-200 transition-colors disabled:opacity-40 cursor-pointer"
                title="Zoom in"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Download Button */}
            <a
              href={url}
              download={name || 'merged_document.pdf'}
              className="inline-flex items-center px-4 py-2 rounded-full bg-[#111827] text-white text-xs font-semibold hover:bg-black transition-all shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              <span>Download</span>
            </a>

            {/* Open in new tab */}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              title="Open in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Close Modal */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Close preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Canvas PDF Viewing Area (No native plugin / No Chrome block) */}
        <div className="flex-1 bg-[#f3f4f6] overflow-auto flex flex-col items-center justify-start p-4 sm:p-6 relative">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50/80 backdrop-blur-xs z-20">
              <Loader2 className="w-8 h-8 text-red-600 animate-spin mb-3" />
              <p className="text-sm font-semibold text-gray-700">Rendering PDF document...</p>
              <p className="text-xs text-gray-400 mt-1">Direct high-resolution canvas engine</p>
            </div>
          )}

          {error ? (
            <div className="my-auto text-center max-w-md p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
                <X className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-gray-900 mb-1">Preview Notice</h4>
              <p className="text-xs text-gray-600 mb-4">{error}</p>
              <a
                href={url}
                download={name || 'merged_document.pdf'}
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-[#111827] text-white text-xs font-semibold hover:bg-black transition-colors"
              >
                <Download className="w-3.5 h-3.5 mr-1.5" />
                Download file directly
              </a>
            </div>
          ) : (
            <div className="my-auto flex flex-col items-center">
              {/* Paper Canvas */}
              <div className="bg-white rounded-md shadow-xl border border-gray-300/80 overflow-hidden transition-transform duration-150">
                <canvas ref={canvasRef} className="block" />
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Bar for Multi-page Documents */}
        {numPages > 1 && !loading && (
          <div className="px-6 py-3 border-t border-gray-200 bg-white flex items-center justify-between text-xs text-gray-600 shrink-0">
            <button
              type="button"
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
              className="inline-flex items-center px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 font-medium text-gray-700 transition-colors disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5 mr-1" />
              Previous page
            </button>

            <span className="font-semibold text-gray-800">
              Page {currentPage} of {numPages}
            </span>

            <button
              type="button"
              onClick={handleNextPage}
              disabled={currentPage >= numPages}
              className="inline-flex items-center px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 font-medium text-gray-700 transition-colors disabled:opacity-40 cursor-pointer"
            >
              Next page
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
