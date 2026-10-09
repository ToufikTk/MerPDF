import React, { useState } from 'react';
import { ChevronDown, Menu, X, FileText, CheckCircle2, Shield, Layers, Sparkles, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenUpload?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenUpload }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <a href="#" className="flex items-center space-x-2.5 group">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-black">
                {/* Clean geometric symbol matching the prompt */}
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
            <nav className="hidden lg:flex items-center space-x-1">
              {/* Products Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown('products')}
                  className="flex items-center px-3.5 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Products
                  <ChevronDown className="ml-1 w-4 h-4 text-gray-500" />
                </button>
                {activeDropdown === 'products' && (
                  <div
                    className="absolute top-full left-0 w-72 mt-2 p-2 bg-white rounded-xl shadow-xl border border-gray-100 ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <a
                      href="#merge-tool"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start p-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mr-3 mt-0.5">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">Merge PDF</div>
                        <div className="text-xs text-gray-500">Combine multiple files into one PDF</div>
                      </div>
                    </a>
                    <a
                      href="#products"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start p-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mr-3 mt-0.5">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">PDF Editor & Sign</div>
                        <div className="text-xs text-gray-500">Full editing and eSignature tools</div>
                      </div>
                    </a>
                  </div>
                )}
              </div>

              {/* Capabilities Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown('capabilities')}
                  className="flex items-center px-3.5 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Capabilities
                  <ChevronDown className="ml-1 w-4 h-4 text-gray-500" />
                </button>
                {activeDropdown === 'capabilities' && (
                  <div
                    className="absolute top-full left-0 w-64 mt-2 p-2 bg-white rounded-xl shadow-xl border border-gray-100 ring-1 ring-black/5"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <a
                      href="#features"
                      onClick={() => setActiveDropdown(null)}
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                    >
                      Instant Reordering
                    </a>
                    <a
                      href="#features"
                      onClick={() => setActiveDropdown(null)}
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                    >
                      Google Drive Sync
                    </a>
                    <a
                      href="#features"
                      onClick={() => setActiveDropdown(null)}
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                    >
                      Offline & In-Browser Security
                    </a>
                  </div>
                )}
              </div>

              {/* Solutions Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown('solutions')}
                  className="flex items-center px-3.5 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Solutions
                  <ChevronDown className="ml-1 w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* Resources Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown('resources')}
                  className="flex items-center px-3.5 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Resources
                  <ChevronDown className="ml-1 w-4 h-4 text-gray-500" />
                </button>
              </div>

              <a
                href="#enterprise"
                className="px-3.5 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Enterprise
              </a>
              <a
                href="#pricing"
                className="px-3.5 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Pricing
              </a>
            </nav>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center space-x-6">
            <a
              href="#enterprise"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Request a demo
            </a>
            <a
              href="#login"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Sign in
            </a>
            <a
              href="#merge-tool"
              onClick={onOpenUpload}
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[#111827] hover:bg-black rounded-full shadow-sm hover:shadow transition-all duration-150"
            >
              Try for free
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center space-x-3">
            <a
              href="#merge-tool"
              className="inline-flex items-center justify-center px-3.5 py-2 text-xs font-semibold text-white bg-black rounded-full"
            >
              Merge Now
            </a>
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
            href="#merge-tool"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg"
          >
            Merge PDF Files
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            How it works
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            Features & Capabilities
          </a>
          <a
            href="#products"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            Products & Ecosystem
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            Frequently Asked Questions
          </a>
          <div className="pt-4 border-t border-gray-100 flex flex-col space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenUpload) onOpenUpload();
              }}
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
