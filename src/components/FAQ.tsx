import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronDown, MessageCircle, ArrowRight } from 'lucide-react';
import { FAQItem } from '../types';
import { getSiteConfig } from '../services/siteConfigService';

interface FAQProps {
  onNavigateContact?: () => void;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: 'Is Merge PDF free to use?',
    answer:
      'Yes, Merge PDF is 100% free with no watermarks, usage caps, or hidden costs. You can combine, organize, and download as many documents as you need directly from your browser.',
  },
  {
    question: 'How do I merge PDF files?',
    answer:
      "Simply drag and drop your PDF or image files into the upload area above, arrange the files in your desired order, and click 'Merge all'. Your combined PDF is processed in seconds and ready to download.",
  },
  {
    question: 'Are my uploaded files safe and private?',
    answer:
      'Absolutely. All merging and file manipulation happens entirely inside your local browser via client-side memory buffers. Your documents, contracts, and confidential files are never transmitted to external servers.',
  },
  {
    question: 'Can I merge JPG and PNG images with PDFs?',
    answer:
      'Yes. Our built-in rasterizer automatically converts JPG, JPEG, and PNG images into standardized PDF pages, allowing you to seamlessly interleave photos, scans, and documents.',
  },
  {
    question: 'Can I delete, rotate, or reorder pages?',
    answer:
      'Yes! Before merging, you can freely drag to reorder documents, rotate pages in 90° increments, and remove unwanted items with a single click.',
  },
  {
    question: 'Will the merged document keep its original quality?',
    answer:
      'Yes. All fonts, embedded vector graphics, forms, metadata, and high-resolution images are preserved according to ISO 32000-2 specifications without lossy compression or quality loss.',
  },
  {
    question: 'Can I merge PDFs on mobile devices?',
    answer:
      'Yes, our tool is fully responsive and optimized for touch devices. You can merge PDFs directly in Safari on iOS or Chrome on Android without installing any app.',
  },
];

export const FAQ: React.FC<FAQProps> = ({ onNavigateContact }) => {
  // First item open by default for immediate preview, matching design
  const [openIndices, setOpenIndices] = useState<number[]>([0]);
  const [siteConfig, setSiteConfig] = useState(() => getSiteConfig());

  useEffect(() => {
    const handleUpdate = () => {
      setSiteConfig(getSiteConfig());
    };
    window.addEventListener('siteConfigUpdated', handleUpdate);
    return () => window.removeEventListener('siteConfigUpdated', handleUpdate);
  }, []);

  const supportEmail = siteConfig?.supportEmail || 'Support@verpdf.com';

  const toggleItem = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleAskUs = () => {
    if (onNavigateContact) {
      onNavigateContact();
    } else {
      window.location.href = `mailto:${supportEmail}`;
    }
  };

  return (
    <section id="faq" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      {/* 1. Pill Badge & Section Header */}
      <div className="text-center mb-12 sm:mb-14">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-gray-200/90 bg-white shadow-2xs mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
          <span className="text-xs font-bold text-gray-700 tracking-wide">FAQ</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-950 font-['Plus_Jakarta_Sans']">
          Frequently asked questions
        </h2>

        <div className="mt-3.5 text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl mx-auto">
          <p>Quick answers to the questions we get the most.</p>
          <p>
            Can&apos;t find yours? Write to{' '}
            <a
              href={`mailto:${supportEmail}`}
              className="font-semibold text-gray-900 hover:text-black underline underline-offset-2 transition-colors"
            >
              {supportEmail}
            </a>
            .
          </p>
        </div>
      </div>

      {/* 2. Accordion List with Clean Separators */}
      <div className="border-t border-b border-gray-100 divide-y divide-gray-100">
        {FAQ_DATA.map((item, index) => {
          const isOpen = openIndices.includes(index);
          return (
            <div key={index} className="py-5 sm:py-6 transition-colors">
              <button
                type="button"
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between text-left focus:outline-none group cursor-pointer"
                aria-expanded={isOpen}
              >
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-black transition-colors pr-6 font-['Plus_Jakarta_Sans']">
                  {item.question}
                </h3>
                <div className="shrink-0 text-gray-400 group-hover:text-gray-700 transition-colors ml-2">
                  <ChevronDown
                    className={`w-5 h-5 stroke-[2] transition-transform duration-200 ease-out ${
                      isOpen ? 'rotate-180 text-gray-800' : 'text-gray-400'
                    }`}
                  />
                </div>
              </button>

              {isOpen && (
                <div className="pt-3 pr-8 sm:pr-10 text-sm sm:text-base text-gray-600 leading-relaxed animate-in fade-in slide-in-from-top-1 duration-150">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 3. Bottom Support Box with Dashed Border */}
      <div className="mt-12 sm:mt-16 rounded-3xl border border-dashed border-gray-200/90 bg-white/50 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-5 transition-all">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-full bg-[#111827] text-white flex items-center justify-center shrink-0 shadow-sm">
            <MessageCircle className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <h4 className="text-base font-bold text-gray-950 font-['Plus_Jakarta_Sans']">
              Still have a question?
            </h4>
            <p className="text-sm text-gray-500">
              We reply within four business hours.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAskUs}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111827] hover:bg-black text-white text-sm font-semibold transition-all shrink-0 shadow-sm hover:shadow cursor-pointer active:scale-98"
        >
          <span>Ask us anything</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
