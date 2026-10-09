import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft, CheckCircle2, AlertCircle, ShieldCheck, KeyRound, RefreshCw, ArrowRight } from 'lucide-react';
import { createNewAccount } from '../services/userService';
import { UserProfile } from '../types/user';

interface SignUpPageProps {
  onGoHome?: () => void;
  onNavigateSignIn?: () => void;
  onNavigateTerms?: () => void;
  onNavigatePrivacy?: () => void;
  onAccountCreated?: (user: UserProfile) => void;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({
  onGoHome,
  onNavigateSignIn,
  onNavigateTerms,
  onNavigatePrivacy,
  onAccountCreated,
}) => {
  // Step 1: 'form' -> Step 2: 'verify' -> Step 3: 'success'
  const [step, setStep] = useState<'form' | 'verify' | 'success'>('form');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Verification code state
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('842916');
  const [codeResent, setCodeResent] = useState(false);
  const [createdUser, setCreatedUser] = useState<UserProfile | null>(null);

  // Email format validation
  const isValidEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address (e.g. name@example.com).');
      return;
    }

    if (!password) {
      setError('Please enter a password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (!agreeTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy to continue.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Generate new 6-digit code and advance to verification step
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedCode(code);
      setStep('verify');
    }, 500);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanInputCode = verificationCode.trim();
    if (!cleanInputCode) {
      setError('Please enter the 6-digit verification code.');
      return;
    }

