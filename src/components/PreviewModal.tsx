import React from 'react';
import { X, Download, ExternalLink } from 'lucide-react';

interface PreviewModalProps {
  url: string | null;
  name: string;
  onClose: () => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({ url, name, onClose }) => {
  if (!url) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs">
              PDF
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 truncate max-w-md">
                {name}
              </h3>
              <p className="text-xs text-gray-500">Document preview</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href={url}
              download={name}
              className="inline-flex items-center px-4 py-2 rounded-full bg-[#111827] text-white text-xs font-semibold hover:bg-black transition-colors"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Download
            </a>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              title="Open in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded Iframe Preview */}
        <div className="flex-1 bg-gray-100 p-2 overflow-hidden">
          <iframe
            src={url}
            title="Merged PDF Preview"
            className="w-full h-full rounded-2xl bg-white border border-gray-200 shadow-inner"
          />
        </div>
      </div>
    </div>
  );
};
