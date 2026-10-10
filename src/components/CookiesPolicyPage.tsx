import React, { useEffect, useState } from 'react';

export const CookiesPolicyPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('what-are-cookies');

  const sections = [
    { id: 'what-are-cookies', label: 'What Are Cookies' },
    { id: 'how-we-use-cookies', label: 'How We Use Cookies' },
    { id: 'types-of-cookies', label: 'Types of Cookies We Use' },
    { id: 'local-browser-storage', label: 'Local Browser Storage' },
    { id: 'third-party-technologies', label: 'Third-Party Technologies' },
    { id: 'managing-cookies', label: 'Managing Cookie Preferences' },
    { id: 'updates-to-policy', label: 'Updates to This Policy' },
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
        {/* Left Sticky Sidebar matching Image Layout */}
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

        {/* Right Main Content Column matching Image Layout */}
        <article className="lg:col-span-9 space-y-12 text-sm sm:text-[15px] text-gray-600 leading-relaxed max-w-2xl">
          {/* Header */}
          <div className="space-y-4">
            <p className="text-xs sm:text-sm font-semibold text-gray-900 font-['Plus_Jakarta_Sans']">
              Last updated: May 10, 2026
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Please read this Cookies Policy carefully to understand how MergePDF handles cookies and local storage.
            </p>
          </div>

          {/* Section 1: What Are Cookies */}
          <section id="what-are-cookies" className="space-y-3 pt-2">
            <p>
              Cookies are small text files that are stored on your computer, smartphone, or tablet when you visit a website. They allow the website to recognize your device and remember specific preferences and session states.
            </p>
            <p>
              Because MergePDF is engineered as a client-side utility running WebAssembly in your browser, we minimize the use of traditional persistent tracking cookies.
            </p>
          </section>

          {/* Section 2: How We Use Cookies */}
          <section id="how-we-use-cookies" className="space-y-3 pt-4">
            <p className="text-gray-800 font-medium">
              We use cookies and equivalent browser storage mechanisms strictly to:
            </p>
            <ul className="space-y-2.5 pl-1">
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>Enable core website operations and maintain navigation state</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>Remember essential user interface preferences, such as selected layout modes</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>Ensure site security and prevent automated abusive request bursts</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>Measure aggregate, anonymized technical performance without user profiling</span>
              </li>
            </ul>
          </section>

          {/* Section 3: Types of Cookies We Use */}
          <section id="types-of-cookies" className="space-y-3 pt-4">
            <p className="text-gray-800 font-medium">
              Our site categorizes cookies into the following functional groups:
            </p>
            <ul className="space-y-2.5 pl-1">
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>
                  <strong className="text-gray-900 font-medium">Strictly Necessary Cookies:</strong> Required for the technical operation of the application. Without these, basic features like document upload slots and download triggers cannot function.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>
                  <strong className="text-gray-900 font-medium">Functional Storage:</strong> Used to temporarily retain local settings, such as page rotation preferences before file compilation.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>
                  <strong className="text-gray-900 font-medium">Zero Advertising Cookies:</strong> MergePDF does not use behavioral advertising cookies, retargeting pixels, or social media tracking beacons.
                </span>
              </li>
            </ul>
          </section>

          {/* Section 4: Local Browser Storage */}
          <section id="local-browser-storage" className="space-y-3 pt-4">
            <p>
              In addition to cookies, modern web applications utilize web storage APIs like <code className="text-xs bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded font-mono">localStorage</code> and <code className="text-xs bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded font-mono">sessionStorage</code>.
            </p>
            <p>
              When you organize or merge PDFs, your documents are held in transient browser memory (RAM and temporary Object URLs). This data is isolated entirely to your local browser environment and is automatically purged when you refresh or close your browser tab.
            </p>
          </section>

          {/* Section 5: Third-Party Technologies */}
          <section id="third-party-technologies" className="space-y-3 pt-4">
            <p className="text-gray-800 font-medium">
              We maintain a strict policy regarding third-party scripts:
            </p>
            <ul className="space-y-2.5 pl-1">
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>No third-party ad networks or data brokers have access to your browsing session</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>Font files and static vector assets are served directly from fast, privacy-preserving CDNs</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>We do not correlate your IP address with individual document contents</span>
              </li>
            </ul>
          </section>

          {/* Section 6: Managing Cookie Preferences */}
          <section id="managing-cookies" className="space-y-3 pt-4">
            <p>
              You have full control over cookies and local storage. Most web browsers allow you to modify your settings to block cookies or notify you when a cookie is placed:
            </p>
            <ul className="space-y-2.5 pl-1">
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>In Google Chrome: Go to Settings &gt; Privacy and Security &gt; Third-party cookies</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>In Mozilla Firefox: Go to Settings &gt; Privacy &amp; Security &gt; Cookies and Site Data</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-400 shrink-0">•</span>
                <span>In Apple Safari: Go to Settings &gt; Safari &gt; Advanced &gt; Block All Cookies</span>
              </li>
            </ul>
            <p className="pt-1">
              Please note that disabling all local storage mechanisms may prevent the browser from saving document previews or running client-side assembly.
            </p>
          </section>

          {/* Section 7: Updates to This Policy */}
          <section id="updates-to-policy" className="space-y-3 pt-6 border-t border-gray-100">
            <p>
              We may periodically revise this Cookies Policy to reflect changes in legal requirements, browser security standards, or software updates. Any revisions will be published on this page with an updated &quot;Last updated&quot; date.
            </p>
            <p>
              For questions regarding our cookie practices, you may reach our compliance team at{' '}
              <a
                href="mailto:Support@verpdf.com"
                className="text-gray-950 font-medium hover:underline"
              >
                Support@verpdf.com
              </a>.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
};
