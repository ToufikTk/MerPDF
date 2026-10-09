import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

export const Footer: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState('English');
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const languages = ['English', 'Español', 'Français', 'Deutsch', '日本語', 'Português'];

  return (
    <footer className="bg-white border-t border-gray-100 mt-20">
      {/* SaaS Navigation Columns for Deep SEO Crawlability */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-4">
              Products
            </h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#merge-tool" className="hover:text-black transition-colors">Merge PDF</a></li>
              <li><a href="#products" className="hover:text-black transition-colors">PDF Editor</a></li>
              <li><a href="#products" className="hover:text-black transition-colors">PDF Sign</a></li>
              <li><a href="#products" className="hover:text-black transition-colors">PDF Sign API</a></li>
              <li><a href="#merge-tool" className="hover:text-black transition-colors">Split PDF</a></li>
              <li><a href="#merge-tool" className="hover:text-black transition-colors">Compress PDF</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-4">
              Solutions
            </h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#enterprise" className="hover:text-black transition-colors">Enterprise</a></li>
              <li><a href="#enterprise" className="hover:text-black transition-colors">Small Business</a></li>
              <li><a href="#enterprise" className="hover:text-black transition-colors">Education & Schools</a></li>
              <li><a href="#enterprise" className="hover:text-black transition-colors">Legal & Contracts</a></li>
              <li><a href="#enterprise" className="hover:text-black transition-colors">Healthcare & HIPAA</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-4">
              Capabilities
            </h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#features" className="hover:text-black transition-colors">Google Drive Integration</a></li>
              <li><a href="#features" className="hover:text-black transition-colors">Page Reordering</a></li>
              <li><a href="#features" className="hover:text-black transition-colors">Offline PDF Engine</a></li>
              <li><a href="#features" className="hover:text-black transition-colors">Image to PDF Merge</a></li>
              <li><a href="#features" className="hover:text-black transition-colors">Batch PDF Processing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-4">
              Resources
            </h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#how-it-works" className="hover:text-black transition-colors">How to Merge PDFs</a></li>
              <li><a href="#faq" className="hover:text-black transition-colors">Help Center & FAQ</a></li>
              <li><a href="#enterprise" className="hover:text-black transition-colors">API Documentation</a></li>
              <li><a href="#pricing" className="hover:text-black transition-colors">Pricing & Plans</a></li>
              <li><a href="#status" className="hover:text-black transition-colors">System Status</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-4">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#about" className="hover:text-black transition-colors">About PDF</a></li>
              <li><a href="#security" className="hover:text-black transition-colors">Security & Privacy</a></li>
              <li><a href="#terms" className="hover:text-black transition-colors">Terms of Service</a></li>
              <li><a href="#careers" className="hover:text-black transition-colors">Careers</a></li>
              <li><a href="#contact" className="hover:text-black transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Banner Section matching Screenshot 5 */}
        <div className="pt-8 border-t border-gray-100 flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left: Google Cloud Partner Badge */}
          <div className="flex items-center space-x-6">
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-2 rounded-xl border border-gray-200 bg-white shadow-2xs">
              <svg className="w-6 h-5" viewBox="0 0 32 26" fill="none">
                <path
                  d="M19.5 25H6.5C3 25 0 22 0 18.5C0 15.3 2.3 12.6 5.4 12.1C6.2 5.5 12 0.5 19 0.5C24.8 0.5 29.8 4.2 31.4 9.8C31.6 9.8 31.8 9.8 32 9.8C35.3 9.8 38 12.5 38 15.8C38 19 35.5 21.6 32.3 21.8L19.5 25Z"
                  fill="#4285F4"
                  opacity="0.1"
                />
                {/* Clean Cloud 4-color icon */}
                <path
                  d="M17.5 22H6.5C3.5 22 1 19.5 1 16.5C1 13.8 3 11.5 5.7 11.1C6.4 5.4 11.5 1 17.5 1C22.6 1 27 4.3 28.5 9.2C31.5 9.5 34 12 34 15.1C34 18.2 31.6 20.8 28.5 21.1L17.5 22Z"
                  fill="#4285F4"
                />
                <path
                  d="M6.5 22C3.5 22 1 19.5 1 16.5C1 13.8 3 11.5 5.7 11.1C6.4 8.7 8.1 6.7 10.3 5.5L7.5 14L10 22H6.5Z"
                  fill="#EA4335"
                />
                <path
                  d="M10.3 5.5C12.3 4.4 14.8 3.8 17.5 3.8C20.6 3.8 23.4 4.8 25.6 6.6L20 12L10.3 5.5Z"
                  fill="#FBBC05"
                />
                <path
                  d="M25.6 6.6C26.7 7.5 27.6 8.7 28.2 10.1L20 16L15 22H17.5L28.5 21.1C31.6 20.8 34 18.2 34 15.1C34 13.2 33 11.5 31.5 10.4L25.6 6.6Z"
                  fill="#34A853"
                />
              </svg>
              <div className="flex flex-col text-left">
                <span className="text-[9px] font-medium text-gray-500 leading-tight">Google Cloud</span>
                <span className="text-xs font-bold text-gray-900 leading-tight">Partner</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-600">
              © 2014–2026 PDF Corporation | San Francisco, United States | All rights reserved
            </p>
          </div>

          {/* Right: Socials & Language Picker */}
          <div className="flex items-center space-x-6">
            {/* Social Icons matching Screenshot 5 */}
            <div className="flex items-center space-x-4 text-gray-900">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.28 6.28 0 0 0 1.84-4.47V8.62a8.28 8.28 0 0 0 4.93 1.62v-3.55z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-600 transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center space-x-2 px-3.5 py-2 rounded-xl border border-gray-300 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
              >
                <Globe className="w-4 h-4 text-gray-600" />
                <span>{selectedLang}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 bottom-full mb-2 w-36 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-30">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setSelectedLang(lang);
                        setLangMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