    // Accept either the generated code or 842916 or any 6-digit code for testing
    if (cleanInputCode.length !== 6) {
      setError('Verification code must be exactly 6 digits.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Create user account in storage with password for secure login
      const user = createNewAccount({
        name: name.trim(),
        email: email.trim(),
        password: password,
        isVerified: true,
      });

      setCreatedUser(user);
      setStep('success');

      if (onAccountCreated) {
        onAccountCreated(user);
      }
    }, 600);
  };

  const handleResendCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setCodeResent(true);
    setError(null);
    setTimeout(() => setCodeResent(false), 3000);
  };

  const handleGoogleSignUp = () => {
    setGoogleLoading(true);
    setError(null);
    setTimeout(() => {
      setGoogleLoading(false);
      const user = createNewAccount({
        name: name.trim() || 'Google User',
        email: email.trim() || 'user@gmail.com',
        isVerified: true,
      });
      setCreatedUser(user);
      setStep('success');
      if (onAccountCreated) {
        onAccountCreated(user);
      }
    }, 700);
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
        {/* STEP 1: Registration Form */}
        {step === 'form' && (
          <>
            <div className="mb-8">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-gray-900" />
                <span>Try for free</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 font-sans">
                Sign up
              </h1>
              <p className="mt-1.5 text-sm text-gray-500">
                Create your account to start merging and managing PDFs for free.
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-6 p-3.5 rounded-2xl bg-red-50 border border-red-200 flex items-center gap-2.5 text-sm text-red-700">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Continue with Google button */}
            <button
              type="button"
              onClick={handleGoogleSignUp}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-full bg-[#eef0f3] hover:bg-[#e4e7eb] active:bg-[#dce0e5] text-sm font-medium text-gray-800 transition-colors shadow-none select-none cursor-pointer disabled:opacity-70"
            >
              {googleLoading ? (
                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              ) : (
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
              <span>Sign up with Google</span>
            </button>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-200" />
              <span className="px-3.5 text-xs text-gray-400 font-normal select-none">
                or sign up with email
              </span>
              <div className="flex-1 border-t border-gray-200" />
            </div>

            {/* Form */}
            <form onSubmit={handleInitialSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name (e.g. Vosk Visa)"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-full bg-[#f4f5f7] border border-gray-200 focus:outline-none focus:border-blue-500 focus:bg-white text-sm text-gray-900 placeholder-gray-400 transition-colors"
                />
              </div>

              {/* Email address */}
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Valid email address"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-full bg-[#f4f5f7] border border-gray-200 focus:outline-none focus:border-blue-500 focus:bg-white text-sm text-gray-900 placeholder-gray-400 transition-colors"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password (at least 6 characters)"
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

              {/* Terms Agreement Checkbox */}
              <div className="pt-1 select-none">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-gray-600 leading-relaxed">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-0 cursor-pointer"
                  />
                  <span>
                    I agree to the{' '}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        if (onNavigateTerms) onNavigateTerms();
                      }}
                      className="text-[#0070f3] hover:text-[#0051b3] hover:underline cursor-pointer"
                    >
                      Terms of Service
                    </button>{' '}
                    and{' '}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        if (onNavigatePrivacy) onNavigatePrivacy();
                      }}
                      className="text-[#0070f3] hover:text-[#0051b3] hover:underline cursor-pointer"
                    >
                      Privacy Policy
                    </button>
                    .
                  </span>
                </label>
              </div>

              {/* Submit Action Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3.5 px-4 rounded-full bg-[#0070f3] hover:bg-[#0060df] active:bg-[#0051b3] text-white font-medium text-sm text-center shadow-none transition-all duration-150 cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Create Account & Verify</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Bottom switcher to Sign in */}
            <div className="mt-7 text-center text-sm text-gray-600">
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigateSignIn) {
                      onNavigateSignIn();
                    }
                  }}
                  className="text-[#0070f3] hover:text-[#0051b3] hover:underline font-normal cursor-pointer"
                >
                  Sign in
                </button>
              </p>
            </div>
          </>
        )}

        {/* STEP 2: Email Verification */}
        {step === 'verify' && (
          <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-sm">
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3.5">
                <KeyRound className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-950">
                Verify your email
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
                We've sent a 6-digit confirmation code to{' '}
                <span className="font-semibold text-gray-800 break-all">{email}</span>.
              </p>
            </div>

            {/* Quick Demo Helper Box */}
            <div className="mb-5 p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-gray-600 block">Verification code:</span>
                <span className="font-mono font-bold text-blue-700 text-sm tracking-wider">
                  {generatedCode}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setVerificationCode(generatedCode)}
                className="px-3 py-1.5 rounded-full bg-white text-blue-700 font-semibold border border-blue-200 shadow-2xs hover:bg-blue-50 text-xs transition-colors cursor-pointer"
              >
                Auto-fill Code
              </button>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-5 p-3 rounded-2xl bg-red-50 border border-red-200 flex items-center gap-2 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {codeResent && (
              <div className="mb-5 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>A new verification code has been dispatched.</span>
              </div>
            )}

            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Enter 6-Digit Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="e.g. 842916"
                  required
                  autoFocus
                  className="w-full text-center tracking-widest font-mono text-xl py-3 rounded-full bg-[#f4f5f7] border border-gray-200 focus:outline-none focus:border-blue-500 focus:bg-white text-gray-900 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-full bg-[#0070f3] hover:bg-[#0060df] text-white font-medium text-sm text-center shadow-none transition-all cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verify & Complete Registration</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <button
                type="button"
                onClick={handleResendCode}
                className="inline-flex items-center gap-1 hover:text-gray-800 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                Resend code
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep('form');
                  setError(null);
                }}
                className="hover:text-gray-800 transition-colors cursor-pointer"
              >
                Edit details
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Success Celebration */}
        {step === 'success' && createdUser && (
          <div className="bg-white rounded-3xl border border-gray-200/80 p-8 shadow-sm text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Email Verified</span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-gray-950 mb-2">
              Welcome, {createdUser.name}!
            </h2>
            <p className="text-sm text-gray-600 mb-6 max-w-sm mx-auto">
              Your account has been created and verified. You can now see{' '}
              <span className="font-semibold text-gray-900">Hello {createdUser.name.split(' ')[0]}</span> in
              the header and manage your documents.
            </p>

            <div className="space-y-2.5">
              {onGoHome && (
                <button
                  type="button"
                  onClick={onGoHome}
                  className="w-full py-3.5 px-4 rounded-full bg-[#111827] hover:bg-black text-white font-medium text-sm transition-colors cursor-pointer shadow-sm"
                >
                  Start Merging PDFs →
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
