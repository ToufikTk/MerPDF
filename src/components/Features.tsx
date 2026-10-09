import React from 'react';

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="max-w-3xl mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold tracking-tight text-gray-950 mb-3 font-['Plus_Jakarta_Sans']">
          Merging PDFs made simple
        </h2>
        <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed">
          Merge PDFs effortlessly with PDF&apos;s free tool. Combine multiple files into one organized document in just a few clicks.
        </p>
      </div>

      {/* 6 Feature Items Grid matching Screenshot 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
        {/* Feature 1 */}
        <div className="flex flex-col items-start">
          <div className="w-16 h-16 rounded-full bg-[#e8f7f6] flex items-center justify-center mb-6">
            <svg
              className="w-8 h-8 text-[#0a5255]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <rect x="7" y="3" width="13" height="13" rx="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 8H3a1 1 0 00-1 1v11a1 1 0 001 1h11a1 1 0 001-1v-1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3 font-['Plus_Jakarta_Sans']">
            Combine PDFs in seconds
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed font-normal">
            Drag and drop multiple files, arrange them directly in the dropdown, and merge everything into a single PDF in seconds. Keep documents organized and ready to share with a fast, hassle-free workflow.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-start">
          <div className="w-16 h-16 rounded-full bg-[#e8f7f6] flex items-center justify-center mb-6">
            <svg
              className="w-8 h-8 text-[#0a5255]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M4 17L9 7L14 7L9 17H4Z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 7L19 17H9" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15 17L20 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3 font-['Plus_Jakarta_Sans']">
            Works seamlessly with Google Drive
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed font-normal">
            Import files straight from Google Drive, merge them, and save back instantly. Stay productive without leaving your workspace. Access and combine documents from your cloud storage with seamless Google Workspace connectivity.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-start">
          <div className="w-16 h-16 rounded-full bg-[#e8f7f6] flex items-center justify-center mb-6">
            <svg
              className="w-8 h-8 text-[#0a5255]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <rect x="5" y="11" width="14" height="10" rx="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 11V7a4 4 0 018 0v4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3 font-['Plus_Jakarta_Sans']">
            Enterprise-level security for your files
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed font-normal">
            Your documents stay safe with enterprise-grade encryption. Every file is protected and automatically deleted after processing. Industry-standard security protocols ensure your sensitive information remains confidential throughout the merging process.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="flex flex-col items-start">
          <div className="w-16 h-16 rounded-full bg-[#e8f7f6] flex items-center justify-center mb-6">
            <svg
              className="w-8 h-8 text-[#0a5255]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <rect x="2" y="5" width="14" height="11" rx="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18 10V18a1 1 0 01-1 1h-7" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="15" y="9" width="7" height="11" rx="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3 font-['Plus_Jakarta_Sans']">
            Merge PDFs on any device
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed font-normal">
            Combine multiple PDFs into a single, organized file on Mac, Windows, Android, iPhone or Linux — all from your browser. No matter which system you use, you can merge files instantly and keep everything in one easy-to-share document.
          </p>
        </div>

        {/* Feature 5 */}
        <div className="flex flex-col items-start">
          <div className="w-16 h-16 rounded-full bg-[#e8f7f6] flex items-center justify-center mb-6">
            <svg
              className="w-8 h-8 text-[#0a5255]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="4" y="4" width="16" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3 font-['Plus_Jakarta_Sans']">
            Full control over your pages
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed font-normal">
            Take control of your PDFs. Rearrange pages, split large files, or rotate pages to create the perfect document order. Fine-tune your merged documents with precision page management tools for professional results.
          </p>
        </div>

        {/* Feature 6 */}
        <div className="flex flex-col items-start">
          <div className="w-16 h-16 rounded-full bg-[#e8f7f6] flex items-center justify-center mb-6">
            <svg
              className="w-8 h-8 text-[#0a5255]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M2 10C5.5 6.5 18.5 6.5 22 10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 14C8 11.5 16 11.5 19 14" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8.5 17.5C10.5 16 13.5 16 15.5 17.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="20.5" r="1" fill="currentColor" />
              <path d="M19 5L23 9" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M23 5L19 9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3 font-['Plus_Jakarta_Sans']">
            Works online or offline
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed font-normal">
            No internet? No problem. Merge and edit PDFs offline, and your changes will sync when you reconnect. Continue working seamlessly whether you&apos;re connected or not, with automatic synchronization when you&apos;re back online.
          </p>
        </div>
      </div>
    </section>
  );
};
