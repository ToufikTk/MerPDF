import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Upload,
  UploadCloud,
  ChevronDown,
  Trash2,
  ArrowUp,
  ArrowDown,
  RotateCw,
  Plus,
  ArrowLeft,
  ArrowRight,
  Download,
  Eye,
  Check,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  Star,
  RefreshCw,
  Sparkles,
  FolderOpen,
  Link2,
  X,
  Loader2,
  AlertCircle,
  Globe
} from 'lucide-react';
import { UploadedFileItem } from '../types';
import {
  formatFileSize,
  getPdfPageCount,
  mergePdfFiles,
  createSamplePdf
} from '../utils/pdfMerger';
import { generatePdfThumbnail } from '../utils/pdfThumbnail';
import { FilePreviewModal } from './FilePreviewModal';
import { getSiteConfig } from '../services/siteConfigService';

interface MergeToolProps {
  onPreviewPdf: (url: string, name: string) => void;
  hideHeaderTitle?: boolean;
  embedded?: boolean;
  onOpenHowItWorks?: () => void;
  onNavigateStudio?: () => void;
}

export const MergeTool: React.FC<MergeToolProps> = ({
  onPreviewPdf,
  hideHeaderTitle = false,
  embedded = false,
  onOpenHowItWorks,
  onNavigateStudio,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [files, setFiles] = useState<UploadedFileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMerging, setIsMerging] = useState(false);
  const [mergeProgress, setMergeProgress] = useState(0);
  const [mergedPdfResult, setMergedPdfResult] = useState<{
    url: string;
    totalPages: number;
    size: number;
  } | null>(null);

  // URL Import state
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
  const [urlInputValue, setUrlInputValue] = useState('');
  const [isUrlImporting, setIsUrlImporting] = useState(false);
  const [urlImportError, setUrlImportError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  // File Preview Modal state
  const [viewingFile, setViewingFile] = useState<UploadedFileItem | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Trigger file browser
  const handleSelectFiles = () => {
    setIsDropdownOpen(false);
    fileInputRef.current?.click();
  };

  // Open URL Import Modal
  const handleOpenUrlModal = () => {
    setIsDropdownOpen(false);
    setUrlImportError(null);
    setUrlInputValue('');
    setIsUrlModalOpen(true);
  };

  // Maximum total file size limit: 20MB
  const MAX_TOTAL_BYTES = 20 * 1024 * 1024;

  // Process selected files
  const processFiles = async (fileList: FileList | File[]) => {
    const list = Array.from(fileList);
    const currentTotal = files.reduce((acc, f) => acc + f.size, 0);
    const incomingTotal = list.reduce((acc, f) => acc + f.size, 0);

    if (currentTotal + incomingTotal > MAX_TOTAL_BYTES) {
      setGeneralError('Maximum file size exceeded: Please ensure total file size is under 20MB.');
      return;
    }
    setGeneralError(null);

    const newItems: UploadedFileItem[] = [];

    for (const file of list) {
      let previewUrl: string | undefined = undefined;
      if (file.type.startsWith('image/')) {
        previewUrl = URL.createObjectURL(file);
      } else if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        try {
          previewUrl = await generatePdfThumbnail(file);
        } catch (e) {
          console.warn('PDF thumbnail generation failed for', file.name, e);
        }
      }

      const pageCount = await getPdfPageCount(file);

      newItems.push({
        id: Math.random().toString(36).substring(2, 9),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        pageCount,
        rotation: 0,
        previewUrl,
      });
    }

    if (newItems.length > 0) {
      setFiles((prev) => [...prev, ...newItems]);
      setCurrentStep(2);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
    // reset input value so re-selecting same file triggers event
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  // Clipboard paste support (Cmd+V / Ctrl+V)
  React.useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData && e.clipboardData.files && e.clipboardData.files.length > 0) {
        processFiles(e.clipboardData.files);
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [files]);

  // Ensure all PDF files have thumbnail previews generated
  useEffect(() => {
    let isCancelled = false;
    files.forEach(async (fileItem) => {
      if (
        !fileItem.previewUrl &&
        (fileItem.file.type === 'application/pdf' || fileItem.name.toLowerCase().endsWith('.pdf'))
      ) {
        try {
          const thumb = await generatePdfThumbnail(fileItem.file);
          if (thumb && !isCancelled) {
            setFiles((prev) =>
              prev.map((f) => (f.id === fileItem.id ? { ...f, previewUrl: thumb } : f))
            );
          }
        } catch (err) {
          console.warn('Could not generate thumbnail for', fileItem.name, err);
        }
      }
    });
    return () => {
      isCancelled = true;
    };
  }, [files]);

  // Load sample documents for instant testing without hunting for local files
  const handleLoadSampleDocuments = async () => {
    setIsDropdownOpen(false);
    const sample1 = await createSamplePdf(
      'Annual Operations Summary',
      'Corporate Report',
      [0.08, 0.44, 0.85]
    );
    const sample2 = await createSamplePdf(
      'Enterprise Service Agreement',
      'Legal Contract',
      [0.15, 0.65, 0.4]
    );
    const sample3 = await createSamplePdf(
      'Financial Appendix & Audit',
      'Financial Statement',
      [0.55, 0.25, 0.75]
    );

    await processFiles([sample1, sample2, sample3]);
  };

  // File reordering and manipulations
  const moveFile = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= files.length) return;

    const newFiles = [...files];
    const temp = newFiles[index];
    newFiles[index] = newFiles[targetIndex];
    newFiles[targetIndex] = temp;
    setFiles(newFiles);
  };

  const rotateFile = (index: number) => {
    setFiles((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, rotation: ((item.rotation || 0) + 90) % 360 }
          : item
      )
    );
  };

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      if (updated.length === 0) {
        setCurrentStep(1);
      }
      return updated;
    });
  };

  const reverseOrder = () => {
    setFiles((prev) => [...prev].reverse());
  };

  const handleScrollToHowItWorks = () => {
    if (onOpenHowItWorks) {
      onOpenHowItWorks();
      return;
    }
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = '#how-it-works';
    }
  };

  const handleTryItFreeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateStudio) {
      onNavigateStudio();
    } else {
      window.location.hash = '#studio';
    }
  };

  const clearAll = () => {
    setFiles([]);
    setMergedPdfResult(null);
    setCurrentStep(1);
  };

  // Execute Merge Operation
  const handleMergeAll = async () => {
    if (files.length === 0) return;
    setIsMerging(true);
    setMergeProgress(10);

    try {
      const result = await mergePdfFiles(files, (pct) => {
        setMergeProgress(pct);
      });

      setMergedPdfResult(result);
      setCurrentStep(3);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0284c7', '#10b981', '#6366f1', '#f59e0b'],
        });
      } catch (e) {
        // Confetti fallback
      }
    } catch (error) {
      console.error('Error merging PDFs:', error);
      setGeneralError('An error occurred while merging your PDF documents. Please make sure the files are valid.');
    } finally {
      setIsMerging(false);
    }
  };

  // Submit URL import
  const handleImportUrlSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    let rawUrl = urlInputValue.trim();
    if (!rawUrl) {
      setUrlImportError('Please enter a valid document or image URL.');
      return;
    }

    if (!rawUrl.startsWith('http://') && !rawUrl.startsWith('https://')) {
      rawUrl = 'https://' + rawUrl;
    }

    setIsUrlImporting(true);
    setUrlImportError(null);

    try {
      let blob: Blob | null = null;
      let filename = '';
      let resolvedType = 'application/pdf';

      // 1. First attempt via backend proxy to bypass CORS and resolve Google Drive/Dropbox
      try {
        const proxyEndpoint = `/api/proxy-file?url=${encodeURIComponent(rawUrl)}`;
        const proxyRes = await fetch(proxyEndpoint);

        if (proxyRes.ok) {
          const xFilename = proxyRes.headers.get('X-Filename');
          if (xFilename) {
            filename = decodeURIComponent(xFilename);
          }
          const cType = proxyRes.headers.get('Content-Type');
          if (cType) {
            resolvedType = cType.split(';')[0].trim();
          }
          blob = await proxyRes.blob();
        } else {
          let errorDetail = '';
          try {
            const errData = await proxyRes.json();
            errorDetail = errData.error || '';
          } catch {
            errorDetail = `Server returned HTTP ${proxyRes.status}`;
          }

          if (proxyRes.status !== 404 || errorDetail) {
            throw new Error(errorDetail || `Unable to retrieve document (HTTP ${proxyRes.status})`);
          }
        }
      } catch (proxyErr: any) {
        if (!proxyErr.message?.includes('404')) {
          throw proxyErr;
        }
      }

      // 2. Direct fetch fallback if proxy unavailable
      if (!blob) {
        const directRes = await fetch(rawUrl);
        if (!directRes.ok) {
          throw new Error(`Unable to download file (HTTP ${directRes.status})`);
        }
        resolvedType = directRes.headers.get('Content-Type') || 'application/pdf';
        blob = await directRes.blob();
      }

      // Check if remote URL returned an HTML page (like a login or 404 page)
      if (blob.type.includes('text/html') || resolvedType.includes('text/html')) {
        const headerCheck = await blob.slice(0, 100).text();
        if (!headerCheck.startsWith('%PDF')) {
          throw new Error(
            'The URL provided points to a web page rather than a direct document or image file. Please provide a direct download or public share link.'
          );
        }
      }

      // Derive filename if not resolved
      if (!filename) {
        try {
          const parsed = new URL(rawUrl);
          const pathEnd = parsed.pathname.split('/').filter(Boolean).pop();
          if (pathEnd && pathEnd.includes('.')) {
            filename = decodeURIComponent(pathEnd.split('?')[0].split('#')[0]);
          }
        } catch {}
      }

      if (!filename) {
        const ext = resolvedType.includes('pdf')
          ? '.pdf'
          : resolvedType.includes('png')
          ? '.png'
          : resolvedType.includes('jpeg') || resolvedType.includes('jpg')
          ? '.jpg'
          : resolvedType.includes('sheet') || resolvedType.includes('excel')
          ? '.xlsx'
          : resolvedType.includes('word')
          ? '.docx'
          : '.pdf';
        filename = `remote_document_${Date.now().toString().slice(-4)}${ext}`;
      }

      // Check size limit: 20MB
      if (blob.size > MAX_TOTAL_BYTES) {
        throw new Error('File exceeds the 20 MB size limit.');
      }

      const file = new File([blob], filename, { type: blob.type || resolvedType });

      // Process file into tool
      await processFiles([file]);

      // Close modal
      setIsUrlModalOpen(false);
      setUrlInputValue('');
      setUrlImportError(null);
    } catch (err: any) {
      console.error('Import from URL error:', err);
      setUrlImportError(
        err.message ||
          'Failed to import document from this URL. Please verify the URL is public and points directly to a file.'
      );
    } finally {
      setIsUrlImporting(false);
    }
  };

  const handleDownload = () => {
    if (!mergedPdfResult) return;
    const link = document.createElement('a');
    link.href = mergedPdfResult.url;
    link.download = `merged_document_${Date.now()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id={embedded ? undefined : 'merge-tool'}
      className={
        embedded
          ? 'relative w-full'
          : 'relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'
      }
    >
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,application/pdf,image/png,image/jpeg,image/jpg,.docx,.xlsx,.pptx"
        className="hidden"
        onChange={handleFileInputChange}
      />

      {/* Main Title & Subtitle */}
      {!hideHeaderTitle && (
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 mb-4 font-['Plus_Jakarta_Sans']">
            Merge PDF Files Online for Free
          </h1>
          <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed max-w-2xl mx-auto mb-8">
            <strong className="text-gray-950 font-semibold">Merge. Combine. Simplify.</strong> Select multiple files, arrange their positions, and merge them in seconds. Easily combine PDF files online for free.
          </p>

          {/* Hero Action CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleTryItFreeClick}
              className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-black hover:bg-gray-900 text-white text-sm font-semibold shadow-xs transition-colors cursor-pointer active:scale-98"
            >
              <span>Try It Free</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2]" />
            </button>

            <button
              type="button"
              onClick={handleScrollToHowItWorks}
              className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-gray-100 hover:bg-gray-200/80 border border-gray-200 text-gray-900 text-sm font-semibold shadow-2xs transition-colors cursor-pointer active:scale-98"
            >
              <span>How It Work</span>
            </button>
          </div>

          {/* Social Proof Rating Badge */}
          <div className="mt-6 flex justify-center">
            <div className="inline-flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-2 rounded-full bg-white border border-gray-200/90 shadow-2xs">
              {/* Overlapping User Avatars */}
              <div className="flex items-center -space-x-2">
                <div className="w-6 h-6 rounded-full bg-[#4f46e5] text-white flex items-center justify-center text-[9px] font-bold ring-2 ring-white select-none">
                  JD
                </div>
                <div className="w-6 h-6 rounded-full bg-[#f97316] text-white flex items-center justify-center text-[9px] font-bold ring-2 ring-white select-none">
                  SK
                </div>
                <div className="w-6 h-6 rounded-full bg-[#10b981] text-white flex items-center justify-center text-[9px] font-bold ring-2 ring-white select-none">
                  M
                </div>
                <div className="w-6 h-6 rounded-full bg-[#f43f5e] text-white flex items-center justify-center text-[9px] font-bold ring-2 ring-white select-none">
                  AC
                </div>
              </div>

              {/* 5 Rating Stars */}
              <div className="flex items-center space-x-0.5 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              </div>

              {/* Rating Text */}
              <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                <span className="font-bold text-gray-950">Rated 4.9/5</span>
                <span className="text-gray-400 font-light">·</span>
                <span className="text-gray-600 font-normal">100,000+ happy users</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Tool Container (without outer frame) */}
      <div className="max-w-4xl mx-auto transition-all">
        {/* General Error Banner */}
        {generalError && (
          <div className="mb-4 p-4 rounded-2xl bg-red-50 border border-red-200/90 text-red-800 text-xs sm:text-sm flex items-center justify-between shadow-2xs animate-in fade-in">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{generalError}</span>
            </div>
            <button
              type="button"
              onClick={() => setGeneralError(null)}
              className="text-red-500 hover:text-red-800 p-1 rounded-lg hover:bg-red-100 transition-colors cursor-pointer"
              aria-label="Dismiss message"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 1: UPLOAD DROPZONE */}
        {currentStep === 1 && (
          <div className="space-y-6">
            {/* Widget Container matching the uploaded design */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleSelectFiles}
              className={`p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-gray-200/90 bg-gray-50/70 shadow-2xs transition-all cursor-pointer group ${
                isDragging
                  ? 'border-orange-400 bg-orange-50/20 scale-[0.99]'
                  : 'hover:border-gray-300 hover:bg-gray-100/60'
              }`}
            >
              {/* Inset Dashed Outline */}
              <div
                className={`border-2 border-dashed rounded-xl sm:rounded-2xl py-12 sm:py-16 px-6 sm:px-12 flex flex-col items-center justify-center text-center transition-colors ${
                  isDragging
                    ? 'border-[#e64a19] bg-white/80'
                    : 'border-gray-300 group-hover:border-gray-400 bg-white'
                }`}
              >
                {/* Squircle Upload Icon Box */}
                <div className="w-14 h-14 rounded-2xl bg-gray-100/90 border border-gray-200/40 flex items-center justify-center mb-4 text-gray-500 group-hover:text-gray-700 group-hover:scale-105 transition-all duration-200">
                  <Upload className="w-6 h-6 stroke-[1.75]" />
                </div>

                {/* Main Heading */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5 font-['Plus_Jakarta_Sans']">
                  Drop, Upload or Paste Files
                </h3>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-gray-500 font-normal mb-6">
                  Supported formats: PDF, JPG, PNG, DOCX, XLSX, PPTX &middot; Max 20 MB
                </p>

                {/* Button Action Row */}
                <div className="flex items-center justify-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleSelectFiles}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#111827] hover:bg-black text-white font-semibold text-sm shadow-xs transition-all cursor-pointer active:scale-98"
                  >
                    <Upload className="w-4 h-4 stroke-[2.2]" />
                    <span>Browse Files</span>
                  </button>

                  {/* Secondary Link / Import Options Button */}
                  <div className="relative" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 hover:text-black flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                      title="Import from URL or Sample Documents"
                      aria-label="Import options"
                    >
                      <Link2 className="w-4 h-4 stroke-[2]" />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-30 text-left animate-in fade-in zoom-in-95 duration-150">
                        <button
                          type="button"
                          onClick={handleLoadSampleDocuments}
                          className="w-full flex items-center px-3 py-2.5 text-xs font-semibold text-[#e64a19] bg-orange-50/70 hover:bg-orange-50 rounded-xl transition-colors cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5 mr-2 text-[#e64a19]" />
                          Try sample documents (1-click)
                        </button>
                        <button
                          type="button"
                          onClick={handleOpenUrlModal}
                          className="w-full flex items-center px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 rounded-xl transition-colors mt-1 cursor-pointer"
                        >
                          <Link2 className="w-3.5 h-3.5 mr-2 text-gray-500" />
                          Import from URL
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Quiet trust metadata with typographic separators */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 pt-1">
              <span>Free to use</span>
              <span aria-hidden="true">&middot;</span>
              <span>100% In-browser security</span>
              <span aria-hidden="true">&middot;</span>
              <span>No file size compromise</span>
              <span aria-hidden="true">&middot;</span>
              <span>Instant download</span>
            </div>

            {/* If files already loaded, show shortcut to Step 2 */}
            {files.length > 0 && (
              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center text-sm font-semibold text-gray-900 hover:text-black bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full cursor-pointer transition-colors"
                >
                  Continue with {files.length} loaded files
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: ARRANGE & MERGE */}
        {currentStep === 2 && (
          <div className="space-y-6 bg-white rounded-3xl border border-gray-200/90 shadow-sm p-6 sm:p-8">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {files.length} {files.length === 1 ? 'file' : 'files'} selected
                </h3>
                <p className="text-xs text-gray-500">
                  Drag, reorder, or rotate before combining into a single PDF
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleSelectFiles}
                  className="inline-flex items-center px-3.5 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  Add files
                </button>
                <button
                  type="button"
                  onClick={handleOpenUrlModal}
                  className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                  title="Import document from URL"
                >
                  <Link2 className="w-3.5 h-3.5 mr-1" />
                  Import URL
                </button>
                <button
                  type="button"
                  onClick={reverseOrder}
                  className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Reverse order"
                >
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Reverse
                </button>
                <button
                  type="button"
                  onClick={clearAll}
                  className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Clear all
                </button>
              </div>
            </div>

            {/* List of Files with Order & Controls */}
            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {files.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3.5 sm:p-4 bg-gray-50/70 hover:bg-gray-50 border border-gray-200/80 rounded-2xl transition-all group"
                >
                  {/* Left: Index badge & Thumbnail & Name */}
                  <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1 mr-3">
                    <span className="w-6 h-6 rounded-full bg-white border border-gray-300 text-xs font-bold text-gray-700 flex items-center justify-center shrink-0 shadow-2xs">
                      {index + 1}
                    </span>

                    {/* Thumbnail preview - Click to preview */}
                    <div
                      onClick={() => setViewingFile(item)}
                      className="w-11 h-14 bg-white border border-gray-200 rounded-lg shadow-2xs flex items-center justify-center overflow-hidden shrink-0 relative cursor-pointer hover:border-[#e64a19] hover:shadow-sm transition-all group/thumb"
                      title="Click to preview file"
                    >
                      {item.previewUrl ? (
                        <img
                          src={item.previewUrl}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform group-hover/thumb:scale-105"
                          style={{ transform: `rotate(${item.rotation || 0}deg)` }}
                        />
                      ) : (
                        <div
                          className="flex flex-col items-center justify-center w-full h-full p-1"
                          style={{ transform: `rotate(${item.rotation || 0}deg)` }}
                        >
                          <FileText className="w-5 h-5 text-red-500 mb-0.5" />
                          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">
                            PDF
                          </span>
                        </div>
                      )}
                      {item.rotation && item.rotation > 0 ? (
                        <span className="absolute bottom-0 right-0 bg-gray-900 text-[8px] text-white px-1 font-bold rounded-tl">
                          {item.rotation}°
                        </span>
                      ) : null}
                    </div>

                    {/* Name & Size Info - Click to preview */}
                    <div
                      onClick={() => setViewingFile(item)}
                      className="min-w-0 flex-1 cursor-pointer"
                      title="Click to preview file"
                    >
                      <p className="text-sm font-semibold text-gray-900 truncate hover:text-[#e64a19] transition-colors" title={item.name}>
                        {item.name}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500 mt-0.5">
                        <span>{formatFileSize(item.size)}</span>
                        <span>•</span>
                        <span>
                          {item.pageCount || 1} {item.pageCount === 1 ? 'page' : 'pages'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Actions: Reorder, Preview, Rotate, Delete */}
                  <div className="flex items-center space-x-1 sm:space-x-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => moveFile(index, 'up')}
                      disabled={index === 0}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                      title="Move Up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveFile(index, 'down')}
                      disabled={index === files.length - 1}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                      title="Move Down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewingFile(item)}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-white transition-colors cursor-pointer"
                      title="Preview file"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => rotateFile(index)}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-white transition-colors cursor-pointer"
                      title="Rotate 90° clockwise"
                    >
                      <RotateCw className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-white transition-colors cursor-pointer"
                      title="Remove file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="inline-flex items-center px-5 py-2.5 rounded-full border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>

              <button
                type="button"
                onClick={handleMergeAll}
                disabled={isMerging}
                className="inline-flex items-center px-7 py-3 rounded-full bg-[#111827] hover:bg-black text-sm font-semibold text-white shadow-sm hover:shadow transition-all disabled:opacity-75"
              >
                {isMerging ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Merging files ({mergeProgress}%)...
                  </>
                ) : (
                  <>
                    Merge all
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: MERGED READY STATE */}
        {currentStep === 3 && mergedPdfResult && (
          <div className="text-center py-10 px-6 sm:px-10 bg-white rounded-3xl border border-gray-200/90 shadow-sm space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50/50">
              <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                Your PDF is ready!
              </h3>
              <p className="text-sm text-gray-600">
                Combined {files.length} files into 1 document with{' '}
                <span className="font-semibold text-gray-800">{mergedPdfResult.totalPages} pages</span> (
                {formatFileSize(mergedPdfResult.size)})
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center px-7 py-3.5 rounded-full bg-[#111827] hover:bg-black text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all"
              >
                <Download className="w-4 h-4 mr-2" />
                Download merged PDF
              </button>

              <button
                type="button"
                onClick={() => onPreviewPdf(mergedPdfResult.url, 'merged_document.pdf')}
                className="inline-flex items-center px-6 py-3.5 rounded-full border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview in browser
              </button>

              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center px-5 py-3.5 rounded-full text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Merge another batch
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Trust bar matching Screenshot 3 & 7 */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-gray-600 font-medium">
        <div className="flex items-center space-x-1.5">
          <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
          <span>Secure and private</span>
        </div>
        <span className="hidden sm:inline text-gray-300">|</span>
        <div className="flex items-center space-x-1.5">
          <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
          <span>Trusted by over 100M users</span>
        </div>
        <span className="hidden sm:inline text-gray-300">|</span>
        <div className="flex items-center space-x-1.5">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span>4.8/5 (1,500+ reviews on Trustpilot)</span>
        </div>
      </div>

      {/* Import from URL / Cloud Modal */}
      {isUrlModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => {
            if (!isUrlImporting) {
              setIsUrlModalOpen(false);
              setUrlImportError(null);
            }
          }}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 sm:p-7 text-left animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#e64a19] shrink-0">
                  <Link2 className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-950 font-['Plus_Jakarta_Sans']">
                    Import Document from URL
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Enter a direct public link to a PDF, image, or document
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (!isUrlImporting) {
                    setIsUrlModalOpen(false);
                    setUrlImportError(null);
                  }
                }}
                disabled={isUrlImporting}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1.5 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleImportUrlSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Document or image URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Globe className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={urlInputValue}
                    onChange={(e) => {
                      setUrlInputValue(e.target.value);
                      if (urlImportError) setUrlImportError(null);
                    }}
                    placeholder="https://example.com/document.pdf"
                    autoFocus
                    disabled={isUrlImporting}
                    className="w-full pl-10 pr-10 py-3 text-sm bg-gray-50/70 focus:bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#e64a19] focus:ring-3 focus:ring-orange-500/15 transition-all"
                  />
                  {urlInputValue && !isUrlImporting && (
                    <button
                      type="button"
                      onClick={() => setUrlInputValue('')}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Sample link helper button */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5 text-[11px] text-gray-500">
                <span className="text-gray-400">Need a quick test link?</span>
                <button
                  type="button"
                  onClick={() => {
                    setUrlInputValue('https://raw.githubusercontent.com/mozilla/pdf.js/master/test/pdfs/basicapi.pdf');
                    setUrlImportError(null);
                  }}
                  className="font-medium text-[#e64a19] hover:underline cursor-pointer inline-flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-[#e64a19]" />
                  Paste sample public PDF
                </button>
              </div>

              {/* Error message */}
              {urlImportError && (
                <div className="p-3 bg-red-50 border border-red-200/80 rounded-xl text-red-700 text-xs flex items-start gap-2.5 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div className="flex-1 leading-relaxed">{urlImportError}</div>
                </div>
              )}

              {/* Format badges */}
              <div className="pt-1 pb-1 text-[11px] text-gray-500">
                .pdf, .jpg, .jpeg, .png, .docx, .xlsx, .pptx supported | Maximum file size: &lt; 20MB total
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsUrlModalOpen(false);
                    setUrlImportError(null);
                  }}
                  disabled={isUrlImporting}
                  className="px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUrlImporting || !urlInputValue.trim()}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#e64a19] hover:bg-[#d83f10] text-white font-semibold text-xs sm:text-sm shadow-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-98"
                >
                  {isUrlImporting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Fetching document...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Import File</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Single File Preview Modal */}
      {viewingFile && (
        <FilePreviewModal
          item={viewingFile}
          onClose={() => setViewingFile(null)}
          onRotate={(id) => {
            const idx = files.findIndex((f) => f.id === id);
            if (idx !== -1) {
              rotateFile(idx);
              setViewingFile((prev) =>
                prev ? { ...prev, rotation: ((prev.rotation || 0) + 90) % 360 } : null
              );
            }
          }}
        />
      )}
    </section>
  );
};
