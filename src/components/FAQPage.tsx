import React, { useState, useEffect } from 'react';
import { Minus, Plus, ArrowRight } from 'lucide-react';
import { FAQItem } from '../types';
import { getSiteConfig } from '../services/siteConfigService';

interface FAQPageProps {
  onGoToMerge: () => void;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: 'Is PDF free to use for merging PDFs?',
    answer:
      "Yes, PDF offers free PDF merging. Simply drag and drop or upload multiple PDF files, then arrange them directly in the dropdown before merging. Files can be combined instantly using PDF's desktop app, with free access to basic PDF merging features.",
  },
  {
    question: 'How do I use PDF?',
    answer:
      "Simply upload your PDF documents using our drag-and-drop tool, arrange the files in your desired order, and click 'Merge all'. You can then instantly preview or download the combined PDF to your computer or mobile device.",
  },
  {
    question: 'Can I merge PDFs on mobile?',
    answer:
      'Yes, PDF is fully responsive and optimized for mobile devices. You can upload and merge documents directly through your Safari or Chrome mobile browser on iPhone, iPad, and Android without installing third-party applications.',
  },
  {
    question: 'Can I merge multiple PDF files at once?',
    answer:
      'Yes! There is no restriction on combining 2, 5, 10 or more documents at once. Select all your files in one go, arrange the sequence, and stitch them into a single file.',
  },
  {
    question: 'Can I delete and reorder pages after I merge files?',
    answer:
      'Yes. Our interactive arranger lets you adjust document order, remove redundant pages or files, and rotate orientations in 90-degree steps prior to generating the combined document.',
  },
  {
    question: 'Can I merge a JPG with a PDF?',
    answer:
      'Yes! PDF has built-in image rasterization support. You can combine JPG, JPEG, and PNG images alongside regular PDF documents, and they will be seamlessly converted into standard PDF pages.',
  },
  {
    question: 'Will the merged PDF keep its original formatting?',
    answer:
      'Yes. All fonts, embedded vector graphics, tables, interactive form fields, metadata, and high-definition layouts from your original files remain untouched and crisp.',
  },
  {
    question: 'Are my uploaded files safe and private?',
    answer:
      'Absolutely. All processing occurs locally in your web browser memory. Documents are never stored or uploaded to third-party cloud servers, ensuring strict privacy and confidentiality.',
  },
  {
    question: 'Can I preview the merged document before downloading?',
    answer:
      'Yes. We provide a full-screen interactive preview modal so you can inspect every page, verify orientation, and ensure completeness before downloading.',
  },
  {
    question: 'How does merging PDFs with Google Drive work?',
    answer:
      'You can select files stored in Google Drive directly within our tool, combine them without downloading them locally first, and sync the result back to your preferred cloud folder.',
  },
];

export const FAQPage: React.FC<FAQPageProps> = ({ onGoToMerge }) => {
  // First item open by default matching screenshots
  const [openIndices, setOpenIndices] = useState<number[]>([0]);
  const [siteConfig, setSiteConfig] = useState(() => getSiteConfig());

  useEffect(() => {
    const handleUpdate = () => {
      setSiteConfig(getSiteConfig());
    };
    window.addEventListener('siteConfigUpdated', handleUpdate);
    return () => window.removeEventListener('siteConfigUpdated', handleUpdate);
  }, []);

  const supportEmail = siteConfig?.supportEmail || 'voskvisa@gmail.com';

  const toggleItem = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Header matching Screenshot */}
      <div className="text-center mb-14 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-950 font-['Plus_Jakarta_Sans']">
          Frequently asked questions
        </h1>
        <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Quick answers to questions you may have. Can&apos;t find what you&apos;re looking for? Check our answers below or email us directly at{' '}
          <a
            href={`mailto:${supportEmail}`}
            className="text-gray-950 font-semibold underline underline-offset-4 hover:text-black transition-colors"
          >
            {supportEmail}
          </a>
        </p>
      </div>

      {/* Accordion List matching Screenshot */}
      <div className="divide-y divide-gray-200">
        {FAQ_DATA.map((item, index) => {
          const isOpen = openIndices.includes(index);
          return (
            <div key={index} className="py-6 sm:py-7">
              <button
                type="button"
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between text-left focus:outline-hidden group cursor-pointer"
                aria-expanded={isOpen}
              >
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-black transition-colors pr-6 font-['Plus_Jakarta_Sans']">
                  {item.question}
                </h2>
                <div className="shrink-0 text-gray-800 ml-2">
                  {isOpen ? (
                    <Minus className="w-5 h-5 stroke-[2]" />
                  ) : (
                    <Plus className="w-5 h-5 stroke-[2]" />
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="pt-4 pr-12 text-sm sm:text-base text-gray-600 leading-relaxed animate-in fade-in slide-in-from-top-1 duration-150">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action to Return to Merger */}
      <div className="text-center pt-14 sm:pt-16">
        <button
          type="button"
          onClick={onGoToMerge}
          className="inline-flex items-center px-7 py-3 rounded-full bg-[#111827] hover:bg-black text-white text-sm font-semibold shadow-xs transition-all cursor-pointer"
        >
          Open the Merger
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};
