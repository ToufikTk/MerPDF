import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  MapPin,
  Calendar,
  ShieldCheck,
  Edit3,
  Check,
  FileText,
  Download,
  LogOut,
  ArrowLeft,
  Share2,
  HardDrive,
  Layers,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Users,
  KeyRound,
  Sparkles,
} from 'lucide-react';
import { UserProfile } from '../types/user';
import { updateUserProfileAndCredentials } from '../services/userService';

interface ProfilePageProps {
  currentUser: UserProfile | null;
  viewingUser: UserProfile;
  onGoHome: () => void;
  onSignOut: () => void;
  onSelectUserToView?: (user: UserProfile) => void;
  onUpdateCurrentUser?: (updated: UserProfile) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  currentUser,
  viewingUser,
  onGoHome,
  onSignOut,
  onSelectUserToView,
  onUpdateCurrentUser,
}) => {
  const isOwnProfile = !currentUser || currentUser.id === viewingUser.id;
  const [activeTab, setActiveTab] = useState<'documents' | 'security'>('documents');
  const [isEditing, setIsEditing] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // Helper to split full name into First Name and Last Name
  const splitName = (fullName: string) => {
    const parts = (fullName || '').trim().split(/\s+/);
    if (parts.length === 0 || !parts[0]) return { first: '', last: '' };
    if (parts.length === 1) return { first: parts[0], last: '' };
    return { first: parts[0], last: parts.slice(1).join(' ') };
  };

  // Edit form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [editError, setEditError] = useState<string | null>(null);
  const [editSuccess, setEditSuccess] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Sync form state whenever viewingUser changes
  useEffect(() => {
    const { first, last } = splitName(viewingUser.name);
    setFirstName(first);
    setLastName(last);
    setEmail(viewingUser.email || '');
    setPassword('');
    setBio(viewingUser.bio || '');
    setLocation(viewingUser.location || '');
    setEditError(null);
    setEditSuccess(null);
  }, [viewingUser]);

  const handleOpenEdit = () => {
    const { first, last } = splitName(viewingUser.name);
    setFirstName(first);
    setLastName(last);
    setEmail(viewingUser.email || '');
    setPassword('');
    setBio(viewingUser.bio || '');
    setLocation(viewingUser.location || '');
    setEditError(null);
    setEditSuccess(null);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditError(null);
    setEditSuccess(null);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setEditError(null);
    setEditSuccess(null);

    const cleanFirst = firstName.trim();
    const cleanLast = lastName.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanFirst) {
      setEditError('Please enter your First Name.');
      return;
    }

    if (!cleanEmail) {
      setEditError('Please enter your Email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setEditError('Please enter a valid email address (e.g. name@example.com).');
      return;
    }

    if (password && password.length > 0 && password.length < 6) {
      setEditError('Password must be at least 6 characters long.');
      return;
    }

    setIsSaving(true);

    const targetId = viewingUser.id || (currentUser ? currentUser.id : `usr-${Date.now()}`);
    const result = updateUserProfileAndCredentials({
      userId: targetId,
      firstName: cleanFirst,
      lastName: cleanLast,
      email: cleanEmail,
      newPassword: password.trim() ? password.trim() : undefined,
      bio: bio.trim(),
      location: location.trim(),
    });

    setIsSaving(false);

    if (!result.success || !result.user) {
      setEditError(result.error || 'Failed to update information. Please try again.');
      return;
    }

    const updated = result.user;
    if (onUpdateCurrentUser) {
      onUpdateCurrentUser(updated);
    }

    const passwordMsg = password.trim()
      ? ' Profile details and new password saved successfully!'
      : ' Profile details saved successfully!';
    setEditSuccess(passwordMsg);
    setPassword('');

    setTimeout(() => {
      setIsEditing(false);
      setEditSuccess(null);
    }, 1500);
  };

  const handleShareProfile = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  // User initials for avatar
  const getInitials = (nameStr: string) => {
    return nameStr
      .split(' ')
      .filter(Boolean)
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] pb-24">
      {/* Top Banner / Navigation breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onGoHome}
              className="inline-flex items-center text-xs sm:text-sm font-medium text-gray-600 hover:text-black transition-colors gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Merge PDF</span>
            </button>

            {!isOwnProfile && currentUser && onSelectUserToView && (
              <button
                type="button"
                onClick={() => onSelectUserToView(currentUser)}
                className="inline-flex items-center text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors gap-1.5 cursor-pointer"
              >
                <span>View My Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Profile Header Hero Card */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Banner if viewing another user */}
        {!isOwnProfile && (
          <div className="mb-6 p-4 rounded-2xl bg-blue-50/80 border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-blue-900">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>
                You are currently viewing the public profile of{' '}
                <strong className="font-semibold">{viewingUser.name}</strong>.
              </span>
            </div>
            {currentUser && onSelectUserToView && (
              <button
                type="button"
                onClick={() => onSelectUserToView(currentUser)}
                className="px-3.5 py-1.5 rounded-full bg-white text-blue-700 font-semibold border border-blue-200 hover:bg-blue-50 transition-colors text-xs self-start sm:self-auto cursor-pointer"
              >
                Switch to My Profile
              </button>
            )}
          </div>
        )}

        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            {/* Avatar & Main Details */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {/* Avatar circle */}
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full ${
                  viewingUser.avatarColor || 'bg-black'
                } text-white flex items-center justify-center font-bold text-2xl sm:text-3xl shadow-sm ring-4 ring-white border-2 border-gray-100 flex-shrink-0 select-none`}
              >
                {getInitials(viewingUser.name)}
              </div>

              {/* Name and Tags */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-950 font-sans">
                    {viewingUser.name}
                  </h1>
                  {viewingUser.isVerified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold select-none">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Verified
                    </span>
                  )}
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-800 text-xs font-medium select-none">
                    {viewingUser.plan} Member
                  </span>
                </div>

                <p className="text-sm text-gray-500 font-normal">
                  @{viewingUser.username} • {viewingUser.email}
                </p>

                {/* Bio */}
                <p className="text-sm text-gray-700 pt-1 max-w-xl leading-relaxed">
                  {viewingUser.bio || 'PDF Merge active user. Managing documents and combining files online.'}
                </p>

                {/* Metadata row */}
                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-gray-500">
                  {viewingUser.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span>{viewingUser.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>Member since {viewingUser.joinedDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 md:self-start">
              {isOwnProfile ? (
                <>
                  <button
                    type="button"
                    onClick={isEditing ? handleCancelEdit : handleOpenEdit}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-2xs cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4 text-gray-500" />
                    <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
                  </button>
                  {currentUser && (
                    <button
                      type="button"
                      onClick={onSignOut}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-red-200 text-sm font-medium text-red-600 bg-red-50/50 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  )}
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-sm cursor-pointer ${
                      isFollowing
                        ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        : 'bg-[#111827] text-white hover:bg-black'
                    }`}
                  >
                    {isFollowing ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Following</span>
                      </>
                    ) : (
                      <span>Follow</span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleShareProfile}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-2xs cursor-pointer"
                  >
                    <Share2 className="w-4 h-4 text-gray-500" />
                    <span>{copiedShare ? 'Link Copied!' : 'Share'}</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Inline Edit Form for Profile Information: First Name, Last Name, Email, Password */}
          {isEditing && isOwnProfile && (
            <form onSubmit={handleSaveProfile} className="mt-8 pt-6 border-t border-gray-100 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
                <div>
                  <h3 className="text-base font-bold text-gray-950 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#111827]" />
                    <span>Change Profile Information</span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Update your account details and login credentials below.
                  </p>
                </div>
                <span className="text-2xs text-gray-400 font-medium">All fields stay in sync</span>
              </div>

              {/* Alert Feedback Messages */}
              {editError && (
                <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>{editError}</span>
                </div>
              )}

              {editSuccess && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{editSuccess}</span>
                </div>
              )}

              {/* Name Fields: First Name and Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      placeholder="e.g. John"
                      className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#f4f5f7] border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700">
                    Last Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="e.g. Doe"
                      className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#f4f5f7] border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Email and Password Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#f4f5f7] border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                    />
                  </div>
                  <p className="text-2xs text-gray-400 pl-1">
                    Used to sign in and receive account updates.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold text-gray-700">
                      Password
                    </label>
                    <span className="text-2xs text-gray-400">Leave blank to keep current</span>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password (min. 6 chars)"
                      className="w-full pl-10 pr-10 py-2.5 rounded-full bg-[#f4f5f7] border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-2xs text-gray-400 pl-1">
                    Required when logging in after sign out.
                  </p>
                </div>
              </div>

              {/* Location and Bio */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700">
                    Location
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. San Francisco, CA"
                      className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#f4f5f7] border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 sm:col-span-1">
                  <label className="block text-xs font-semibold text-gray-700">
                    Short Bio
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={2}
                    placeholder="Share a short bio..."
                    className="w-full px-4 py-2 rounded-2xl bg-[#f4f5f7] border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-full bg-[#111827] hover:bg-black text-white font-semibold text-sm transition-all duration-150 cursor-pointer shadow-sm hover:shadow disabled:opacity-50"
                >
                  {isSaving ? 'Saving Changes...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-5 py-2.5 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* 4 Overview Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-500">Documents Merged</span>
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-950 font-sans">
              {viewingUser.stats.documentsMerged}
            </div>
            <span className="text-2xs text-gray-400 mt-0.5 block">Total operations</span>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-500">Files Uploaded</span>
              <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-950 font-sans">
              {viewingUser.stats.filesUploaded}
            </div>
            <span className="text-2xs text-gray-400 mt-0.5 block">Source files combined</span>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-500">Storage Used</span>
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <HardDrive className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-950 font-sans">
              {viewingUser.stats.storageUsedMb} MB
            </div>
            <span className="text-2xs text-emerald-600 mt-0.5 block font-medium">Within quota</span>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-500">Account Status</span>
              <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-lg font-bold text-gray-950 font-sans flex items-center gap-1.5">
              <span>Active</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-2xs text-gray-400 mt-0.5 block">Identity verified</span>
          </div>
        </div>

        {/* Content Navigation Tabs */}
        <div className="mt-8 border-b border-gray-200 flex items-center gap-6">
          <button
            type="button"
            onClick={() => setActiveTab('documents')}
            className={`pb-3.5 text-sm font-semibold transition-colors cursor-pointer border-b-2 flex items-center gap-2 ${
              activeTab === 'documents'
                ? 'border-gray-950 text-gray-950'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Documents & Activity</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`pb-3.5 text-sm font-semibold transition-colors cursor-pointer border-b-2 flex items-center gap-2 ${
              activeTab === 'security'
                ? 'border-gray-950 text-gray-950'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Security & Verification</span>
          </button>
        </div>

        {/* TAB 1: Documents & Recent Activity */}
        {activeTab === 'documents' && (
          <div className="mt-6 space-y-4">
            <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-2xs">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-bold text-gray-950">Recent Merged Documents</h3>
                <span className="text-xs text-gray-500">
                  {viewingUser.recentActivities.length} recent files
                </span>
              </div>

              {viewingUser.recentActivities.length === 0 ? (
                <div className="text-center py-10 text-gray-400 text-sm">
                  No documents merged yet. Try the Merge Tool to combine your first PDF!
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {viewingUser.recentActivities.map((act) => (
                    <div
                      key={act.id}
                      className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-gray-50/60 p-2.5 rounded-xl transition-colors"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {act.title}
                          </h4>
                          <p className="text-xs text-gray-400">
                            {act.date} • {act.size} • {act.pageCount} pages
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button
                          type="button"
                          onClick={() => alert(`Previewing ${act.title}`)}
                          className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer text-xs flex items-center gap-1"
                          title="Preview"
                        >
                          <Eye className="w-4 h-4" />
                          <span className="sm:hidden">Preview</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => alert(`Downloading ${act.title}`)}
                          className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer text-xs flex items-center gap-1"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                          <span className="sm:hidden">Download</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: Security & Verification */}
        {activeTab === 'security' && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-2xs space-y-4">
              <h3 className="text-base font-bold text-gray-950 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Verification & Identity</span>
              </h3>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-900">
                  <span>Email Verification</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">Verified ✓</span>
                </div>
                <p className="text-xs text-emerald-800">
                  Account email (<strong className="font-medium">{viewingUser.email}</strong>) has been verified.
                </p>
              </div>

              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Full Name</span>
                  <span className="font-semibold text-gray-900">{viewingUser.name}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Email Address</span>
                  <span className="font-semibold text-gray-900">{viewingUser.email}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Unique User ID</span>
                  <span className="font-mono text-gray-800">{viewingUser.id}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Current Plan</span>
                  <span className="font-semibold text-gray-900">{viewingUser.plan} Tier</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-500">Encryption Level</span>
                  <span className="font-semibold text-gray-900">256-Bit TLS in-flight</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-2xs space-y-4">
              <h3 className="text-base font-bold text-gray-950 flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-gray-800" />
                <span>Security & Credentials</span>
              </h3>
              <p className="text-xs text-gray-500">
                Manage your credentials and security features associated with this profile.
              </p>

              <div className="space-y-3 pt-2">
                {/* Dedicated Action to change info and password */}
                {isOwnProfile && (
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900 text-xs sm:text-sm">
                          Account Credentials
                        </div>
                        <div className="text-gray-500 text-2xs">
                          Change First Name, Last Name, Email, or Password
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          handleOpenEdit();
                          window.scrollTo({ top: 100, behavior: 'smooth' });
                        }}
                        className="px-3.5 py-1.5 rounded-full bg-[#111827] hover:bg-black text-white text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                      >
                        Change Info
                      </button>
                    </div>
                    <div className="text-2xs text-gray-500 flex items-center gap-1.5 pt-2 border-t border-gray-200/60">
                      <Lock className="w-3.5 h-3.5 text-gray-400" />
                      <span>Password protected. Updates take effect immediately.</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 border border-gray-100 text-xs">
                  <div>
                    <div className="font-semibold text-gray-900">Two-Factor Authentication</div>
                    <div className="text-gray-500 text-2xs">Adds an extra layer of protection</div>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-gray-200 text-gray-700 font-medium text-2xs">
                    Enabled
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 border border-gray-100 text-xs">
                  <div>
                    <div className="font-semibold text-gray-900">Session Activity</div>
                    <div className="text-gray-500 text-2xs">Current active browser session</div>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-800 font-medium text-2xs">
                    This Device
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
