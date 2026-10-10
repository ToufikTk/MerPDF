import React, { useState } from 'react';
import { Minus, Plus, ArrowRight, HelpCircle, Search, Shield, Zap, FileText } from 'lucide-react';
import { FAQItem } from '../types';

interface FAQPageProps {
  onGoToMerge: () => void;
}

const FAQ_DATA: (FAQItem & { category: 'general' | 'security' | 'features' | 'files' })[] = [
  {
    category: 'general',
    question: 'Is Merge PDF completely free to use?',
    answer:
      "Yes, Merge PDF is 100% free with no hidden charges, trial limitations, or mandatory account registrations. You can combine documents directly in your browser without watermarks or file throttling.",
  },
  {
    category: 'general',
    question: 'How do I use Merge PDF?',
    answer:
      "Simply drag and drop your PDF or image files into the upload zone, rearrange pages or rotate them to your preference, and click 'Merge all'. Your combined PDF is generated in seconds and downloads directly to your device.",
  },
  {
    category: 'security',
    question: 'Are my uploaded files safe and private?',
    answer:
      'Absolutely. Unlike traditional PDF converters, all processing happens entirely inside your client browser using client-side memory buffers. Your confidential documents, contracts, and personal records are never transmitted or saved to external servers.',
  },
  {
    category: 'features',
    question: 'Can I merge PDFs on mobile devices?',
    answer:
      'Yes, the tool is fully responsive and optimized for touchscreens on iOS Safari and Android Chrome. You can merge PDFs directly from your phone or tablet with zero installations.',
  },
  {
    category: 'features',
    question: 'Can I combine multiple PDF files at once?',
    answer:
      'Yes, you can merge dozens of files simultaneously. There is no artificial document count limit. Select all your files in one step and arrange them effortlessly.',
  },
  {
    category: 'files',
    question: 'Can I delete, reorder, or rotate pages before merging?',
    answer:
      'Yes! The interactive page arranger lets you drag to reorder documents, rotate pages in 90° increments, and remove unwanted pages with a single click before producing the final combined document.',
  },
  {
    category: 'files',
    question: 'Can I merge image files (JPG, PNG) with PDF documents?',
    answer:
      'Yes. Our built-in rasterizer converts JPG, JPEG, and PNG images into standardized PDF pages seamlessly, allowing you to interleave photos, scans, and documents.',
  },
  {
    category: 'security',
    question: 'Will the merged PDF preserve original quality and formatting?',
    answer:
      'Yes. All fonts, vector graphics, high-resolution imagery, form fields, and metadata retain their original quality according to ISO 32000-2 specifications without compression artifacts.',
  },
  {
    category: 'features',
    question: 'Can I preview the merged document before downloading?',
    answer:
      'Yes. We provide a full-screen interactive preview modal so you can inspect every page, verify orientation, and ensure completeness before downloading.',
  },
];

export const FAQPage: React.FC<FAQPageProps> = ({ onGoToMerge }) => {
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1]);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'general' | 'security' | 'features' | 'files'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const filteredItems = FAQ_DATA.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12 animate-in fade-in duration-200">
      {/* 1. Header & Lead */}
      <div className="text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-gray-800 text-xs font-semibold mb-4">
          <HelpCircle className="w-3.5 h-3.5 text-black" />
          <span>Help &amp; Knowledge Base</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-950 mb-4 font-['Plus_Jakarta_Sans']">
          Frequently Asked Questions
        </h1>
        <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed max-w-3xl">
          Everything you need to know about merging documents, local in-browser security, supported formats, and performance.
        </p>
      </div>

      {/* 2. Search & Category Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. security, mobile, quality)..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-black shadow-2xs placeholder-gray-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-black text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Questions
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('general')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              selectedCategory === 'general'
                ? 'bg-black text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Zap className="w-3 h-3" />
            General
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('security')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              selectedCategory === 'security'
                ? 'bg-black text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Shield className="w-3 h-3" />
            Privacy &amp; Security
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('features')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              selectedCategory === 'features'
                ? 'bg-black text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <HelpCircle className="w-3 h-3" />
            Features &amp; Mobile
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('files')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              selectedCategory === 'files'
                ? 'bg-black text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FileText className="w-3 h-3" />
            Page Editing &amp; Files
          </button>
        </div>
      </div>

      {/* 3. Accordion List */}
      <div className="bg-[#fcfbf9] border border-[#f1ece5] rounded-3xl p-6 sm:p-8 shadow-2xs divide-y divide-gray-200/80">
        {filteredItems.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            <p className="text-sm font-medium">No questions matched &quot;{searchQuery}&quot;</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 text-xs text-black font-semibold hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          filteredItems.map((item, index) => {
            const isOpen = openIndices.includes(index);
            return (
              <div key={index} className="py-5 first:pt-2 last:pb-2">
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center justify-between text-left focus:outline-hidden group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-black transition-colors pr-6">
                    {item.question}
                  </h3>
                  <div className="shrink-0 text-gray-800 ml-2">
                    {isOpen ? (
                      <Minus className="w-5 h-5 stroke-[2]" />
                    ) : (
                      <Plus className="w-5 h-5 stroke-[2]" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="pt-3 pr-10 text-sm sm:text-base text-gray-600 leading-relaxed animate-in fade-in slide-in-from-top-1 duration-150">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* 4. Ready to try it? CTA Card */}
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
            className="inline-flex items-center px-7 py-3 rounded-full bg-[#111827] hover:bg-black text-white text-sm font-semibold shadow-sm hover:shadow transition-all cursor-pointer"
          >
            Open the Merger
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};
