import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { FAQItem } from '../types';

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
    question: 'How does merging PDFs with Google Drive work?',
    answer:
      'You can select files stored in Google Drive directly within our tool, combine them without downloading them locally first, and sync the result back to your preferred cloud folder.',
  },
];

export const FAQ: React.FC = () => {
  // First item open by default matching screenshot 1
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Section Header matching Screenshot 1 */}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-950 text-center mb-16 font-['Plus_Jakarta_Sans']">
        Frequently asked questions
      </h2>

      {/* Accordion List */}
      <div className="divide-y divide-gray-200">
        {FAQ_DATA.map((item, index) => {
          const isOpen = openIndices.includes(index);
          return (
            <div key={index} className="py-6 sm:py-7">
              <button
                type="button"
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between text-left focus:outline-hidden group"
                aria-expanded={isOpen}
              >
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-black transition-colors pr-6">
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
                <div className="pt-4 pr-12 text-sm sm:text-base text-gray-600 leading-relaxed animate-in fade-in slide-in-from-top-1 duration-150">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
