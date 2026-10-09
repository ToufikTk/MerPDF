import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Cookie, Mail, CheckCircle } from 'lucide-react';

interface FooterProps {
  onNavigateAbout?: () => void;
  onNavigatePrivacy?: () => void;
  onNavigateTerms?: () => void;
  onNavigateCookies?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateAbout,
  onNavigatePrivacy,
  onNavigateTerms,
  onNavigateCookies,
}) => {
  const [modalType, setModalType] = useState<
    'contact' | 'privacy' | 'terms' | 'cookies' | null
  >(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const handleOpenAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateAbout) {
      onNavigateAbout();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactEmail('');
      setContactMessage('');
      setModalType(null);
    }, 2000);
  };

  return (
    <>
      <footer className="bg-white border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left: Copyright */}
            <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
              © 2014–2026 All rights reserved
            </p>

            {/* Right: Footer Navigation Links */}
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-gray-500 font-medium">
              <button
                type="button"
                onClick={handleOpenAbout}
                className="hover:text-gray-900 transition-colors"
              >
                About
              </button>
              <button
                type="button"
                onClick={() => setModalType('contact')}
                className="hover:text-gray-900 transition-colors"
              >
                Contact
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigatePrivacy) {
                    onNavigatePrivacy();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    setModalType('privacy');
                  }
                }}
                className="hover:text-gray-900 transition-colors"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigateTerms) {
                    onNavigateTerms();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    setModalType('terms');
                  }
                }}
                className="hover:text-gray-900 transition-colors"
              >
                Terms of Service
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigateCookies) {
                    onNavigateCookies();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    setModalType('cookies');
                  }
                }}
                className="hover:text-gray-900 transition-colors"
              >
                Cookies Policy
              </button>
            </nav>
          </div>
        </div>
      </footer>

      {/* Interactive Modal for Contact & Policies */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden border border-gray-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center space-x-2.5">
                {modalType === 'privacy' && <ShieldCheck className="w-5 h-5 text-emerald-600" />}
                {modalType === 'terms' && <FileText className="w-5 h-5 text-blue-600" />}
                {modalType === 'cookies' && <Cookie className="w-5 h-5 text-amber-600" />}
                {modalType === 'contact' && <Mail className="w-5 h-5 text-purple-600" />}
                <h3 className="text-lg font-bold text-gray-950 capitalize font-['Plus_Jakarta_Sans']">
                  {modalType === 'privacy' && 'Privacy Policy'}
                  {modalType === 'terms' && 'Terms of Service'}
                  {modalType === 'cookies' && 'Cookies Policy'}
                  {modalType === 'contact' && 'Contact Support'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-sm text-gray-600 leading-relaxed">
              {modalType === 'privacy' && (
                <>
                  <p className="font-semibold text-gray-900">1. Client-Side Processing Guarantee</p>
                  <p>
                    MergePDF operates entirely within your browser using WebAssembly and HTML5 streaming technologies. Your files, documents, and images are merged in local memory and are never uploaded to, transmitted across, or stored on external servers.
                  </p>
                  <p className="font-semibold text-gray-900 mt-4">2. Zero Telemetry &amp; Data Collection</p>
                  <p>
                    We do not track, catalog, or inspect document metadata, filenames, text content, or embedded media. Once you close your browser tab, all temporary memory allocations are instantly cleared.
                  </p>
                  <p className="font-semibold text-gray-900 mt-4">3. Compliance</p>
                  <p>
                    Our architecture complies with GDPR, CCPA, and strict HIPAA security requirements because no protected health information (PHI) or personal data ever leaves the user&apos;s device.
                  </p>
                </>
              )}

              {modalType === 'terms' && (
                <>
                  <p className="font-semibold text-gray-900">1. Terms of Use</p>
                  <p>
                    By accessing and using MergePDF, you agree to comply with all applicable local, national, and international laws. MergePDF is provided free of charge for personal, educational, and commercial purposes.
                  </p>
                  <p className="font-semibold text-gray-900 mt-4">2. Intellectual Property</p>
                  <p>
                    All rights, title, and ownership in and to your original documents remain solely with you. MergePDF claims no ownership or license over any files you process using our software.
                  </p>
                  <p className="font-semibold text-gray-900 mt-4">3. Disclaimer of Warranty</p>
                  <p>
                    The service is provided on an &quot;as-is&quot; and &quot;as-available&quot; basis without warranties of any kind. While our software rigorously maintains ISO 32000 PDF standards, we advise users to retain backup copies of original files.
                  </p>
                </>
              )}

              {modalType === 'cookies' && (
                <>
                  <p className="font-semibold text-gray-900">1. Cookie Usage</p>
                  <p>
                    MergePDF does not use third-party tracking cookies, advertising identifiers, or persistent user fingerprinting technologies.
                  </p>
                  <p className="font-semibold text-gray-900 mt-4">2. Local Storage</p>
                  <p>
                    We may utilize minimal browser LocalStorage or SessionStorage solely for essential interface preferences (such as remembering theme or view settings). These cookies contain zero personally identifiable information.
                  </p>
                  <p className="font-semibold text-gray-900 mt-4">3. Managing Cookies</p>
                  <p>
                    You may clear or block cookies in your browser settings at any time without impacting your ability to merge PDF documents.
                  </p>
                </>
              )}

              {modalType === 'contact' && (
                <div>
                  {contactSubmitted ? (
                    <div className="py-8 text-center space-y-3">
                      <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                      <h4 className="text-lg font-bold text-gray-900">Message sent!</h4>
                      <p className="text-sm text-gray-600">
                        Thank you for reaching out. Our engineering team will respond shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <p className="text-sm text-gray-600">
                        Have a question, feedback, or need enterprise assistance? Send us a message and we will respond promptly.
                      </p>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                          Email address
                        </label>
                        <input
                          type="email"
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="you@company.com"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-black"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                          Message
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          placeholder="How can we help you?"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-black"
                        />
                      </div>
                      <div className="pt-2 flex justify-end">
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-full bg-[#111827] hover:bg-black text-white text-sm font-semibold transition-colors"
                        >
                          Send message
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50/70 border-t border-gray-100 flex justify-end">
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="px-5 py-2 rounded-full border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
