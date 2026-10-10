import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';

interface AboutPageProps {
  onGoToMerge: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onGoToMerge }) => {
  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-16 animate-in fade-in duration-200">
      {/* 1. Header & Lead */}
      <div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-950 mb-5 font-['Plus_Jakarta_Sans']">
          About MergePDF
        </h1>
        <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed max-w-3xl">
          We built MergePDF because the hardest part of managing documents shouldn&apos;t be combining them — it&apos;s keeping your files private, fast, and seamless. We wanted to make that effortless.
        </p>
      </div>

      {/* 2. Our Mission Card */}
      <div className="bg-[#fcfbf9] border border-[#f1ece5] rounded-3xl p-8 sm:p-10 shadow-2xs">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-950 mb-3 font-['Plus_Jakarta_Sans']">
          Our Mission
        </h2>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          To give every user — student, designer, legal professional, or enterprise team — the ability to combine, organize, and assemble documents with zero server data exposure. We believe the gap between &quot;I have multiple files to combine&quot; and &quot;I have a pristine merged PDF ready to share&quot; should be zero seconds.
        </p>
      </div>

      {/* 3. What We Stand For */}
      <div className="space-y-5">
        <h2 className="text-2xl font-bold text-gray-950 font-['Plus_Jakarta_Sans']">
          What We Stand For
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Fast (Vibrant Indigo / Purple) */}
          <div className="bg-[#5947fd] text-white rounded-3xl p-7 shadow-xs flex flex-col justify-between min-h-[190px]">
            <div>
              <h3 className="text-xl font-bold mb-3 font-['Plus_Jakarta_Sans']">
                Fast
              </h3>
              <p className="text-sm text-white/90 leading-relaxed font-normal">
                We obsess over latency. Documents combine instantly inside client memory in under 2 seconds, every time.
              </p>
            </div>
          </div>

          {/* Card 2: Private (Vibrant Magenta / Orchid) */}
          <div className="bg-[#cb3bf7] text-white rounded-3xl p-7 shadow-xs flex flex-col justify-between min-h-[190px]">
            <div>
              <h3 className="text-xl font-bold mb-3 font-['Plus_Jakarta_Sans']">
                Private
              </h3>
              <p className="text-sm text-white/90 leading-relaxed font-normal">
                No black-box server uploads. Your confidential files remain strictly on your machine with 100% in-browser processing.
              </p>
            </div>
          </div>

          {/* Card 3: Accurate (Vibrant Orange / Coral) */}
          <div className="bg-[#ff6433] text-white rounded-3xl p-7 shadow-xs flex flex-col justify-between min-h-[190px]">
            <div>
              <h3 className="text-xl font-bold mb-3 font-['Plus_Jakarta_Sans']">
                Accurate
              </h3>
              <p className="text-sm text-white/90 leading-relaxed font-normal">
                We preserve vector sharpness, exact typography, color profiles, and formatting without lossy compression.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Built With */}
      <div className="space-y-5">
        <h2 className="text-2xl font-bold text-gray-950 font-['Plus_Jakarta_Sans']">
          Built With
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Item 1 */}
          <div className="bg-[#fcfbf9] border border-[#f1ece5] rounded-2xl p-4.5 flex items-start space-x-3 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-gray-400 mt-1.5 shrink-0" />
            <div>
              <h3 className="text-sm font-bold text-gray-900">React 19</h3>
              <p className="text-xs text-gray-500 mt-0.5">UI library</p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="bg-[#fcfbf9] border border-[#f1ece5] rounded-2xl p-4.5 flex items-start space-x-3 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-gray-400 mt-1.5 shrink-0" />
            <div>
              <h3 className="text-sm font-bold text-gray-900">TypeScript</h3>
              <p className="text-xs text-gray-500 mt-0.5">Type-safe code</p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="bg-[#fcfbf9] border border-[#f1ece5] rounded-2xl p-4.5 flex items-start space-x-3 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-gray-400 mt-1.5 shrink-0" />
            <div>
              <h3 className="text-sm font-bold text-gray-900">Tailwind CSS v4</h3>
              <p className="text-xs text-gray-500 mt-0.5">Modern styling engine</p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="bg-[#fcfbf9] border border-[#f1ece5] rounded-2xl p-4.5 flex items-start space-x-3 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-gray-400 mt-1.5 shrink-0" />
            <div>
              <h3 className="text-sm font-bold text-gray-900">pdf-lib Engine</h3>
              <p className="text-xs text-gray-500 mt-0.5">Client-side PDF manipulation</p>
            </div>
          </div>

          {/* Item 5 */}
          <div className="bg-[#fcfbf9] border border-[#f1ece5] rounded-2xl p-4.5 flex items-start space-x-3 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-gray-400 mt-1.5 shrink-0" />
            <div>
              <h3 className="text-sm font-bold text-gray-900">HTML5 Streams</h3>
              <p className="text-xs text-gray-500 mt-0.5">In-browser array buffering</p>
            </div>
          </div>

          {/* Item 6 */}
          <div className="bg-[#fcfbf9] border border-[#f1ece5] rounded-2xl p-4.5 flex items-start space-x-3 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-gray-400 mt-1.5 shrink-0" />
            <div>
              <h3 className="text-sm font-bold text-gray-900">ISO 32000-2</h3>
              <p className="text-xs text-gray-500 mt-0.5">Standard document compliance</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. The Team */}
      <div className="space-y-5">
        <h2 className="text-2xl font-bold text-gray-950 font-['Plus_Jakarta_Sans']">
          The Team
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Member 1 */}
          <div className="bg-[#fcfbf9] border border-[#f1ece5] rounded-3xl p-8 flex flex-col items-center text-center shadow-2xs">
            <div className="w-14 h-14 rounded-full bg-gray-200/80 text-gray-800 flex items-center justify-center font-bold text-lg mb-4">
              A
            </div>
            <h3 className="text-base font-bold text-gray-950 font-['Plus_Jakarta_Sans']">
              Alex Chen
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">Founder &amp; Engineer</p>
          </div>

          {/* Member 2 */}
          <div className="bg-[#fcfbf9] border border-[#f1ece5] rounded-3xl p-8 flex flex-col items-center text-center shadow-2xs">
            <div className="w-14 h-14 rounded-full bg-gray-200/80 text-gray-800 flex items-center justify-center font-bold text-lg mb-4">
              S
            </div>
            <h3 className="text-base font-bold text-gray-950 font-['Plus_Jakarta_Sans']">
              Sara Kim
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">Document Systems &amp; Security</p>
          </div>

          {/* Member 3 */}
          <div className="bg-[#fcfbf9] border border-[#f1ece5] rounded-3xl p-8 flex flex-col items-center text-center shadow-2xs">
            <div className="w-14 h-14 rounded-full bg-gray-200/80 text-gray-800 flex items-center justify-center font-bold text-lg mb-4">
              J
            </div>
            <h3 className="text-base font-bold text-gray-950 font-['Plus_Jakarta_Sans']">
              James O.
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">Design &amp; UX</p>
          </div>
        </div>
      </div>

      {/* 6. Come merge with us CTA Card */}
      <div className="bg-[#fcfbf9] border border-[#f1ece5] rounded-3xl p-10 sm:p-14 text-center space-y-6 shadow-2xs">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 mb-2 font-['Plus_Jakarta_Sans']">
            Come merge with us
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Try the merge tool or get in touch.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onGoToMerge}
            className="inline-flex items-center px-6 py-3 rounded-full bg-[#111827] hover:bg-black text-white text-sm font-semibold shadow-sm hover:shadow transition-all"
          >
            Try the Merger
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
          <a
            href="mailto:Support@verpdf.com"
            className="inline-flex items-center px-6 py-3 rounded-full bg-gray-200/70 hover:bg-gray-200 text-gray-800 text-sm font-semibold transition-all"
          >
            <Mail className="w-4 h-4 mr-2 text-gray-600" />
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};
