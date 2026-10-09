import React, { useEffect, useState } from 'react';

export const TermsOfServicePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('acceptance-of-terms');

  const sections = [
    { id: 'acceptance-of-terms', label: 'Acceptance of Terms' },
    { id: 'use-of-the-service', label: 'Use of the Service' },
    { id: 'user-content', label: 'User Content' },
    { id: 'prohibited-uses', label: 'Prohibited Uses' },
    { id: 'termination', label: 'Termination' },
    { id: 'limitation-of-liability', label: 'Limitation of Liability' },
    { id: 'governing-law', label: 'Governing Law' },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto animate-in fade-in duration-200">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Sticky Sidebar matching Policy Layout */}
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-28 space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block font-['Plus_Jakarta_Sans']">
              On this page
            </span>
            <nav className="space-y-2">
              {sections.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left text-xs sm:text-sm font-medium transition-colors py-1 ${
                      isActive
                        ? 'text-gray-950 font-bold'
                        : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Right Main Content Column matching Layout */}
        <article className="lg:col-span-9 space-y-12 text-sm sm:text-[15px] text-gray-600 leading-relaxed max-w-2xl">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-950 font-['Plus_Jakarta_Sans']">
              Terms of Service
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-gray-900 font-['Plus_Jakarta_Sans']">
              Last updated: May 10, 2026
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Please read these Terms of Service carefully before using MergePDF.
            </p>
          </div>

          {/* Section 1: Acceptance of Terms */}
          <section id="acceptance-of-terms" className="space-y-3 pt-2">
            <h2 className="text-base sm:text-lg font-bold text-gray-950 font-['Plus_Jakarta_Sans']">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using MergePDF (the &quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, do not use the Service.
            </p>
            <p>
              We may update these Terms from time to time. Continued use of the Service after changes constitutes acceptance of the new Terms. We will notify users of material changes via updates to this document.
            </p>
          </section>

          {/* Section 2: Use of the Service */}
          <section id="use-of-the-service" className="space-y-3 pt-4">
            <h2 className="text-base sm:text-lg font-bold text-gray-950 font-['Plus_Jakarta_Sans']">
              2. Use of the Service
            </h2>
            <p className="text-gray-800 font-medium">
              You may use the Service only for lawful purposes and in accordance with these Terms. You agree not to:
            </p>
            <ul className="space-y-2.5 pl-1">
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>Use the Service in any way that violates any applicable local, national, or international law or regulation</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>Upload files or documents that you do not have the right to use or that infringe any third party&apos;s intellectual property rights</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>Upload documents containing illegal content, malware, or malicious code</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>Attempt to gain unauthorized access to any part of the Service or its related systems</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>Use automated tools to access the Service at a rate that exceeds reasonable human usage</span>
              </li>
            </ul>
          </section>

          {/* Section 3: User Content */}
          <section id="user-content" className="space-y-3 pt-4">
            <h2 className="text-base sm:text-lg font-bold text-gray-950 font-['Plus_Jakarta_Sans']">
              3. User Content
            </h2>
            <p>
              You retain all rights, ownership, and copyright to documents and images you upload. Because MergePDF processes all files locally within your web browser using client-side WebAssembly, you grant MergePDF only the temporary, non-exclusive technical permission required to assemble your files on your device.
            </p>
            <p>
              We do not claim ownership over your documents or merged outputs. Merged documents are generated directly on your local device and returned to you without restrictions on use.
            </p>
          </section>

          {/* Section 4: Prohibited Uses */}
          <section id="prohibited-uses" className="space-y-3 pt-4">
            <h2 className="text-base sm:text-lg font-bold text-gray-950 font-['Plus_Jakarta_Sans']">
              4. Prohibited Uses
            </h2>
            <p className="text-gray-800 font-medium">
              You may not use MergePDF to:
            </p>
            <ul className="space-y-2.5 pl-1">
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>Interfere with, disrupt, or place an unreasonable load on the Service or its network infrastructure</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>Circumvent or bypass rate limits, access controls, or security barriers</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>Resell or sublicense access to the Service without our express written permission</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>Scrape, crawl, or systematically extract data from the Service</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>Impersonate any person or entity or misrepresent your affiliation with any person or entity</span>
              </li>
            </ul>
          </section>

          {/* Section 5: Termination */}
          <section id="termination" className="space-y-3 pt-4">
            <h2 className="text-base sm:text-lg font-bold text-gray-950 font-['Plus_Jakarta_Sans']">
              5. Termination
            </h2>
            <p>
              We may suspend or terminate your access to the Service at any time, with or without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
            </p>
            <p>
              Because MergePDF does not require an account for standard document combining, you may discontinue use of the Service at any time simply by navigating away or closing your browser.
            </p>
          </section>

          {/* Section 6: Limitation of Liability */}
          <section id="limitation-of-liability" className="space-y-4 pt-4 uppercase text-xs sm:text-xs text-gray-500 tracking-wide font-mono leading-relaxed">
            <h2 className="text-base sm:text-lg font-bold text-gray-950 font-['Plus_Jakarta_Sans'] normal-case tracking-normal font-sans">
              6. Limitation of Liability
            </h2>
            <p>
              THE SERVICE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, MERGEPDF DISCLAIMS ALL WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p>
              IN NO EVENT SHALL MERGEPDF BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING FROM YOUR USE OF THE SERVICE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
          </section>

          {/* Section 7: Governing Law */}
          <section id="governing-law" className="space-y-3 pt-6 border-t border-gray-100">
            <h2 className="text-base sm:text-lg font-bold text-gray-950 font-['Plus_Jakarta_Sans']">
              7. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
            </p>
            <p>
              Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in San Francisco, California.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
};
