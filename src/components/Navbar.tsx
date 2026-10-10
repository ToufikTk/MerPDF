import React, { useState, useEffect } from 'react';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../types/user';
import { getSiteConfig, SiteConfig } from '../services/siteConfigService';

interface NavbarProps {
  activePage:
    | 'home'
    | 'how-it-works'
    | 'faq'
    | 'about'
    | 'studio'
    | 'privacy-policy'
    | 'terms-of-service'
    | 'cookies-policy'
    | 'contact'
    | 'sign-in'
    | 'sign-up'
    | 'profile'
    | 'site-owner';
  onNavigate: (
    page:
      | 'home'
      | 'how-it-works'
      | 'faq'
      | 'about'
      | 'studio'
      | 'privacy-policy'
      | 'terms-of-service'
      | 'cookies-policy'
      | 'contact'
      | 'sign-in'
      | 'sign-up'
      | 'profile'
      | 'site-owner'
  ) => void;
  currentUser?: UserProfile | null;
  onSignOut?: () => void;
  onOpenUpload?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  currentUser,
  onSignOut,
  onOpenUpload,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => getSiteConfig());

  useEffect(() => {
    const handleUpdate = () => {
      setSiteConfig(getSiteConfig());
    };
    window.addEventListener('siteConfigUpdated', handleUpdate);
    return () => window.removeEventListener('siteConfigUpdated', handleUpdate);
  }, []);

  const handleHowItWorkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('how-it-works');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleFaqClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('faq');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleStudioClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTryForFree = () => {
    onNavigate('sign-up');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const getUserInitials = (nameStr: string) => {
    return nameStr
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 relative">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="#"
              onClick={handleLogoClick}
              className="flex items-center space-x-2.5 group"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-black">
                {siteConfig.customLogoUrl ? (
                  <img
                    src={siteConfig.customLogoUrl}
                    alt={siteConfig.siteName}
                    className="w-7 h-7 object-contain"
                  />
                ) : siteConfig.logoType === 'document' ? (
                  <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7 transform transition-transform group-hover:scale-105">
                    <rect x="7" y="4" width="18" height="24" rx="3" stroke="#111827" strokeWidth="2.5" />
                    <line x1="11" y1="10" x2="21" y2="10" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
                    <line x1="11" y1="16" x2="21" y2="16" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
                    <line x1="11" y1="22" x2="17" y2="22" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ) : (
                  /* Geometric symbol */
                  <svg
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 transform transition-transform group-hover:scale-105"
                  >
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
                )}
              </div>
              <span className="font-bold text-2xl tracking-tight text-gray-900">
                {siteConfig.siteName || 'Merge PDF'}
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links (Centered in the middle) */}
          <nav className="hidden lg:flex items-center space-x-1.5 absolute left-1/2 -translate-x-1/2">
            <a
              href="#how-it-works"
              onClick={handleHowItWorkClick}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activePage === 'how-it-works'
                  ? 'text-gray-950 font-bold bg-gray-100'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              How It Work
            </a>
            <a
              href="#faq"
              onClick={handleFaqClick}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activePage === 'faq'
                  ? 'text-gray-950 font-bold bg-gray-100'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              FAQ
            </a>
            <a
              href="#about"
              onClick={handleAboutClick}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activePage === 'about'
                  ? 'text-gray-950 font-bold bg-gray-100'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              About
            </a>
            <a
              href="#studio"
              onClick={handleStudioClick}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activePage === 'studio'
                  ? 'text-gray-950 font-bold bg-gray-100'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Studio
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center space-x-5">
            {currentUser ? (
              <div className="flex items-center space-x-3">
                {currentUser.role === 'owner' ? (
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate('site-owner');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111827] text-white hover:bg-black text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                    title="Open Site Owner Dashboard"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Owner Dashboard</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate('profile');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-black transition-colors px-2 py-1 cursor-pointer group"
                    title="View Profile"
                  >
                    <div
                      className={`w-7 h-7 rounded-full ${
                        currentUser.avatarColor || 'bg-black'
                      } text-white flex items-center justify-center text-xs font-bold shadow-2xs select-none`}
                    >
                      {getUserInitials(currentUser.name)}
                    </div>
                    <span className="font-semibold text-gray-950 group-hover:underline">
                      Hello {currentUser.name.split(' ')[0]}
                    </span>
                  </button>
                )}
                {onSignOut && (
                  <button
                    type="button"
                    onClick={onSignOut}
                    className="text-xs text-gray-400 hover:text-red-600 transition-colors px-1 py-1 cursor-pointer"
                    title="Sign Out"
                  >
                    Sign out
                  </button>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  onNavigate('sign-in');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-sm font-medium text-gray-900 hover:text-black transition-colors px-2 py-1 cursor-pointer"
              >
                Sign in
              </button>
            )}

            <button
              type="button"
              onClick={handleTryForFree}
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[#111827] hover:bg-black rounded-full shadow-sm hover:shadow transition-all duration-150 cursor-pointer"
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center space-x-3">
            {currentUser && (
              <button
                type="button"
                onClick={() => {
                  onNavigate('profile');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-semibold text-gray-900 hover:underline px-1 py-1"
              >
                Hello {currentUser.name.split(' ')[0]}
              </button>
            )}
            <button
              type="button"
              onClick={handleTryForFree}
              className="inline-flex items-center justify-center px-3.5 py-1.5 text-xs font-semibold text-white bg-black rounded-full cursor-pointer"
            >
              Get Started
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-3">
          <a
            href="#how-it-works"
            onClick={handleHowItWorkClick}
            className={`block px-3 py-2 text-base font-medium rounded-lg ${
              activePage === 'how-it-works'
                ? 'text-gray-950 font-bold bg-gray-100'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            How It Work
          </a>
          <a
            href="#faq"
            onClick={handleFaqClick}
            className={`block px-3 py-2 text-base font-medium rounded-lg ${
              activePage === 'faq'
                ? 'text-gray-950 font-bold bg-gray-100'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            FAQ
          </a>
          <a
            href="#about"
            onClick={handleAboutClick}
            className={`block px-3 py-2 text-base font-medium rounded-lg ${
              activePage === 'about'
                ? 'text-gray-950 font-bold bg-gray-100'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            About
          </a>
          <a
            href="#studio"
            onClick={handleStudioClick}
            className={`block px-3 py-2 text-base font-medium rounded-lg ${
              activePage === 'studio'
                ? 'text-gray-950 font-bold bg-gray-100'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Studio
          </a>
          <div className="pt-4 border-t border-gray-100 flex flex-col space-y-2">
            {currentUser ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('profile');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setMobileMenuOpen(false);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border border-gray-200 text-gray-900 font-semibold text-sm hover:bg-gray-50 cursor-pointer"
                >
                  <div
                    className={`w-5 h-5 rounded-full ${
                      currentUser.avatarColor || 'bg-black'
                    } text-white flex items-center justify-center text-3xs font-bold`}
                  >
                    {getUserInitials(currentUser.name)}
                  </div>
                  <span>Hello {currentUser.name.split(' ')[0]} (My Profile)</span>
                </button>
                {onSignOut && (
                  <button
                    type="button"
                    onClick={() => {
                      onSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-center py-2 px-4 text-xs text-red-600 hover:underline cursor-pointer"
                  >
                    Sign out
                  </button>
                )}
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  onNavigate('sign-in');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2.5 px-4 rounded-full border border-gray-200 text-gray-800 font-medium text-sm hover:bg-gray-50 cursor-pointer"
              >
                Sign in
              </button>
            )}
            <button
              type="button"
              onClick={handleTryForFree}
              className="w-full text-center py-2.5 px-4 rounded-full bg-black text-white font-medium text-sm cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
