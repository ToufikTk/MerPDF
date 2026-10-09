import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { getSiteConfig, SiteConfig } from '../services/siteConfigService';

interface ContactPageProps {
  onNavigateFAQ?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigateFAQ }) => {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => getSiteConfig());
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setSiteConfig(getSiteConfig());
    };
    window.addEventListener('siteConfigUpdated', handleUpdate);
    return () => window.removeEventListener('siteConfigUpdated', handleUpdate);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: 'General Inquiry',
      message: '',
    });
    setIsSubmitted(false);
  };

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto animate-in fade-in duration-200">
      {/* 1. Header matching Screenshot */}
      <div className="mb-12 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 mb-4 font-['Plus_Jakarta_Sans']">
          Contact Us
        </h1>
        <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed">
          We&apos;d love to hear from you. Our team usually responds within a few hours.
        </p>
      </div>

      {/* 2. Main Grid: Form on Left, Info Cards on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-7">
          {isSubmitted ? (
            <div className="bg-[#fcfbf9] border border-[#f1ece5] rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-2xs">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-950 font-['Plus_Jakarta_Sans']">
                Message Sent!
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto leading-relaxed">
                Thank you for reaching out. We received your note and will get back to you at{' '}
                <span className="font-semibold text-gray-900">{formData.email}</span> shortly.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full bg-gray-900 hover:bg-black text-white text-xs font-semibold transition-colors"
                >
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 font-['Plus_Jakarta_Sans']"
                  >
                    NAME
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-[#f3f4f6]/70 border border-gray-200/80 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-hidden focus:bg-white focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 font-['Plus_Jakarta_Sans']"
                  >
                    EMAIL
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-[#f3f4f6]/70 border border-gray-200/80 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-hidden focus:bg-white focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Subject */}
              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 font-['Plus_Jakarta_Sans']"
                >
                  SUBJECT
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, subject: e.target.value }))
                  }
                  placeholder="General Inquiry"
                  className="w-full px-4 py-3 bg-[#f3f4f6]/70 border border-gray-200/80 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-hidden focus:bg-white focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all"
                />
              </div>

              {/* Row 3: Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 font-['Plus_Jakarta_Sans']"
                >
                  MESSAGE
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, message: e.target.value }))
                  }
                  placeholder="Describe your question or issue..."
                  className="w-full px-4 py-3 bg-[#f3f4f6]/70 border border-gray-200/80 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-hidden focus:bg-white focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all resize-y"
                />
              </div>

              {/* Row 4: Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-[#0a0a0a] hover:bg-black text-white text-sm font-semibold transition-all shadow-xs active:scale-[0.99] disabled:opacity-70 cursor-pointer"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Column: Info Cards matching Screenshot */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card 1: Email, Response Time, Follow Us */}
          <div className="bg-[#f4f4f5]/65 border border-gray-200/70 rounded-3xl p-7 sm:p-8 space-y-6">
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 font-['Plus_Jakarta_Sans']">
                EMAIL
              </span>
              <a
                href={`mailto:${siteConfig.supportEmail || 'support@mergepdf.example'}`}
                className="text-sm font-medium text-gray-900 hover:underline"
              >
                {siteConfig.supportEmail || 'support@mergepdf.example'}
              </a>
            </div>

            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 font-['Plus_Jakarta_Sans']">
                RESPONSE TIME
              </span>
              <p className="text-sm text-gray-900 font-medium">
                {siteConfig.responseTime || 'Within 24 hours on business days'}
              </p>
            </div>

            {siteConfig.contactPhone && (
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 font-['Plus_Jakarta_Sans']">
                  PHONE
                </span>
                <p className="text-sm text-gray-900 font-medium">
                  {siteConfig.contactPhone}
                </p>
              </div>
            )}

            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 font-['Plus_Jakarta_Sans']">
                FOLLOW US
              </span>
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-700">
                {siteConfig.socialVisibility.twitter && siteConfig.socialLinks.twitter && (
                  <a
                    href={siteConfig.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-950 transition-colors"
                  >
                    Twitter
                  </a>
                )}
                {siteConfig.socialVisibility.github && siteConfig.socialLinks.github && (
                  <a
                    href={siteConfig.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-950 transition-colors"
                  >
                    GitHub
                  </a>
                )}
                {siteConfig.socialVisibility.linkedin && siteConfig.socialLinks.linkedin && (
                  <a
                    href={siteConfig.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-950 transition-colors"
                  >
                    LinkedIn
                  </a>
                )}
                {siteConfig.socialVisibility.facebook && siteConfig.socialLinks.facebook && (
                  <a
                    href={siteConfig.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-950 transition-colors"
                  >
                    Facebook
                  </a>
                )}
                {siteConfig.socialVisibility.youtube && siteConfig.socialLinks.youtube && (
                  <a
                    href={siteConfig.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-950 transition-colors"
                  >
                    YouTube
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Card 2: Looking for answers? FAQ Card */}
          <div className="bg-[#f4f4f5]/65 border border-gray-200/70 rounded-3xl p-7 sm:p-8 space-y-3">
            <h2 className="text-base font-bold text-gray-950 font-['Plus_Jakarta_Sans']">
              Looking for answers?
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed font-normal">
              Check our FAQ — you might find an instant answer.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onNavigateFAQ}
                className="inline-flex items-center space-x-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
              >
                <span>Browse FAQ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
