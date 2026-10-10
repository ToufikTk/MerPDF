import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  Globe,
  Mail,
  Phone,
  MapPin,
  Share2,
  FileText,
  Search,
  CheckCircle2,
  AlertCircle,
  Save,
  LogOut,
  ArrowLeft,
  Sparkles,
  RefreshCw,
  ExternalLink,
  Layers,
  Settings,
  Edit3,
  Plus,
  Trash2,
  Sliders,
  Check,
} from 'lucide-react';
import {
  SiteConfig,
  getSiteConfig,
  saveSiteConfig,
  resetSiteConfigToDefaults,
  updateSiteOwnerPassword,
  verifySiteOwnerCredentials,
  setSiteOwnerLoggedIn,
} from '../services/siteConfigService';

interface SiteOwnerDashboardProps {
  onGoHome: () => void;
  onSignOutOwner?: () => void;
}

export const SiteOwnerDashboard: React.FC<SiteOwnerDashboardProps> = ({
  onGoHome,
  onSignOutOwner,
}) => {
  const [config, setConfig] = useState<SiteConfig>(() => getSiteConfig());
  const [activeTab, setActiveTab] = useState<'branding' | 'contact' | 'security' | 'legal' | 'seo'>('branding');
  const [savedToast, setSavedToast] = useState<string | null>(null);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [isChangingPass, setIsChangingPass] = useState(false);

  // Legal sub-tab state
  const [selectedLegalDoc, setSelectedLegalDoc] = useState<'privacyPolicy' | 'termsOfService' | 'cookiesPolicy'>('privacyPolicy');

  useEffect(() => {
    const handleUpdate = () => {
      setConfig(getSiteConfig());
    };
    window.addEventListener('siteConfigUpdated', handleUpdate);
    return () => window.removeEventListener('siteConfigUpdated', handleUpdate);
  }, []);

  const triggerToast = (msg: string) => {
    setSavedToast(msg);
    setTimeout(() => setSavedToast(null), 3000);
  };

  const handleSaveAll = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    saveSiteConfig(config);
    triggerToast('All site changes saved and published live!');
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all site settings (branding, legal, SEO) to standard defaults?')) {
      const def = resetSiteConfigToDefaults();
      setConfig(def);
      triggerToast('Site settings reset to defaults.');
    }
  };

  // Change admin password handler
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (!currentPassword) {
      setPasswordError('Please enter your current admin password.');
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirm password do not match.');
      return;
    }

    setIsChangingPass(true);
    setTimeout(() => {
      const res = updateSiteOwnerPassword(currentPassword, newPassword);
      setIsChangingPass(false);

      if (!res.success) {
        setPasswordError(res.error || 'Failed to update password.');
      } else {
        setPasswordSuccess('Site owner password updated successfully! Please remember your new password.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        triggerToast('Site owner password updated.');
      }
    }, 400);
  };

  // Legal section updater helper
  const handleLegalSectionChange = (
    docKey: 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy',
    index: number,
    field: 'title' | 'content',
    val: string
  ) => {
    setConfig((prev) => {
      const doc = prev.legalPages[docKey];
      const newSections = [...doc.sections];
      newSections[index] = {
        ...newSections[index],
        [field]: val,
      };
      return {
        ...prev,
        legalPages: {
          ...prev.legalPages,
          [docKey]: {
            ...doc,
            sections: newSections,
          },
        },
      };
    });
  };

  const handleAddLegalSection = (docKey: 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => {
    setConfig((prev) => {
      const doc = prev.legalPages[docKey];
      const newSec = {
        id: `sec-${Date.now()}`,
        title: `New Section ${doc.sections.length + 1}`,
        content: 'Enter the policy terms and conditions for this section...',
      };
      return {
        ...prev,
        legalPages: {
          ...prev.legalPages,
          [docKey]: {
            ...doc,
            sections: [...doc.sections, newSec],
          },
        },
      };
    });
    triggerToast('Added new policy section. Remember to click Save Changes.');
  };

  const handleRemoveLegalSection = (docKey: 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy', index: number) => {
    setConfig((prev) => {
      const doc = prev.legalPages[docKey];
      const newSections = doc.sections.filter((_, i) => i !== index);
      return {
        ...prev,
        legalPages: {
          ...prev.legalPages,
          [docKey]: {
            ...doc,
            sections: newSections,
          },
        },
      };
    });
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] pb-24 text-gray-900 font-sans">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={onGoHome}
              className="inline-flex items-center text-xs sm:text-sm font-semibold text-gray-600 hover:text-black gap-2 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Site</span>
            </button>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#111827] text-white text-xs font-bold uppercase tracking-wider">
                Site Owner
              </span>
              <h1 className="text-base sm:text-lg font-extrabold text-gray-950 tracking-tight">
                Control Panel &amp; Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleSaveAll()}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-[#111827] hover:bg-black text-white text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>

            {onSignOutOwner && (
              <button
                type="button"
                onClick={onSignOutOwner}
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full border border-gray-200 text-xs sm:text-sm font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                title="Log out of site owner session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Floating Save Toast Notification */}
      {savedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111827] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-medium animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{savedToast}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Site Owner Banner */}
        <div className="mb-8 p-6 rounded-3xl bg-white border border-gray-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-2xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                Administrator Mode Active
              </span>
              <span className="text-2xs text-gray-500">Username: <strong>admin</strong></span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-950 tracking-tight">
              Manage Site Configuration &amp; Branding
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Customize the site name, logo, contact emails, social links, legal policies, and search engine optimization. Changes take effect across the entire application immediately.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 md:self-end">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="px-3.5 py-1.5 rounded-full border border-gray-200 text-xs font-semibold text-gray-600 hover:text-red-600 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Reset to Defaults
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 overflow-x-auto space-x-6 sm:space-x-8 mb-8 no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('branding')}
            className={`pb-3.5 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'branding'
                ? 'border-gray-950 text-gray-950'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Site Name &amp; Logo</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('contact')}
            className={`pb-3.5 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'contact'
                ? 'border-gray-950 text-gray-950'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Email &amp; Social Links</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`pb-3.5 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'security'
                ? 'border-gray-950 text-gray-950'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Owner Password</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('legal')}
            className={`pb-3.5 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'legal'
                ? 'border-gray-950 text-gray-950'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Legal Pages &amp; Contact Info</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('seo')}
            className={`pb-3.5 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'seo'
                ? 'border-gray-950 text-gray-950'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>SEO &amp; Headings</span>
          </button>
        </div>

        {/* TAB 1: Site Name, Tagline & Logo */}
        {activeTab === 'branding' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 space-y-6 shadow-2xs">
              <div>
                <h3 className="text-lg font-bold text-gray-950">Site Identity &amp; Branding</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Change the site name, tagline, and logo displayed in the header and navigation.
                </p>
              </div>

              {/* Site Name Field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700">
                  Site Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={config.siteName}
                  onChange={(e) => setConfig({ ...config, siteName: e.target.value })}
                  placeholder="e.g. Merge PDF"
                  className="w-full px-4 py-2.5 rounded-full bg-[#f4f5f7] border border-gray-200 text-sm font-medium text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                />
                <p className="text-2xs text-gray-400 pl-1">
                  Appears in the Navbar, browser window title, and footer copyright.
                </p>
              </div>

              {/* Tagline */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700">
                  Tagline / Motto
                </label>
                <input
                  type="text"
                  value={config.tagline}
                  onChange={(e) => setConfig({ ...config, tagline: e.target.value })}
                  placeholder="Merge. Combine. Simplify."
                  className="w-full px-4 py-2.5 rounded-full bg-[#f4f5f7] border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                />
                <p className="text-2xs text-gray-400 pl-1">
                  Shown in the hero banner and OpenGraph social preview.
                </p>
              </div>

              {/* Logo Selection */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-semibold text-gray-700">
                  Logo Style Selection
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'stack', label: 'Geometric Stack', desc: 'Minimal triple layer' },
                    { id: 'document', label: 'Document Icon', desc: 'Clean PDF outline' },
                    { id: 'modern', label: 'Modern Cube', desc: 'Sharp isometric' },
                    { id: 'minimal', label: 'Minimalist Dot', desc: 'Clean high-contrast' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setConfig({ ...config, logoType: item.id as any })}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        config.logoType === item.id
                          ? 'border-black bg-gray-50 ring-1 ring-black'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="font-bold text-xs text-gray-900">{item.label}</div>
                      <div className="text-2xs text-gray-500 mt-0.5">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Logo Image URL (Optional) */}
              <div className="space-y-1.5 pt-2">
                <label className="block text-xs font-semibold text-gray-700">
                  Custom Logo Image URL (Optional)
                </label>
                <input
                  type="url"
                  value={config.customLogoUrl}
                  onChange={(e) => setConfig({ ...config, customLogoUrl: e.target.value })}
                  placeholder="https://example.com/logo.svg or png"
                  className="w-full px-4 py-2.5 rounded-full bg-[#f4f5f7] border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                />
                <p className="text-2xs text-gray-400 pl-1">
                  If provided, replaces the vector icon with your custom image asset.
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-2xs text-gray-500">Live preview shown on the right</span>
                <button
                  type="button"
                  onClick={() => handleSaveAll()}
                  className="px-6 py-2.5 rounded-full bg-[#111827] hover:bg-black text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Save Identity Changes
                </button>
              </div>
            </div>

            {/* Live Header Logo Preview Card */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-7 space-y-5 shadow-2xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Live Navbar Header Preview
              </h4>

              <div className="p-4 rounded-2xl bg-[#fafafa] border border-gray-200">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-black">
                    {config.customLogoUrl ? (
                      <img
                        src={config.customLogoUrl}
                        alt="Logo"
                        className="w-7 h-7 object-contain"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
                        <path d="M6 8L16 3L26 8L16 13L6 8Z" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 16L16 21L26 16" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 24L16 29L26 24" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span className="font-bold text-2xl tracking-tight text-gray-900">
                    {config.siteName || 'Merge PDF'}
                  </span>
                </div>
                <div className="text-2xs text-gray-400 mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
                  <span>Tagline: {config.tagline}</span>
                  <span className="text-emerald-600 font-semibold">Active</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/70 text-xs text-blue-900 space-y-1">
                <div className="font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Real-Time Broadcast</span>
                </div>
                <p className="text-blue-800 leading-relaxed text-2xs">
                  Whenever you update and save these fields, every page (Home, Contact, Terms, Header, Footer) immediately updates without needing a rebuild.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Email & Social Media Links */}
        {activeTab === 'contact' && (
          <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 space-y-8 shadow-2xs">
            <div>
              <h3 className="text-lg font-bold text-gray-950">Email &amp; Social Media Management</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Set the support email address and connect external social media profiles.
              </p>
            </div>

            {/* Contact Email & Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700">
                  Primary Contact Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={config.supportEmail}
                    onChange={(e) => setConfig({ ...config, supportEmail: e.target.value })}
                    placeholder="Support@verpdf.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#f4f5f7] border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                  />
                </div>
                <p className="text-2xs text-gray-400 pl-1">
                  Displayed on the Contact page and support inquiries.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700">
                  Support Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={config.contactPhone}
                    onChange={(e) => setConfig({ ...config, contactPhone: e.target.value })}
                    placeholder="+1 (800) 555-0199"
                    className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#f4f5f7] border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700">
                  Response Time Guarantee
                </label>
                <input
                  type="text"
                  value={config.responseTime}
                  onChange={(e) => setConfig({ ...config, responseTime: e.target.value })}
                  placeholder="Within 24 hours on business days"
                  className="w-full px-4 py-2.5 rounded-full bg-[#f4f5f7] border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700">
                  Physical Office Address
                </label>
                <input
                  type="text"
                  value={config.officeAddress}
                  onChange={(e) => setConfig({ ...config, officeAddress: e.target.value })}
                  placeholder="San Francisco, CA"
                  className="w-full px-4 py-2.5 rounded-full bg-[#f4f5f7] border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>
            </div>

            {/* Social Media Links Section */}
            <div className="pt-6 border-t border-gray-100 space-y-4">
              <div>
                <h4 className="text-sm font-bold text-gray-950 flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-[#111827]" />
                  <span>Social Media Icons &amp; Links</span>
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Enable icons and add links to display in the website footer and contact page.
                </p>
              </div>

              <div className="space-y-3.5">
                {/* Instagram */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#fafafa] border border-gray-200">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="toggle-instagram"
                      checked={config.socialVisibility.instagram}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          socialVisibility: { ...config.socialVisibility, instagram: e.target.checked },
                        })
                      }
                      className="w-4 h-4 rounded text-black cursor-pointer"
                    />
                    <label htmlFor="toggle-instagram" className="text-xs font-bold text-gray-900 cursor-pointer">
                      Instagram Link
                    </label>
                  </div>
                  <input
                    type="url"
                    value={config.socialLinks.instagram}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        socialLinks: { ...config.socialLinks, instagram: e.target.value },
                      })
                    }
                    placeholder="https://instagram.com/yourhandle"
                    className="flex-1 max-w-md px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-black"
                  />
                </div>

                {/* Twitter / X */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#fafafa] border border-gray-200">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="toggle-twitter"
                      checked={config.socialVisibility.twitter}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          socialVisibility: { ...config.socialVisibility, twitter: e.target.checked },
                        })
                      }
                      className="w-4 h-4 rounded text-black cursor-pointer"
                    />
                    <label htmlFor="toggle-twitter" className="text-xs font-bold text-gray-900 cursor-pointer">
                      Twitter / X Link
                    </label>
                  </div>
                  <input
                    type="url"
                    value={config.socialLinks.twitter}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        socialLinks: { ...config.socialLinks, twitter: e.target.value },
                      })
                    }
                    placeholder="https://twitter.com/yourhandle"
                    className="flex-1 max-w-md px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-black"
                  />
                </div>

                {/* GitHub */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#fafafa] border border-gray-200">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="toggle-github"
                      checked={config.socialVisibility.github}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          socialVisibility: { ...config.socialVisibility, github: e.target.checked },
                        })
                      }
                      className="w-4 h-4 rounded text-black cursor-pointer"
                    />
                    <label htmlFor="toggle-github" className="text-xs font-bold text-gray-900 cursor-pointer">
                      GitHub Link
                    </label>
                  </div>
                  <input
                    type="url"
                    value={config.socialLinks.github}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        socialLinks: { ...config.socialLinks, github: e.target.value },
                      })
                    }
                    placeholder="https://github.com/yourorg"
                    className="flex-1 max-w-md px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-black"
                  />
                </div>

                {/* LinkedIn */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#fafafa] border border-gray-200">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="toggle-linkedin"
                      checked={config.socialVisibility.linkedin}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          socialVisibility: { ...config.socialVisibility, linkedin: e.target.checked },
                        })
                      }
                      className="w-4 h-4 rounded text-black cursor-pointer"
                    />
                    <label htmlFor="toggle-linkedin" className="text-xs font-bold text-gray-900 cursor-pointer">
                      LinkedIn Link
                    </label>
                  </div>
                  <input
                    type="url"
                    value={config.socialLinks.linkedin}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        socialLinks: { ...config.socialLinks, linkedin: e.target.value },
                      })
                    }
                    placeholder="https://linkedin.com/company/yourcompany"
                    className="flex-1 max-w-md px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-black"
                  />
                </div>

                {/* Facebook */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#fafafa] border border-gray-200">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="toggle-fb"
                      checked={config.socialVisibility.facebook}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          socialVisibility: { ...config.socialVisibility, facebook: e.target.checked },
                        })
                      }
                      className="w-4 h-4 rounded text-black cursor-pointer"
                    />
                    <label htmlFor="toggle-fb" className="text-xs font-bold text-gray-900 cursor-pointer">
                      Facebook Link
                    </label>
                  </div>
                  <input
                    type="url"
                    value={config.socialLinks.facebook}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        socialLinks: { ...config.socialLinks, facebook: e.target.value },
                      })
                    }
                    placeholder="https://facebook.com/yourpage"
                    className="flex-1 max-w-md px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-black"
                  />
                </div>

                {/* YouTube */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#fafafa] border border-gray-200">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="toggle-yt"
                      checked={config.socialVisibility.youtube}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          socialVisibility: { ...config.socialVisibility, youtube: e.target.checked },
                        })
                      }
                      className="w-4 h-4 rounded text-black cursor-pointer"
                    />
                    <label htmlFor="toggle-yt" className="text-xs font-bold text-gray-900 cursor-pointer">
                      YouTube Link
                    </label>
                  </div>
                  <input
                    type="url"
                    value={config.socialLinks.youtube}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        socialLinks: { ...config.socialLinks, youtube: e.target.value },
                      })
                    }
                    placeholder="https://youtube.com/@channel"
                    className="flex-1 max-w-md px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="button"
                onClick={() => handleSaveAll()}
                className="px-6 py-2.5 rounded-full bg-[#111827] hover:bg-black text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Save Contact &amp; Social Links
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: Site Owner Password Change */}
        {activeTab === 'security' && (
          <div className="max-w-2xl bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 space-y-6 shadow-2xs">
            <div>
              <h3 className="text-lg font-bold text-gray-950 flex items-center gap-2">
                <Lock className="w-5 h-5 text-gray-900" />
                <span>Site Owner Password Security</span>
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Change the password used to access this site owner dashboard and admin credentials.
              </p>
            </div>

            {/* Instructions box */}
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-gray-700 space-y-1.5">
              <div className="font-semibold text-gray-900">How to access this dashboard:</div>
              <p>
                1. Navigate to the <strong>Sign In</strong> page.
              </p>
              <p>
                2. Enter <strong>&quot;admin&quot;</strong> in the Login/Email field.
              </p>
              <p>
                3. Enter your current password (default: <code className="bg-gray-200 px-1 py-0.5 rounded text-black font-mono">admin123</code>).
              </p>
            </div>

            {/* Error and Success notifications */}
            {passwordError && (
              <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <span>{passwordError}</span>
              </div>
            )}

            {passwordSuccess && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{passwordSuccess}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700">
                  Current Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPass ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    placeholder="Enter current password"
                    className="w-full pl-4 pr-10 py-2.5 rounded-full bg-[#f4f5f7] border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700">
                  New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showNewPass ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    placeholder="Minimum 6 characters"
                    className="w-full pl-4 pr-10 py-2.5 rounded-full bg-[#f4f5f7] border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700">
                  Confirm New Password <span className="text-red-500">*</span>
                </label>
                <input
                  type={showNewPass ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Re-type new password"
                  className="w-full px-4 py-2.5 rounded-full bg-[#f4f5f7] border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isChangingPass}
                  className="px-6 py-2.5 rounded-full bg-[#111827] hover:bg-black text-white text-xs font-semibold transition-all shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {isChangingPass ? 'Updating Password...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: Legal Pages Management */}
        {activeTab === 'legal' && (
          <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 space-y-6 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-gray-950">Managing Legal Pages &amp; Policies</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Update clauses, terms, and introductions for all legal policy documents.
                </p>
              </div>

              {/* Sub-selector between Privacy, Terms, Cookies */}
              <div className="inline-flex rounded-full bg-[#f4f5f7] p-1 border border-gray-200 self-start">
                <button
                  type="button"
                  onClick={() => setSelectedLegalDoc('privacyPolicy')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                    selectedLegalDoc === 'privacyPolicy' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  Privacy Policy
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedLegalDoc('termsOfService')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                    selectedLegalDoc === 'termsOfService' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  Terms of Service
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedLegalDoc('cookiesPolicy')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                    selectedLegalDoc === 'cookiesPolicy' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  Cookies Policy
                </button>
              </div>
            </div>

            {/* Current Selected Document Editing Form */}
            <div className="space-y-6 pt-3 border-t border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700">Document Title</label>
                  <input
                    type="text"
                    value={config.legalPages[selectedLegalDoc].title}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        legalPages: {
                          ...config.legalPages,
                          [selectedLegalDoc]: {
                            ...config.legalPages[selectedLegalDoc],
                            title: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-full bg-[#f4f5f7] border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-black"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700">Last Updated Date</label>
                  <input
                    type="text"
                    value={config.legalPages[selectedLegalDoc].lastUpdated}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        legalPages: {
                          ...config.legalPages,
                          [selectedLegalDoc]: {
                            ...config.legalPages[selectedLegalDoc],
                            lastUpdated: e.target.value,
                          },
                        },
                      })
                    }
                    placeholder="e.g. October 2026"
                    className="w-full px-4 py-2.5 rounded-full bg-[#f4f5f7] border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700">Introduction Summary</label>
                <textarea
                  rows={2}
                  value={config.legalPages[selectedLegalDoc].introduction}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      legalPages: {
                        ...config.legalPages,
                        [selectedLegalDoc]: {
                          ...config.legalPages[selectedLegalDoc],
                          introduction: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#f4f5f7] border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-black resize-none"
                />
              </div>

              {/* Sections List */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Policy Clauses &amp; Sections ({config.legalPages[selectedLegalDoc].sections.length})
                  </h4>
                  <button
                    type="button"
                    onClick={() => handleAddLegalSection(selectedLegalDoc)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-gray-900 hover:underline cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Section</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {config.legalPages[selectedLegalDoc].sections.map((sec, idx) => (
                    <div
                      key={sec.id || idx}
                      className="p-4 sm:p-5 rounded-2xl bg-[#fafafa] border border-gray-200 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <input
                          type="text"
                          value={sec.title}
                          onChange={(e) =>
                            handleLegalSectionChange(selectedLegalDoc, idx, 'title', e.target.value)
                          }
                          placeholder="Section Title"
                          className="flex-1 px-3.5 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-900 focus:outline-none focus:border-black"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveLegalSection(selectedLegalDoc, idx)}
                          className="p-1.5 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                          title="Delete section"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <textarea
                        rows={3}
                        value={sec.content}
                        onChange={(e) =>
                          handleLegalSectionChange(selectedLegalDoc, idx, 'content', e.target.value)
                        }
                        placeholder="Section content..."
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs text-gray-700 leading-relaxed focus:outline-none focus:border-black resize-y"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleSaveAll()}
                  className="px-6 py-2.5 rounded-full bg-[#111827] hover:bg-black text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Save Legal Policies
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SEO, Headings & Keywords */}
        {activeTab === 'seo' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 space-y-6 shadow-2xs">
              <div>
                <h3 className="text-lg font-bold text-gray-950">Search Engine Optimization (SEO)</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Configure browser titles, meta descriptions, headings, and keywords.
                </p>
              </div>

              {/* SEO Title */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700">
                  SEO Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={config.seo.seoTitle}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      seo: { ...config.seo, seoTitle: e.target.value },
                    })
                  }
                  placeholder="Merge PDF files"
                  className="w-full px-4 py-2.5 rounded-full bg-[#f4f5f7] border border-gray-200 text-sm font-medium text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>

              {/* Meta Description */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700">
                  Meta Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={config.seo.metaDescription}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      seo: { ...config.seo, metaDescription: e.target.value },
                    })
                  }
                  placeholder="Select multiple files, arrange their positions, and merge them in seconds..."
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#f4f5f7] border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-black resize-none"
                />
              </div>

              {/* H1, H2, H3 Headings */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Core Structural Headings
                </h4>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700">
                    H1: Primary Hero Title
                  </label>
                  <input
                    type="text"
                    value={config.seo.h1}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        seo: { ...config.seo, h1: e.target.value },
                      })
                    }
                    placeholder="Merge PDF Files Online for Free"
                    className="w-full px-4 py-2 rounded-full bg-[#f4f5f7] border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-black"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700">
                    H2: Features &amp; Capabilities Title
                  </label>
                  <input
                    type="text"
                    value={config.seo.h2}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        seo: { ...config.seo, h2: e.target.value },
                      })
                    }
                    placeholder="Combine Multiple PDF Files into One Document"
                    className="w-full px-4 py-2 rounded-full bg-[#f4f5f7] border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-black"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700">
                    H3: Step-by-Step Guide Title
                  </label>
                  <input
                    type="text"
                    value={config.seo.h3}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        seo: { ...config.seo, h3: e.target.value },
                      })
                    }
                    placeholder="How to Merge PDF Files Online"
                    className="w-full px-4 py-2 rounded-full bg-[#f4f5f7] border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* URL Slug & Keywords */}
              <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700">
                    Recommended URL Slug
                  </label>
                  <input
                    type="text"
                    value={config.seo.urlSlug}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        seo: { ...config.seo, urlSlug: e.target.value },
                      })
                    }
                    placeholder="/merge-pdf/"
                    className="w-full px-4 py-2 rounded-full bg-[#f4f5f7] border border-gray-200 text-sm font-mono text-gray-900 focus:outline-none focus:border-black"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700">
                    SEO Keywords
                  </label>
                  <textarea
                    rows={3}
                    value={config.seo.keywords}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        seo: { ...config.seo, keywords: e.target.value },
                      })
                    }
                    placeholder="Merge PDF, Merge PDF Files Online, Combine PDF Files..."
                    className="w-full px-4 py-2 rounded-2xl bg-[#f4f5f7] border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleSaveAll()}
                  className="px-6 py-2.5 rounded-full bg-[#111827] hover:bg-black text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Save SEO &amp; Headings
                </button>
              </div>
            </div>

            {/* Google Search Results Snippet Simulator */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-7 space-y-4 shadow-2xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Google Search Results Preview
              </h4>

              <div className="p-5 rounded-2xl bg-[#fcfcfc] border border-gray-200 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[9px] font-bold">
                    P
                  </div>
                  <div className="text-xs text-gray-700 font-sans truncate">
                    https://pdf.example.com{config.seo.urlSlug || '/merge-pdf/'}
                  </div>
                </div>

                <h5 className="text-base font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug">
                  {config.seo.seoTitle || 'Merge PDF files'}
                </h5>

                <p className="text-xs text-[#4d5156] leading-relaxed line-clamp-3">
                  {config.seo.metaDescription ||
                    'Select multiple files, arrange their positions, and merge them in seconds. Easily combine PDF files online for free.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 text-2xs text-gray-500 space-y-1">
                <div className="font-semibold text-gray-800">Heading Hierarchy:</div>
                <div><strong>H1:</strong> {config.seo.h1}</div>
                <div><strong>H2:</strong> {config.seo.h2}</div>
                <div><strong>H3:</strong> {config.seo.h3}</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
