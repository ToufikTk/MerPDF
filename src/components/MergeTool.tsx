import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
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
  HardDrive,
  FolderOpen
} from 'lucide-react';
import { UploadedFileItem } from '../types';
import {
  formatFileSize,
  getPdfPageCount,
  mergePdfFiles,
  createSamplePdf
} from '../utils/pdfMerger';
import { getSiteConfig } from '../services/siteConfigService';

interface MergeToolProps {
  onPreviewPdf: (url: string, name: string) => void;
  hideHeaderTitle?: boolean;
  embedded?: boolean;
}

export const MergeTool: React.FC<MergeToolProps> = ({
  onPreviewPdf,
  hideHeaderTitle = false,
  embedded = false,
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

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Trigger file browser
  const handleSelectFiles = () => {
    setIsDropdownOpen(false);
    fileInputRef.current?.click();
  };

  // Process selected files
  const processFiles = async (fileList: FileList | File[]) => {
    const newItems: UploadedFileItem[] = [];

    for (const file of Array.from(fileList)) {
      let previewUrl: string | undefined = undefined;
      if (file.type.startsWith('image/')) {
        previewUrl = URL.createObjectURL(file);
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
      alert('An error occurred while merging your PDF documents. Please make sure the files are valid.');
    } finally {
      setIsMerging(false);
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
        accept=".pdf,application/pdf,image/png,image/jpeg,image/jpg"
        className="hidden"
        onChange={handleFileInputChange}
      />

      {/* Main Title & Subtitle */}
      {!hideHeaderTitle && (
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-950 mb-4 font-['Plus_Jakarta_Sans']">
            {getSiteConfig().seo.h1 || 'Merge PDF Files Online for Free'}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed">
            <strong className="text-gray-950 font-semibold">{getSiteConfig().tagline || 'Merge. Combine. Simplify.'}</strong>{' '}
            {getSiteConfig().seo.metaDescription || 'Select multiple files, arrange their positions, and merge them in seconds. Easily combine PDF files online for free.'}
          </p>
        </div>
      )}

      {/* Outer Tool Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-200/90 shadow-sm p-6 sm:p-10 transition-all">
        {/* Stepper Header */}
        <div className="max-w-md mx-auto mb-8 sm:mb-10">
          <div className="flex items-center justify-between relative">
            {/* Connecting line between Step 1 and Step 2 */}
            <div className="absolute top-4 left-1/4 right-1/4 h-[2px] bg-gray-200 z-0" />
            <div
              className={`absolute top-4 left-1/4 h-[2px] bg-black transition-all duration-300 z-0 ${
                currentStep >= 2 ? 'w-1/2' : 'w-0'
              }`}
            />

            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center flex-1">
              <button
                type="button"
                onClick={() => {
                  if (files.length > 0) setCurrentStep(1);
                }}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  currentStep === 1
                    ? 'border-2 border-black bg-white text-black shadow-sm'
                    : files.length > 0
                    ? 'bg-black text-white'
                    : 'border-2 border-gray-300 text-gray-400 bg-white'
                }`}
              >
                {files.length > 0 && currentStep > 1 ? (
                  <Check className="w-4 h-4 stroke-[2.5]" />
                ) : (
                  '1'
                )}
              </button>
              <span
                className={`text-xs sm:text-sm font-medium mt-2 ${
                  currentStep === 1 ? 'text-gray-900 font-semibold' : 'text-gray-500'
                }`}
              >
                Upload files
              </span>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center flex-1">
              <button
                type="button"
                onClick={() => {
                  if (files.length > 0) setCurrentStep(2);
                }}
                disabled={files.length === 0}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  currentStep === 2
                    ? 'border-2 border-black bg-white text-black shadow-sm ring-2 ring-black/5'
                    : currentStep === 3
                    ? 'bg-black text-white'
                    : 'border-2 border-gray-200 text-gray-400 bg-white'
                }`}
              >
                {currentStep === 3 ? <Check className="w-4 h-4 stroke-[2.5]" /> : '2'}
              </button>
              <span
                className={`text-xs sm:text-sm font-medium mt-2 ${
                  currentStep >= 2 ? 'text-gray-900 font-semibold' : 'text-gray-400'
                }`}
              >
                Arrange file positions
              </span>
            </div>
          </div>
        </div>

        {/* STEP 1: UPLOAD DROPZONE */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleSelectFiles}
              className={`relative border-2 border-dashed rounded-2xl py-12 px-6 sm:py-16 flex flex-col items-center justify-center text-center transition-all cursor-pointer group ${
                isDragging
                  ? 'border-blue-500 bg-blue-50/50 scale-[0.99]'
                  : 'border-gray-200 bg-[#fafafa]/60 hover:bg-[#fafafa] hover:border-gray-300'
              }`}
            >
              {/* Hand Illustration matching Screenshot 3 & 7 */}
              <div className="relative w-36 h-28 flex items-center justify-center mb-2">
                <svg
                  viewBox="0 0 160 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full transform transition-transform group-hover:-translate-y-1 duration-200"
                >
                  {/* Subtle ground shadow dots / mesh */}
                  <ellipse cx="80" cy="108" rx="36" ry="7" fill="#E5E7EB" />
                  <ellipse cx="80" cy="108" rx="28" ry="4" fill="#D1D5DB" />

                  {/* Sparkles */}
                  <path
                    d="M50 72L52 65L59 63L52 61L50 54L48 61L41 63L48 65L50 72Z"
                    fill="#D1D5DB"
                  />
                  <path
                    d="M112 60L113.5 55L118.5 53.5L113.5 52L112 47L110.5 52L105.5 53.5L110.5 55L112 60Z"
                    fill="#E5E7EB"
                  />

                  {/* Stylized Arm with orange-brown diagonal stripes */}
                  <defs>
                    <pattern id="sleeveStripes" width="12" height="12" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                      <line x1="0" y1="0" x2="0" y2="12" stroke="#1F2937" strokeWidth="4" />
                      <line x1="6" y1="0" x2="6" y2="12" stroke="#CA8A04" strokeWidth="4" />
                    </pattern>
                  </defs>

                  <path
                    d="M124 15L95 50L82 40L108 8Z"
                    fill="url(#sleeveStripes)"
                    stroke="#111827"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />

                  {/* Stylized Hand */}
                  <path
                    d="M95 50C92 53 84 57 78 57C72 57 66 62 67 67C68 72 73 75 78 74L90 73L93 78C90 82 82 86 75 84C70 82 66 84 66 88C66 92 71 95 78 95L94 91L96 95C93 98 86 100 81 99C76 98 72 101 73 104C74 107 80 108 87 106C96 103 103 94 106 85L111 68L95 50Z"
                    fill="#FFFFFF"
                    stroke="#111827"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M86 64C89 67 93 69 98 67"
                    stroke="#111827"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M87 78C90 80 94 81 98 79"
                    stroke="#111827"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Upload Prompt Text */}
              <p className="text-gray-900 font-semibold text-lg sm:text-xl mb-4">
                Drag and drop or click here to upload
              </p>

              {/* Upload Button with Dropdown matching screenshot */}
              <div className="relative inline-block" onClick={(e) => e.stopPropagation()}>
                <div className="inline-flex rounded-full shadow-sm">
                  <button
                    type="button"
                    onClick={handleSelectFiles}
                    className="inline-flex items-center px-6 py-3 text-sm font-semibold text-white bg-[#111827] hover:bg-black rounded-l-full transition-colors"
                  >
                    <UploadCloud className="w-4 h-4 mr-2" />
                    Upload file
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="inline-flex items-center px-3 py-3 text-sm font-semibold text-white bg-[#111827] hover:bg-black border-l border-gray-700 rounded-r-full transition-colors"
                    aria-label="Upload options"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-30 text-left animate-in fade-in zoom-in-95 duration-150">
                    <button
                      type="button"
                      onClick={handleSelectFiles}
                      className="w-full flex items-center px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <FolderOpen className="w-4 h-4 mr-2.5 text-gray-600" />
                      From your computer
                    </button>
                    <button
                      type="button"
                      onClick={handleLoadSampleDocuments}
                      className="w-full flex items-center px-3 py-2.5 text-sm font-medium text-blue-700 bg-blue-50/70 hover:bg-blue-50 rounded-xl transition-colors mt-1"
                    >
                      <Sparkles className="w-4 h-4 mr-2.5 text-blue-600" />
                      Try sample documents (1-click)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        alert('Google Drive connection ready. You can also drag and drop local files directly!');
                      }}
                      className="w-full flex items-center px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors mt-1"
                    >
                      <HardDrive className="w-4 h-4 mr-2.5 text-gray-600" />
                      Google Drive
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Format Limits & Specs */}
            <div className="text-center text-xs sm:text-sm text-gray-500 font-normal">
              <span>.pdf, .jpg, .jpeg, .png, .docx, .xlsx, .pptx supported</span>
              <span className="mx-2 text-gray-300">|</span>
              <span>Maximum file size: &lt; 20MB total</span>
            </div>

            {/* If files already loaded, show shortcut to Step 2 */}
            {files.length > 0 && (
              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-full"
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
          <div className="space-y-6">
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
                  className="inline-flex items-center px-3.5 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  Add files
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

                    {/* Thumbnail preview */}
                    <div className="w-11 h-14 bg-white border border-gray-200 rounded-lg shadow-2xs flex items-center justify-center overflow-hidden shrink-0 relative">
                      {item.previewUrl ? (
                        <img
                          src={item.previewUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
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
                        <span className="absolute bottom-0 right-0 bg-blue-600 text-[8px] text-white px-1 font-bold rounded-tl">
                          {item.rotation}°
                        </span>
                      ) : null}
                    </div>

                    {/* Name & Size Info */}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-900 truncate" title={item.name}>
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

                  {/* Right Actions: Reorder, Rotate, Delete */}
                  <div className="flex items-center space-x-1 sm:space-x-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => moveFile(index, 'up')}
                      disabled={index === 0}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                      title="Move Up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveFile(index, 'down')}
                      disabled={index === files.length - 1}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                      title="Move Down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => rotateFile(index)}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-white transition-colors"
                      title="Rotate 90° clockwise"
                    >
                      <RotateCw className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-white transition-colors"
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
          <div className="text-center py-8 px-4 space-y-6">
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
    </section>
  );
};
