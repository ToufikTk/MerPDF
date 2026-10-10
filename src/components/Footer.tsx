import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, FileText, Cookie, Mail, CheckCircle, Instagram } from 'lucide-react';
import { getSiteConfig, SiteConfig } from '../services/siteConfigService';

interface FooterProps {
  onNavigateAbout?: () => void;
  onNavigateContact?: () => void;
  onNavigatePrivacy?: () => void;
  onNavigateTerms?: () => void;
  onNavigateCookies?: () => void;
  onNavigateOwner?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateAbout,
  onNavigateContact,
  onNavigatePrivacy,
  onNavigateTerms,
  onNavigateCookies,
  onNavigateOwner,
}) => {
  const [modalType, setModalType] = useState<
    'contact' | 'privacy' | 'terms' | 'cookies' | null
  >(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => getSiteConfig());

  useEffect(() => {
    const handleUpdate = () => {
      setSiteConfig(getSiteConfig());
    };
    window.addEventListener('siteConfigUpdated', handleUpdate);
    return () => window.removeEventListener('siteConfigUpdated', handleUpdate);
  }, []);

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
      <footer className="bg-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left: Copyright */}
            <div className="flex items-center text-center sm:text-left">
              <p className="text-xs sm:text-sm text-gray-500">
                © 2026 All rights reserved
              </p>
            </div>

            {/* Center / Right: Social Media Icons (with links) */}
            <div className="flex items-center space-x-3.5">
              {siteConfig.socialVisibility.instagram && siteConfig.socialLinks.instagram && (
                <a
                  href={siteConfig.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-gray-50 hover:bg-black hover:text-white text-gray-600 flex items-center justify-center transition-all text-xs"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4 stroke-[2]" />
                </a>
              )}
              {siteConfig.socialVisibility.twitter && siteConfig.socialLinks.twitter && (
                <a
                  href={siteConfig.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-gray-50 hover:bg-black hover:text-white text-gray-600 flex items-center justify-center transition-all text-xs font-bold"
                  title="Twitter / X"
                >
                  𝕏
                </a>
              )}
              {siteConfig.socialVisibility.github && siteConfig.socialLinks.github && (
                <a
                  href={siteConfig.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-gray-50 hover:bg-black hover:text-white text-gray-600 flex items-center justify-center transition-all text-xs"
                  title="GitHub"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
              )}
              {siteConfig.socialVisibility.linkedin && siteConfig.socialLinks.linkedin && (
                <a
                  href={siteConfig.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-gray-50 hover:bg-black hover:text-white text-gray-600 flex items-center justify-center transition-all text-xs font-bold"
                  title="LinkedIn"
                >
                  in
                </a>
              )}
              {siteConfig.socialVisibility.facebook && siteConfig.socialLinks.facebook && (
                <a
                  href={siteConfig.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-gray-50 hover:bg-black hover:text-white text-gray-600 flex items-center justify-center transition-all text-xs font-bold"
                  title="Facebook"
                >
                  f
                </a>
              )}
              {siteConfig.socialVisibility.youtube && siteConfig.socialLinks.youtube && (
                <a
                  href={siteConfig.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-gray-50 hover:bg-black hover:text-white text-gray-600 flex items-center justify-center transition-all text-xs"
                  title="YouTube"
                >
                  ▶
                </a>
              )}
            </div>

            {/* Right: Footer Navigation Links */}
            <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-gray-500 font-medium">
              <button
                type="button"
                onClick={handleOpenAbout}
                className="hover:text-gray-900 transition-colors cursor-pointer"
              >
                About
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigateContact) {
                    onNavigateContact();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    setModalType('contact');
                  }
                }}
                className="hover:text-gray-900 transition-colors cursor-pointer"
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
                className="hover:text-gray-900 transition-colors cursor-pointer"
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
                className="hover:text-gray-900 transition-colors cursor-pointer"
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
                className="hover:text-gray-900 transition-colors cursor-pointer"
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
                <div className="space-y-4">
                  <p className="text-gray-700 italic">{siteConfig.legalPages.privacyPolicy.introduction}</p>
                  {siteConfig.legalPages.privacyPolicy.sections.map((sec) => (
                    <div key={sec.id} className="space-y-1">
                      <p className="font-semibold text-gray-900">{sec.title}</p>
                      <p className="text-gray-600 leading-relaxed">{sec.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {modalType === 'terms' && (
                <div className="space-y-4">
                  <p className="text-gray-700 italic">{siteConfig.legalPages.termsOfService.introduction}</p>
                  {siteConfig.legalPages.termsOfService.sections.map((sec) => (
                    <div key={sec.id} className="space-y-1">
                      <p className="font-semibold text-gray-900">{sec.title}</p>
                      <p className="text-gray-600 leading-relaxed">{sec.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {modalType === 'cookies' && (
                <div className="space-y-4">
                  <p className="text-gray-700 italic">{siteConfig.legalPages.cookiesPolicy.introduction}</p>
                  {siteConfig.legalPages.cookiesPolicy.sections.map((sec) => (
                    <div key={sec.id} className="space-y-1">
                      <p className="font-semibold text-gray-900">{sec.title}</p>
                      <p className="text-gray-600 leading-relaxed">{sec.content}</p>
                    </div>
                  ))}
                </div>
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
