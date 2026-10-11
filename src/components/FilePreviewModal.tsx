import React, { useEffect, useRef, useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  FileText,
  Loader2,
  ExternalLink,
  BookOpen,
  Layers
} from 'lucide-react';
import { pdfjsLib } from '../utils/pdfSetup';
import { UploadedFileItem } from '../types';
import { formatFileSize } from '../utils/pdfMerger';

interface FilePreviewModalProps {
  item: UploadedFileItem | null;
  onClose: () => void;
  onRotate?: (id: string) => void;
}

export const FilePreviewModal: React.FC<FilePreviewModalProps> = ({
  item,
  onClose,
  onRotate,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [isLoading, setIsLoading] = useState(true);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [useNativeViewer, setUseNativeViewer] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pdfDocRef = useRef<pdfjsLib.PDFDocumentProxy | null>(null);

  // Keyboard navigation (Esc to close, Left/Right for pages)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setCurrentPage((p) => Math.max(1, p - 1));
      if (e.key === 'ArrowRight') setCurrentPage((p) => Math.min(totalPages, p + 1));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, totalPages]);

  // Create Object URL for fallback or image/native viewing
  useEffect(() => {
    if (!item) return;
    const url = URL.createObjectURL(item.file);
    setObjectUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [item]);

  // Load PDF Document when item changes
  useEffect(() => {
    if (!item) return;
    setCurrentPage(1);
    setScale(1.0);
    setUseNativeViewer(false);

    const isPdf = item.file.type === 'application/pdf' || item.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) {
      setIsLoading(false);
      setTotalPages(1);
      return;
    }

    let isCancelled = false;
    setIsLoading(true);

    (async () => {
      try {
        const buffer = await item.file.arrayBuffer();
        if (isCancelled) return;

        const loadingTask = pdfjsLib.getDocument({
          data: new Uint8Array(buffer),
        });
        const doc = await loadingTask.promise;
        if (isCancelled) return;

        pdfDocRef.current = doc;
        setTotalPages(doc.numPages);
        setIsLoading(false);
      } catch (err) {
        if (!isCancelled) {
          console.warn('PDF.js canvas parsing failed, switching to native reader:', err);
          // Seamlessly switch to native browser viewer so the user always sees their document
          setUseNativeViewer(true);
          setIsLoading(false);
        }
      }
    })();

    return () => {
      isCancelled = true;
      pdfDocRef.current = null;
    };
  }, [item]);

  // Render Page to Canvas
  useEffect(() => {
    if (!item || useNativeViewer || !pdfDocRef.current || !canvasRef.current) return;

    let isCancelled = false;
    const doc = pdfDocRef.current;
    const canvas = canvasRef.current;

    (async () => {
      try {
        const page = await doc.getPage(currentPage);
        if (isCancelled) return;

        const rotationAngle = ((item.rotation || 0) % 360);
        const unscaledViewport = page.getViewport({ scale: 1.0, rotation: rotationAngle });

        // Fit nicely inside container: target width approx 600-800px on desktop
        const containerWidth = Math.min(window.innerWidth - 80, 720);
        const autoFitScale = containerWidth / Math.max(unscaledViewport.width, 100);
        const finalScale = autoFitScale * scale;

        const viewport = page.getViewport({ scale: finalScale, rotation: rotationAngle });

        const pixelRatio = window.devicePixelRatio || 1;
        canvas.width = Math.floor(viewport.width * pixelRatio);
        canvas.height = Math.floor(viewport.height * pixelRatio);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, viewport.width, viewport.height);

        await page.render({
          canvasContext: ctx,
          canvas: canvas,
          viewport: viewport,
        }).promise;
      } catch (err) {
        if (!isCancelled) {
          console.warn('Canvas render error, falling back to native reader:', err);
          setUseNativeViewer(true);
        }
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, [item, currentPage, scale, item?.rotation, useNativeViewer]);

  if (!item) return null;

  const isPdf = item.file.type === 'application/pdf' || item.name.toLowerCase().endsWith('.pdf');
  const isImage = item.file.type.startsWith('image/');

  const handleDownload = () => {
    if (!objectUrl) return;
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = item.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl h-[90vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 bg-white shrink-0">
          <div className="flex items-center space-x-3 min-w-0 flex-1 mr-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#e64a19] shrink-0">
              <FileText className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate" title={item.name}>
                {item.name}
              </h3>
              <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                <span>{formatFileSize(item.size)}</span>
                <span>•</span>
                <span>{totalPages} {totalPages === 1 ? 'page' : 'pages'}</span>
                {item.rotation ? (
                  <>
                    <span>•</span>
                    <span className="text-[#e64a19] font-medium">{item.rotation}° rotated</span>
                  </>
                ) : null}
              </p>
            </div>
          </div>

          {/* Header Controls */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            {/* View Mode Toggle for PDFs */}
            {isPdf && objectUrl && (
              <div className="hidden md:flex items-center p-0.5 bg-gray-100 rounded-xl text-xs font-medium text-gray-600">
                <button
                  type="button"
                  onClick={() => setUseNativeViewer(false)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    !useNativeViewer ? 'bg-white text-gray-900 shadow-2xs font-semibold' : 'hover:text-gray-900'
                  }`}
                  title="Canvas Page View"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Pages</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUseNativeViewer(true)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    useNativeViewer ? 'bg-white text-gray-900 shadow-2xs font-semibold' : 'hover:text-gray-900'
                  }`}
                  title="Native Document Reader"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Reader</span>
                </button>
              </div>
            )}

            {onRotate && (
              <button
                type="button"
                onClick={() => onRotate(item.id)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
                title="Rotate 90° clockwise"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Rotate</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
              title="Download file"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </button>

            {objectUrl && (
              <a
                href={objectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                title="Open file in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Secondary Navigation Controls for Canvas PDF View */}
        {isPdf && !useNativeViewer && totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-2 bg-gray-50/90 border-b border-gray-100 text-xs text-gray-600 shrink-0">
            {/* Page flip */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                title="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="font-semibold text-gray-800">
                Page {currentPage} of {totalPages}
              </span>

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                title="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center space-x-1.5">
              <button
                type="button"
                onClick={() => setScale((s) => Math.max(0.6, s - 0.2))}
                className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono text-gray-500 w-12 text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setScale((s) => Math.min(2.0, s + 0.2))}
                className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 transition-colors cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Viewer Viewport Area */}
        <div className="flex-1 overflow-auto p-2 sm:p-5 bg-gray-100 flex items-center justify-center relative">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500">
              <Loader2 className="w-8 h-8 animate-spin text-[#e64a19] mb-3" />
              <p className="text-sm font-medium">Loading document preview...</p>
            </div>
          ) : isPdf && useNativeViewer && objectUrl ? (
            /* Native Browser PDF Viewer (100% reliable, zero rendering bugs) */
            <div className="w-full h-full bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
              <iframe
                src={`${objectUrl}#toolbar=1`}
                title={item.name}
                className="w-full h-full border-0 rounded-2xl"
              />
            </div>
          ) : isPdf ? (
            /* High-resolution canvas viewer */
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200/80 transition-all max-h-full">
              <canvas ref={canvasRef} className="block mx-auto max-w-full" />
            </div>
          ) : isImage && objectUrl ? (
            /* Image viewer with zoom and rotation */
            <div
              className="max-w-full max-h-full flex items-center justify-center transition-transform"
              style={{ transform: `rotate(${item.rotation || 0}deg) scale(${scale})` }}
            >
              <img
                src={objectUrl}
                alt={item.name}
                className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-xl bg-white"
              />
            </div>
          ) : objectUrl ? (
            /* Generic embedded viewer for other formats */
            <div className="w-full h-full bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
              <iframe
                src={objectUrl}
                title={item.name}
                className="w-full h-full border-0 rounded-2xl"
              />
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-sm font-medium text-gray-700">Preview not available for this format</p>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-5 py-2.5 border-t border-gray-100 bg-white flex items-center justify-between text-xs text-gray-500 shrink-0">
          <span>Click outside or press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-700 font-mono text-[10px]">ESC</kbd> to close</span>
          <span className="font-medium text-gray-700 truncate max-w-xs">{item.name}</span>
        </div>
      </div>
    </div>
  );
};
