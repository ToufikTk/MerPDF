import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { MergeTool } from './components/MergeTool';
import { HowItWorks } from './components/HowItWorks';
import { Features } from './components/Features';
import { Products } from './components/Products';
import { TechnicalSpecs } from './components/TechnicalSpecs';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { PreviewModal } from './components/PreviewModal';
import { AboutPage } from './components/AboutPage';
import { HowItWorksPage } from './components/HowItWorksPage';
import { FAQPage } from './components/FAQPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsOfServicePage } from './components/TermsOfServicePage';
import { CookiesPolicyPage } from './components/CookiesPolicyPage';
import { ContactPage } from './components/ContactPage';
import { SignInPage } from './components/SignInPage';
import { SignUpPage } from './components/SignUpPage';
import { ProfilePage } from './components/ProfilePage';
import { SiteOwnerDashboard } from './components/SiteOwnerDashboard';
import { UserProfile, DEMO_OTHER_USERS } from './types/user';
import { getCurrentUser, saveCurrentUser } from './services/userService';
import {
  isSiteOwnerLoggedIn,
  setSiteOwnerLoggedIn,
  verifySiteOwnerCredentials,
  getSiteConfig,
} from './services/siteConfigService';
import { Lock, Eye, EyeOff, ShieldCheck, AlertCircle } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => getCurrentUser());
  const [viewingUser, setViewingUser] = useState<UserProfile>(
    () => getCurrentUser() || DEMO_OTHER_USERS[0]
  );
  const [ownerLoggedIn, setOwnerLoggedIn] = useState<boolean>(() => isSiteOwnerLoggedIn() || getCurrentUser()?.role === 'owner');

  // Owner login form state when visiting #site-owner without session
  const [ownerUsernameInput, setOwnerUsernameInput] = useState('admin');
  const [ownerPasswordInput, setOwnerPasswordInput] = useState('');
  const [showOwnerPassword, setShowOwnerPassword] = useState(false);
  const [ownerLoginError, setOwnerLoginError] = useState<string | null>(null);

  const [activePage, setActivePage] = useState<
    | 'home'
    | 'how-it-works'
    | 'faq'
    | 'about'
    | 'privacy-policy'
    | 'terms-of-service'
    | 'cookies-policy'
    | 'contact'
    | 'sign-in'
    | 'sign-up'
    | 'profile'
    | 'site-owner'
  >(() => {
    if (
      window.location.hash === '#site-owner' ||
      window.location.hash === '#admin' ||
      window.location.hash === '#owner'
    ) {
      return 'site-owner';
    }
    if (window.location.hash === '#about') return 'about';
    if (window.location.hash === '#how-it-works') return 'how-it-works';
    if (window.location.hash === '#faq') return 'faq';
    if (window.location.hash === '#privacy-policy') return 'privacy-policy';
    if (
      window.location.hash === '#terms-of-service' ||
      window.location.hash === '#terms'
    ) {
      return 'terms-of-service';
    }
    if (
      window.location.hash === '#cookies-policy' ||
      window.location.hash === '#cookies'
    ) {
      return 'cookies-policy';
    }
    if (window.location.hash === '#contact') {
      return 'contact';
    }
    if (
      window.location.hash === '#try-for-free' ||
      window.location.hash === '#try' ||
      window.location.hash === '#sign-up' ||
      window.location.hash === '#signup' ||
      window.location.hash === '#register'
    ) {
      return 'sign-up';
    }
    if (
      window.location.hash === '#sign-in' ||
      window.location.hash === '#signin' ||
      window.location.hash === '#login'
    ) {
      return 'sign-in';
    }
    if (
      window.location.hash === '#profile' ||
      window.location.hash === '#profile-sarah' ||
      window.location.hash === '#profile-alex'
    ) {
      return 'profile';
    }
    return 'home';
  });

  const [previewState, setPreviewState] = useState<{
    isOpen: boolean;
    url: string | null;
    name: string;
  }>({
    isOpen: false,
    url: null,
    name: '',
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#about') {
        setActivePage('about');
      } else if (window.location.hash === '#how-it-works') {
        setActivePage('how-it-works');
      } else if (window.location.hash === '#faq') {
        setActivePage('faq');
      } else if (window.location.hash === '#privacy-policy') {
        setActivePage('privacy-policy');
      } else if (
        window.location.hash === '#terms-of-service' ||
        window.location.hash === '#terms'
      ) {
        setActivePage('terms-of-service');
      } else if (
        window.location.hash === '#cookies-policy' ||
        window.location.hash === '#cookies'
      ) {
        setActivePage('cookies-policy');
      } else if (window.location.hash === '#contact') {
        setActivePage('contact');
      } else if (
        window.location.hash === '#try-for-free' ||
        window.location.hash === '#try' ||
        window.location.hash === '#sign-up' ||
        window.location.hash === '#signup' ||
        window.location.hash === '#register'
      ) {
        setActivePage('sign-up');
      } else if (
        window.location.hash === '#site-owner' ||
        window.location.hash === '#admin' ||
        window.location.hash === '#owner'
      ) {
        setActivePage('site-owner');
      } else if (
        window.location.hash === '#sign-in' ||
        window.location.hash === '#signin' ||
        window.location.hash === '#login'
      ) {
        setActivePage('sign-in');
      } else if (window.location.hash === '#profile') {
        setActivePage('profile');
        if (currentUser) {
          setViewingUser(currentUser);
        } else {
          setViewingUser(DEMO_OTHER_USERS[0]);
        }
      } else if (window.location.hash === '#profile-sarah') {
        setActivePage('profile');
        setViewingUser(DEMO_OTHER_USERS[0]);
      } else if (window.location.hash === '#profile-alex') {
        setActivePage('profile');
        setViewingUser(DEMO_OTHER_USERS[1]);
      } else if (window.location.hash === '' || window.location.hash === '#merge-tool') {
        setActivePage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentUser]);

  const handleNavigate = (
    page:
      | 'home'
      | 'how-it-works'
      | 'faq'
      | 'about'
      | 'privacy-policy'
      | 'terms-of-service'
      | 'cookies-policy'
      | 'contact'
      | 'sign-in'
      | 'sign-up'
      | 'profile'
      | 'site-owner'
  ) => {
    setActivePage(page);
    if (page === 'about') {
      window.location.hash = '#about';
    } else if (page === 'how-it-works') {
      window.location.hash = '#how-it-works';
    } else if (page === 'faq') {
      window.location.hash = '#faq';
    } else if (page === 'privacy-policy') {
      window.location.hash = '#privacy-policy';
    } else if (page === 'terms-of-service') {
      window.location.hash = '#terms-of-service';
    } else if (page === 'cookies-policy') {
      window.location.hash = '#cookies-policy';
    } else if (page === 'contact') {
      window.location.hash = '#contact';
    } else if (page === 'sign-in') {
      window.location.hash = '#sign-in';
    } else if (page === 'sign-up') {
      window.location.hash = '#try-for-free';
    } else if (page === 'site-owner') {
      window.location.hash = '#site-owner';
    } else if (page === 'profile') {
      if (currentUser && viewingUser.id === currentUser.id) {
        window.location.hash = '#profile';
      } else if (viewingUser.id === 'user-sarah') {
        window.location.hash = '#profile-sarah';
      } else if (viewingUser.id === 'user-alex') {
        window.location.hash = '#profile-alex';
      } else {
        window.location.hash = '#profile';
      }
    } else {
      if (
        window.location.hash === '#about' ||
        window.location.hash === '#how-it-works' ||
        window.location.hash === '#privacy-policy' ||
        window.location.hash === '#terms-of-service' ||
        window.location.hash === '#terms' ||
        window.location.hash === '#cookies-policy' ||
        window.location.hash === '#cookies' ||
        window.location.hash === '#contact' ||
        window.location.hash === '#try-for-free' ||
        window.location.hash === '#try' ||
        window.location.hash === '#sign-up' ||
        window.location.hash === '#signup' ||
        window.location.hash === '#register' ||
        window.location.hash === '#sign-in' ||
        window.location.hash === '#signin' ||
        window.location.hash === '#login' ||
        window.location.hash === '#profile' ||
        window.location.hash === '#profile-sarah' ||
        window.location.hash === '#profile-alex' ||
        window.location.hash === '#site-owner' ||
        window.location.hash === '#admin'
      ) {
        window.history.pushState(null, '', window.location.pathname);
      }
    }
  };

  const handleAccountCreated = (user: UserProfile) => {
    setCurrentUser(user);
    setViewingUser(user);
  };

  const handleSignInSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setViewingUser(user);
    if (user.role === 'owner') {
      setOwnerLoggedIn(true);
      handleNavigate('site-owner');
    } else {
      handleNavigate('home');
    }
  };

  const handleSignOut = () => {
    saveCurrentUser(null);
    setSiteOwnerLoggedIn(false);
    setOwnerLoggedIn(false);
    setCurrentUser(null);
    setViewingUser(DEMO_OTHER_USERS[0]);
    handleNavigate('home');
  };

  const handleOpenPreview = (url: string, name: string) => {
    setPreviewState({
      isOpen: true,
      url,
      name,
    });
  };

  const handleClosePreview = () => {
    setPreviewState({
      isOpen: false,
      url: null,
      name: '',
    });
  };

  const scrollToMerge = () => {
    if (activePage !== 'home') {
      handleNavigate('home');
      setTimeout(() => {
        const el = document.getElementById('merge-tool');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('merge-tool');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToFAQ = () => {
    handleNavigate('faq');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-[#111827] flex flex-col selection:bg-gray-900 selection:text-white">
      {/* Navigation */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenUpload={scrollToMerge}
        currentUser={currentUser}
        onSignOut={handleSignOut}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activePage === 'about' && (
          <AboutPage onGoToMerge={() => handleNavigate('home')} />
        )}

        {activePage === 'how-it-works' && (
          <HowItWorksPage onGoToMerge={() => handleNavigate('home')} />
        )}

        {activePage === 'faq' && (
          <FAQPage onGoToMerge={() => handleNavigate('home')} />
        )}

        {activePage === 'privacy-policy' && (
          <PrivacyPolicyPage />
        )}

        {activePage === 'terms-of-service' && (
          <TermsOfServicePage />
        )}

        {activePage === 'cookies-policy' && (
          <CookiesPolicyPage />
        )}

        {activePage === 'contact' && (
          <ContactPage onNavigateFAQ={navigateToFAQ} />
        )}

        {activePage === 'sign-in' && (
          <SignInPage
            onGoHome={() => handleNavigate('home')}
            onSuccess={handleSignInSuccess}
            onNavigateSignUp={() => handleNavigate('sign-up')}
          />
        )}

        {activePage === 'sign-up' && (
          <SignUpPage
            onGoHome={() => handleNavigate('home')}
            onNavigateSignIn={() => handleNavigate('sign-in')}
            onNavigateTerms={() => handleNavigate('terms-of-service')}
            onNavigatePrivacy={() => handleNavigate('privacy-policy')}
            onAccountCreated={handleAccountCreated}
          />
        )}

        {activePage === 'profile' && (
          <ProfilePage
            currentUser={currentUser}
            viewingUser={viewingUser}
            onGoHome={() => handleNavigate('home')}
            onSignOut={handleSignOut}
            onSelectUserToView={(selected) => {
              setViewingUser(selected);
              if (currentUser && selected.id === currentUser.id) {
                window.location.hash = '#profile';
              } else if (selected.id === 'user-sarah') {
                window.location.hash = '#profile-sarah';
              } else if (selected.id === 'user-alex') {
                window.location.hash = '#profile-alex';
              }
            }}
            onUpdateCurrentUser={(updated) => {
              setCurrentUser(updated);
              setViewingUser(updated);
            }}
          />
        )}

        {/* Dedicated Site Owner Page */}
        {activePage === 'site-owner' && (
          ownerLoggedIn || currentUser?.role === 'owner' ? (
            <SiteOwnerDashboard
              onGoHome={() => handleNavigate('home')}
              onSignOutOwner={handleSignOut}
            />
          ) : (
            <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-[#fafbfc]">
              <div className="w-full max-w-md bg-white rounded-3xl border border-gray-200/90 p-8 sm:p-10 shadow-lg space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-[#111827] text-white flex items-center justify-center mx-auto shadow-sm">
                    <ShieldCheck className="w-6 h-6 text-amber-400" />
                  </div>
                  <h1 className="text-2xl font-black text-gray-950 tracking-tight">
                    Site Owner Access
                  </h1>
                  <p className="text-xs text-gray-500">
                    Restricted administrative portal. Enter your credentials to continue.
                  </p>
                </div>

                {ownerLoginError && (
                  <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>{ownerLoginError}</span>
                  </div>
                )}

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setOwnerLoginError(null);
                    const isValid = verifySiteOwnerCredentials(ownerUsernameInput, ownerPasswordInput);
                    if (!isValid) {
                      setOwnerLoginError('Invalid credentials. Please verify your username and password.');
                      return;
                    }
                    setSiteOwnerLoggedIn(true);
                    setOwnerLoggedIn(true);
                    const cfg = getSiteConfig();
                    const ownerUser: UserProfile = {
                      id: 'site-owner',
                      name: 'Site Owner',
                      email: cfg.supportEmail || 'admin@pdfmerge.com',
                      username: 'admin',
                      role: 'owner',
                      isVerified: true,
                      plan: 'Enterprise',
                      avatarColor: 'bg-black',
                      joinedDate: 'Site Creator',
                      stats: {
                        documentsMerged: 999,
                        filesUploaded: 1200,
                        storageUsedMb: 500,
                      },
                      recentActivities: [],
                    };
                    saveCurrentUser(ownerUser);
                    setCurrentUser(ownerUser);
                    setViewingUser(ownerUser);
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-gray-700">Username</label>
                    <input
                      type="text"
                      value={ownerUsernameInput}
                      onChange={(e) => setOwnerUsernameInput(e.target.value)}
                      required
                      placeholder="admin"
                      className="w-full px-4 py-2.5 rounded-full bg-[#f4f5f7] border border-gray-200 text-sm font-semibold text-gray-900 focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold text-gray-700">Password</label>
                      <span className="text-2xs text-gray-400">Default: admin123</span>
                    </div>
                    <div className="relative">
                      <input
                        type={showOwnerPassword ? 'text' : 'password'}
                        value={ownerPasswordInput}
                        onChange={(e) => setOwnerPasswordInput(e.target.value)}
                        required
                        placeholder="Enter admin password"
                        className="w-full pl-4 pr-10 py-2.5 rounded-full bg-[#f4f5f7] border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-black"
                      />
                      <button
                        type="button"
                        onClick={() => setShowOwnerPassword(!showOwnerPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        {showOwnerPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#111827] hover:bg-black text-white text-xs font-bold tracking-wide transition-all shadow-sm cursor-pointer"
                  >
                    Log In to Owner Dashboard
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => handleNavigate('home')}
                      className="text-xs text-gray-500 hover:text-black transition-colors cursor-pointer"
                    >
                      ← Return to Homepage
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )
        )}

        {activePage === 'home' && (
          <>
            {/* 1. Hero Merge Tool (H1) */}
            <MergeTool onPreviewPdf={handleOpenPreview} />

            {/* 2. How to merge PDF files online (H2 -> H3) */}
            <HowItWorks />

            {/* 3. Merging PDFs made simple (H2 -> H3) */}
            <Features />

            {/* 4. Discover PDF's products (H2 -> H3) */}
            <Products />

            {/* 5. Enterprise Standards & Specifications (H4 -> H5) */}
            <TechnicalSpecs />

            {/* 6. Frequently Asked Questions (H2 -> H3) */}
            <FAQ />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigateAbout={() => handleNavigate('about')}
        onNavigateContact={() => handleNavigate('contact')}
        onNavigatePrivacy={() => handleNavigate('privacy-policy')}
        onNavigateTerms={() => handleNavigate('terms-of-service')}
        onNavigateCookies={() => handleNavigate('cookies-policy')}
        onNavigateOwner={() => handleNavigate('site-owner')}
      />

      {/* PDF Document Preview Modal */}
      {previewState.isOpen && (
        <PreviewModal
          url={previewState.url}
          name={previewState.name}
          onClose={handleClosePreview}
        />
      )}
    </div>
  );
}
