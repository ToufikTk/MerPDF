import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../types/user';
import {
  createNewAccount,
  authenticateWithPassword,
  saveCurrentUser,
} from '../services/userService';
import {
  verifySiteOwnerCredentials,
  setSiteOwnerLoggedIn,
  getSiteConfig,
} from '../services/siteConfigService';

interface SignInPageProps {
  onGoHome?: () => void;
  onSuccess?: (user: UserProfile) => void;
  onNavigateSignUp?: () => void;
}

export const SignInPage: React.FC<SignInPageProps> = ({ onGoHome, onSuccess, onNavigateSignUp }) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const cleanInput = email.trim();

    if (!cleanInput) {
      setError('Please enter your email address or username.');
      return;
    }

    if (mode === 'forgot') {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccessMessage(`Password reset link sent to ${cleanInput}. Please check your inbox.`);
      }, 700);
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      if (mode === 'signin') {
        // 1. Check if user is logging in as site owner using "admin"
        if (cleanInput.toLowerCase() === 'admin' || cleanInput.toLowerCase() === 'admin@pdfmerge.com') {
          const isOwnerValid = verifySiteOwnerCredentials('admin', password);
          if (!isOwnerValid) {
            setError('Access denied: Invalid site owner password. Please enter the correct site owner password.');
            return;
          }

          setSiteOwnerLoggedIn(true);
          const currentConfig = getSiteConfig();
          const ownerUser: UserProfile = {
            id: 'site-owner',
            name: 'Site Owner',
            email: currentConfig.supportEmail || 'admin@pdfmerge.com',
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
          setSuccessMessage('Welcome, Site Owner! Accessing Site Owner Dashboard...');
          if (onSuccess) {
            onSuccess(ownerUser);
          }
          return;
        }

        // 2. Standard user authentication
        const result = authenticateWithPassword(cleanInput, password);
        if (!result.success || !result.user) {
          setError(result.error || 'Access denied: Authentication failed. Please check your credentials.');
          return;
        }

        const user = result.user;
        setSuccessMessage(`Welcome back! You are now signed in as ${user.name}.`);
        if (onSuccess) {
          onSuccess(user);
        }
      } else if (mode === 'signup') {
        // Internal fallback signup mode
        const user = createNewAccount({
          name: name.trim() || cleanInput.split('@')[0],
          email: cleanInput,
          password: password,
          isVerified: true,
        });

        setSuccessMessage(`Account created successfully! Welcome, ${user.name}.`);
        if (onSuccess) {
          onSuccess(user);
        }
      }
    }, 600);
  };

  const handleGoogleSignIn = () => {
    setGoogleLoading(true);
    setError(null);
    setTimeout(() => {
      setGoogleLoading(false);
      const demoEmail = email.trim() || 'user@gmail.com';
      const user = createNewAccount({
        name: name.trim() || 'Google User',
        email: demoEmail,
        isVerified: true,
      });
      setSuccessMessage('Successfully authenticated with Google account.');
      if (onSuccess) {
        onSuccess(user);
      }
    }, 800);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-white">
      {/* Return home button */}
      <div className="w-full max-w-md mb-6">
        {onGoHome && (
          <button
            type="button"
            onClick={onGoHome}
            className="inline-flex items-center text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Merge PDF
          </button>
        )}
      </div>

      <div className="w-full max-w-md">
        {/* Header matching exact layout */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 font-sans">
            {mode === 'signin' && 'Sign in'}
            {mode === 'signup' && 'Sign up'}
            {mode === 'forgot' && 'Reset password'}
          </h1>
          <p className="mt-1.5 text-sm text-gray-500">
            {mode === 'signin' && 'Welcome back! Please enter your account email and password.'}
            {mode === 'signup' && 'Create your account to start merging and managing PDFs.'}
            {mode === 'forgot' && "Enter your email address and we'll send you a recovery link."}
          </p>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-green-50 border border-green-200 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-green-800">
              <p className="font-medium">{successMessage}</p>
              {onGoHome && (
                <button
                  type="button"
                  onClick={onGoHome}
                  className="mt-2 text-xs font-semibold text-green-900 underline hover:no-underline cursor-pointer"
                >
                  Continue to Merge Tool →
                </button>
              )}
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 text-sm text-red-800">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-900">Authentication Error</p>
              <p className="text-xs text-red-700 mt-0.5 leading-relaxed">{error}</p>
            </div>
          </div>
        )}

        {mode !== 'forgot' && (
          <>
            {/* Continue with Google button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-full bg-[#eef0f3] hover:bg-[#e4e7eb] active:bg-[#dce0e5] text-sm font-medium text-gray-800 transition-colors shadow-none select-none cursor-pointer disabled:opacity-70"
            >
              {googleLoading ? (
                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                /* Authentic Google G SVG */
                <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    fill="#EA4335"
                  />
                </svg>
              )}
              <span>{mode === 'signin' ? 'Continue with Google' : 'Sign up with Google'}</span>
            </button>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-200" />
              <span className="px-3.5 text-xs text-gray-400 font-normal select-none">
                {mode === 'signin' ? 'or sign in with email' : 'or sign up with email'}
              </span>
              <div className="flex-1 border-t border-gray-200" />
            </div>
          </>
        )}

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="w-full pl-5 pr-4 py-3 rounded-full bg-[#f4f5f7] border border-gray-200 focus:outline-none focus:border-blue-500 focus:bg-white text-sm text-gray-900 placeholder-gray-400 transition-colors"
              />
            </div>
          )}

          {/* Email address / Username for site owner */}
          <div className="space-y-1">
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
                className="w-full pl-11 pr-4 py-3 rounded-full bg-[#f4f5f7] border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black focus:bg-white text-sm text-gray-900 placeholder-gray-400 transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          {mode !== 'forgot' && (
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full pl-11 pr-11 py-3 rounded-full bg-[#f4f5f7] border border-gray-200 focus:outline-none focus:border-blue-500 focus:bg-white text-sm text-gray-900 placeholder-gray-400 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          )}

          {/* Remember me & Forgot password */}
          {mode === 'signin' && (
            <div className="flex items-center justify-between pt-1 select-none">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-0 cursor-pointer"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setSuccessMessage(null);
                  setMode('forgot');
                }}
                className="text-sm font-normal text-[#0070f3] hover:text-[#0051b3] hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 px-4 rounded-full bg-[#0070f3] hover:bg-[#0060df] active:bg-[#0051b3] text-white font-medium text-sm text-center shadow-none transition-all duration-150 cursor-pointer disabled:opacity-70 flex items-center justify-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : mode === 'signin' ? (
              'Sign In'
            ) : mode === 'signup' ? (
              'Create Account'
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>

        {/* Bottom switcher */}
        <div className="mt-6 text-center text-sm text-gray-600">
          {mode === 'signin' && (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  if (onNavigateSignUp) {
                    onNavigateSignUp();
                  } else {
                    setError(null);
                    setSuccessMessage(null);
                    setMode('signup');
                  }
                }}
                className="text-[#0070f3] hover:text-[#0051b3] hover:underline font-normal cursor-pointer"
              >
                Sign up
              </button>
            </p>
          )}

          {mode === 'signup' && (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setSuccessMessage(null);
                  setMode('signin');
                }}
                className="text-[#0070f3] hover:text-[#0051b3] hover:underline font-normal cursor-pointer"
              >
                Sign in
              </button>
            </p>
          )}

          {mode === 'forgot' && (
            <p>
              Remember your password?{' '}
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setSuccessMessage(null);
                  setMode('signin');
                }}
                className="text-[#0070f3] hover:text-[#0051b3] hover:underline font-normal cursor-pointer"
              >
                Back to sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
