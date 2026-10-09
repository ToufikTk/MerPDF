import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  activePage: 'home' | 'how-it-works' | 'about';
  onNavigate: (page: 'home' | 'how-it-works' | 'about') => void;
  onOpenUpload?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  onOpenUpload,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleHowItWorkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('how-it-works');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleFaqClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (activePage !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTryForFree = () => {
    if (activePage !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        onOpenUpload?.();
      }, 100);
    } else {
      onOpenUpload?.();
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <a
              href="#"
              onClick={handleLogoClick}
              className="flex items-center space-x-2.5 group"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-black">
                {/* Geometric symbol */}
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
              </div>
              <span className="font-bold text-2xl tracking-tight text-gray-900">PDF</span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1.5">
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
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
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
            </nav>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center space-x-6">
            <a
              href="#login"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Sign in
            </a>
            <button
              type="button"
              onClick={handleTryForFree}
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[#111827] hover:bg-black rounded-full shadow-sm hover:shadow transition-all duration-150"
            >
              Try for free
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center space-x-3">
            <button
              type="button"
              onClick={handleTryForFree}
              className="inline-flex items-center justify-center px-3.5 py-2 text-xs font-semibold text-white bg-black rounded-full"
            >
              Merge Now
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
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
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
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
          <div className="pt-4 border-t border-gray-100 flex flex-col space-y-2">
            <button
              type="button"
              onClick={handleTryForFree}
              className="w-full text-center py-2.5 px-4 rounded-full bg-black text-white font-medium text-sm"
            >
              Try for free
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
