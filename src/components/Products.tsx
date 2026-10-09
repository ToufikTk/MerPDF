import React from 'react';

export const Products: React.FC = () => {
  return (
    <section id="products" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold tracking-tight text-gray-950 mb-4 font-['Plus_Jakarta_Sans']">
          Discover PDF&apos;s products
        </h2>
        <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed">
          Collaborate with existing colleagues and onboard new ones with PDF and PDF Sign. Our innovative solutions work great on their own, but they&apos;re even better together.
        </p>
      </div>

      {/* 3 Product Cards Grid matching Screenshot 6 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1: PDF */}
        <div className="bg-white rounded-3xl border border-gray-100 p-3 sm:p-4 shadow-xs hover:shadow-md transition-all flex flex-col">
          {/* Visual Container */}
          <div className="w-full h-52 sm:h-60 rounded-2xl bg-[#dff0ff] flex items-center justify-center mb-6">
            <div className="flex items-center space-x-3">
              <svg viewBox="0 0 32 32" fill="none" className="w-9 h-9 text-gray-950">
                <path
                  d="M6 8L16 3L26 8L16 13L6 8Z"
                  stroke="#111827"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 16L16 21L26 16"
                  stroke="#111827"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 24L16 29L26 24"
                  stroke="#111827"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-2xl sm:text-3xl font-bold text-gray-950 tracking-tight font-['Plus_Jakarta_Sans']">
                PDF
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="px-3 pb-3 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-['Plus_Jakarta_Sans']">
                PDF
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                An easy-to-use PDF editor that stands alone or integrates with Google Workspace.
              </p>
            </div>
            <a
              href="#merge-tool"
              className="inline-block w-fit px-5 py-2.5 border border-gray-900 text-gray-900 rounded-xl text-sm font-semibold hover:bg-gray-900 hover:text-white transition-colors"
            >
              Learn more
            </a>
          </div>
        </div>

        {/* Card 2: PDF Sign */}
        <div className="bg-white rounded-3xl border border-gray-100 p-3 sm:p-4 shadow-xs hover:shadow-md transition-all flex flex-col">
          {/* Visual Container */}
          <div className="w-full h-52 sm:h-60 rounded-2xl bg-[#ede9fe] flex items-center justify-center mb-6">
            <div className="flex items-center space-x-3">
              <svg viewBox="0 0 32 32" fill="none" className="w-9 h-9 text-gray-950">
                <path
                  d="M8 20C5 17 5 12 9 8C13 4 18 5 21 8C24 11 25 16 21 21C18 24 13 25 10 22"
                  stroke="#111827"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M14 11L18 23"
                  stroke="#111827"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-2xl sm:text-3xl font-bold text-gray-950 tracking-tight font-['Plus_Jakarta_Sans']">
                PDF Sign
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="px-3 pb-3 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-['Plus_Jakarta_Sans']">
                PDF Sign
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                A digital signature workflow tool that seals deals with legally-compliant signatures.
              </p>
            </div>
            <a
              href="#pricing"
              className="inline-block w-fit px-5 py-2.5 border border-gray-900 text-gray-900 rounded-xl text-sm font-semibold hover:bg-gray-900 hover:text-white transition-colors"
            >
              Learn more
            </a>
          </div>
        </div>

        {/* Card 3: PDF Sign API */}
        <div className="bg-white rounded-3xl border border-gray-100 p-3 sm:p-4 shadow-xs hover:shadow-md transition-all flex flex-col">
          {/* Visual Container */}
          <div className="w-full h-52 sm:h-60 rounded-2xl bg-[#ede9fe] flex items-center justify-center mb-6 relative">
            <div className="flex items-center space-x-3 relative">
              <svg viewBox="0 0 32 32" fill="none" className="w-9 h-9 text-gray-950">
                <path
                  d="M8 20C5 17 5 12 9 8C13 4 18 5 21 8C24 11 25 16 21 21C18 24 13 25 10 22"
                  stroke="#111827"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M14 11L18 23"
                  stroke="#111827"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
              <div className="flex items-start">
                <span className="text-2xl sm:text-3xl font-bold text-gray-950 tracking-tight font-['Plus_Jakarta_Sans']">
                  PDF Sign
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-700 ml-1.5 -mt-1">
                  API
                </span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="px-3 pb-3 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-['Plus_Jakarta_Sans']">
                PDF Sign API
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                An eSignature API designed to be plugged into your platform with minimal effort.
              </p>
            </div>
            <a
              href="#enterprise"
              className="inline-block w-fit px-5 py-2.5 border border-gray-900 text-gray-900 rounded-xl text-sm font-semibold hover:bg-gray-900 hover:text-white transition-colors"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
