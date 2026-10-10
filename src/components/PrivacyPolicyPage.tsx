import React, { useEffect, useState } from 'react';

export const PrivacyPolicyPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('data-we-collect');

  const sections = [
    { id: 'data-we-collect', label: 'Data We Collect' },
    { id: 'how-we-use-your-data', label: 'How We Use Your Data' },
    { id: 'data-sharing', label: 'Data Sharing' },
    { id: 'data-retention', label: 'Data Retention' },
    { id: 'your-rights', label: 'Your Rights' },
    { id: 'contact', label: 'Contact' },
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
        {/* Left Sticky Sidebar */}
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

        {/* Right Main Content Column */}
        <article className="lg:col-span-9 space-y-12 text-sm sm:text-[15px] text-gray-600 leading-relaxed max-w-2xl">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-950 font-['Plus_Jakarta_Sans']">
              Privacy Policy
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-gray-900 font-['Plus_Jakarta_Sans']">
              Last updated: May 10, 2026
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              This policy describes how MergePDF collects, uses, and protects your personal information and documents when you use our service.
            </p>
          </div>

          {/* Section 1: Data We Collect */}
          <section id="data-we-collect" className="space-y-3 pt-2">
            <h2 className="text-base sm:text-lg font-bold text-gray-950 font-['Plus_Jakarta_Sans']">
              1. Data We Collect
            </h2>
            <p className="text-gray-800 font-medium">
              When you use MergePDF, we collect the minimum data necessary to provide the service:
            </p>
            <ul className="space-y-2.5 pl-1">
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>
                  <strong className="text-gray-900 font-medium">Account data:</strong> MergePDF does not require an account to merge PDF documents. If you contact support, we collect your email address solely to reply to your inquiry.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>
                  <strong className="text-gray-900 font-medium">Usage data:</strong> We log zero document filenames, text strings, or document metadata. All file parsing occurs transiently in your browser memory.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>
                  <strong className="text-gray-900 font-medium">Document &amp; image data:</strong> Files you upload are processed entirely in client-side memory using WebAssembly. They are never written to disk or sent to external servers or cloud databases.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>
                  <strong className="text-gray-900 font-medium">Technical data:</strong> Standard non-identifying browser environment capabilities (such as WebAssembly support and screen DPI) are checked locally to format the rendered PDF.
                </span>
              </li>
            </ul>
          </section>

          {/* Section 2: How We Use Your Data */}
          <section id="how-we-use-your-data" className="space-y-3 pt-4">
            <h2 className="text-base sm:text-lg font-bold text-gray-950 font-['Plus_Jakarta_Sans']">
              2. How We Use Your Data
            </h2>
            <p className="text-gray-800 font-medium">
              We use the data we collect exclusively to:
            </p>
            <ul className="space-y-2.5 pl-1">
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>Operate and improve the MergePDF client engine</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>Combine, reorder, and rotate documents directly on your device</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>Provide immediate in-browser document previews and downloads</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>Investigate and prevent security vulnerabilities</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>Respond to user-initiated support requests</span>
              </li>
            </ul>
            <p className="pt-2 text-gray-700">
              We do not use your data for advertising, profiling, AI training, or any purpose beyond providing this merging utility.
            </p>
          </section>

          {/* Section 3: Data Sharing */}
          <section id="data-sharing" className="space-y-3 pt-4">
            <h2 className="text-base sm:text-lg font-bold text-gray-950 font-['Plus_Jakarta_Sans']">
              3. Data Sharing
            </h2>
            <p className="text-gray-800 font-medium">
              We do not sell, rent, or trade your personal data. We share data only with:
            </p>
            <ul className="space-y-2.5 pl-1">
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>
                  <strong className="text-gray-900 font-medium">Zero third-party cloud processors:</strong> Your documents are never sent across the network. All merging and vector transformations occur in client runtime.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>
                  <strong className="text-gray-900 font-medium">Payment processors:</strong> If you choose enterprise API licensing, billing details are processed securely by PCI-compliant providers. We do not store card numbers.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>
                  <strong className="text-gray-900 font-medium">Legal requirements:</strong> Because we do not store your files on servers, we hold zero user document content to disclose under any subpoena or court request.
                </span>
              </li>
            </ul>
          </section>

          {/* Section 4: Data Retention */}
          <section id="data-retention" className="space-y-3 pt-4">
            <h2 className="text-base sm:text-lg font-bold text-gray-950 font-['Plus_Jakarta_Sans']">
              4. Data Retention
            </h2>
            <ul className="space-y-2.5 pl-1">
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>
                  <strong className="text-gray-900 font-medium">Documents:</strong> Never stored — discarded from memory immediately after processing or when closing your browser session.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>
                  <strong className="text-gray-900 font-medium">Temporary blobs:</strong> Cleaned up automatically by browser garbage collection when you navigate away.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>
                  <strong className="text-gray-900 font-medium">Contact data:</strong> Support emails are deleted within 30 days of resolution.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>
                  <strong className="text-gray-900 font-medium">Telemetry logs:</strong> Retained for 0 days. We operate with zero user tracking scripts.
                </span>
              </li>
            </ul>
          </section>

          {/* Section 5: Your Rights */}
          <section id="your-rights" className="space-y-3 pt-4">
            <h2 className="text-base sm:text-lg font-bold text-gray-950 font-['Plus_Jakarta_Sans']">
              5. Your Rights
            </h2>
            <p className="text-gray-800 font-medium">
              Depending on your jurisdiction (GDPR, CCPA, HIPAA), you have the right to:
            </p>
            <ul className="space-y-2.5 pl-1">
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>Access personal data we hold about you (e.g. support emails)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>Request correction of inaccurate information</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>Request deletion of your data (&quot;right to be forgotten&quot;)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>Export your data in a portable format</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>Withdraw consent for any non-essential processing</span>
              </li>
            </ul>
            <p className="pt-2 text-gray-700">
              To exercise any of these rights, contact us at <a href="mailto:Support@verpdf.com" className="text-gray-950 font-medium underline underline-offset-2">Support@verpdf.com</a>. We will respond within 30 days.
            </p>
          </section>

          {/* Section 6: Contact */}
          <section id="contact" className="space-y-3 pt-6 border-t border-gray-100">
            <h2 className="text-base sm:text-lg font-bold text-gray-950 font-['Plus_Jakarta_Sans']">
              6. Contact
            </h2>
            <p className="text-gray-800 font-medium">
              For privacy-related questions or to exercise your rights, contact us at:
            </p>
            <p>
              <a
                href="mailto:Support@verpdf.com"
                className="text-gray-950 font-medium hover:underline"
              >
                Support@verpdf.com
              </a>
            </p>
            <div className="pt-2 text-gray-600 text-xs sm:text-sm">
              <p>Or write to:</p>
              <p className="text-gray-900 font-medium">MergePDF, Privacy &amp; Data Governance Team</p>
              <p>San Francisco, CA, United States</p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
};
