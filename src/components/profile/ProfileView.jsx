import React, { useState, useRef, useEffect } from 'react';
import {
  User,
  Mail,
  GraduationCap,
  BookOpen,
  Calendar,
  Lock,
  Eye,
  EyeOff,
  Camera,
  CheckCircle2,
  Sparkles,
  Bell,
  ShieldCheck,
  Building,
  Upload,
  RotateCcw,
  AlertCircle
} from 'lucide-react';
import { useStudion } from '../../context/StudionContext';

export const ProfileView = () => {
  const { currentUser, updateUserProfile, addToast, triggerConfetti } = useStudion();

  // Form states initialized with currentUser values
  const [fullName, setFullName] = useState(currentUser?.name || 'Alex Rivera');
  const [email] = useState(currentUser?.email || 'alex.rivera@studion.edu');
  const [university, setUniversity] = useState(
    currentUser?.university || 'Stanford University'
  );
  const [major, setMajor] = useState(
    currentUser?.major || 'Computer Science'
  );
  const [semester, setSemester] = useState(
    currentUser?.semester || 'Semester 4 / Year 2'
  );
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    currentUser?.notificationsEnabled !== undefined ? currentUser.notificationsEnabled : true
  );

  // Profile avatar state
  const [avatarPreview, setAvatarPreview] = useState(
    currentUser?.avatar || '/assets/student-avatar.jpg'
  );
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [validationError, setValidationError] = useState('');

  const fileInputRef = useRef(null);

  // Sync state if currentUser changes from outside
  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.name || 'Alex Rivera');
      setUniversity(currentUser.university || 'Stanford University');
      setMajor(currentUser.major || 'Computer Science');
      setSemester(currentUser.semester || 'Semester 4 / Year 2');
      if (currentUser.avatar) setAvatarPreview(currentUser.avatar);
      if (currentUser.notificationsEnabled !== undefined) {
        setNotificationsEnabled(currentUser.notificationsEnabled);
      }
    }
  }, [currentUser]);

  // Handle local image file upload
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        addToast('Image size should be less than 5MB', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        addToast('New profile photo selected! Click Save Changes to keep it.', 'info');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    if (!fullName.trim()) {
      setValidationError('Full Name cannot be empty.');
      return;
    }

    if (newPassword && newPassword.length < 6) {
      setValidationError('New password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);

    // Simulate brief save action
    setTimeout(() => {
      updateUserProfile({
        name: fullName.trim(),
        university: university.trim(),
        major: major.trim(),
        semester: semester.trim(),
        avatar: avatarPreview,
        notificationsEnabled,
      });

      setIsSubmitting(false);
      setSaveSuccess(true);
      if (newPassword) {
        setNewPassword('');
        addToast('Password updated securely!', 'success');
      }

      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 400);
  };

  return (
    <div className="min-h-full py-4 sm:py-8 px-2 sm:px-4">
      {/* Centralized Glassmorphic Profile Card */}
      <div className="max-w-2xl mx-auto relative">
        {/* Ambient Purple Backdrop Glow */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-700/15 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="bg-[#121212] border border-purple-500/20 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-2xl shadow-purple-950/30 transition-all">
          {/* 1. Header: Circular Profile Picture & Full Name */}
          <div className="flex flex-col items-center text-center pb-8 border-b border-[#202236]">
            {/* Circular Profile Picture with Camera Icon Overlay */}
            <div
              className="relative group cursor-pointer"
              onMouseEnter={() => setIsAvatarHovered(true)}
              onMouseLeave={() => setIsAvatarHovered(false)}
              onClick={handleAvatarClick}
              title="Click to change profile picture"
            >
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-purple-600 via-indigo-500 to-purple-400 shadow-xl shadow-purple-900/40">
                <img
                  src={avatarPreview}
                  alt={fullName}
                  className="w-full h-full rounded-full object-cover bg-[#161724]"
                  onError={(e) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80';
                  }}
                />
                {/* Hover overlay hint */}
                <div
                  className={`absolute inset-1 rounded-full bg-black/50 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-200 ${
                    isAvatarHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <span className="text-[11px] font-semibold text-white tracking-wide">
                    Change Photo
                  </span>
                </div>
              </div>

              {/* Small Camera/Edit Icon Overlay */}
              <button
                type="button"
                className="absolute bottom-1 right-1 p-2 sm:p-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-950/60 border-2 border-[#121212] hover:scale-110 active:scale-95 transition-all cursor-pointer"
                title="Upload new profile picture"
                id="profile-camera-btn"
              >
                <Camera className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>

              {/* Hidden File Input for Image Upload */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                id="profile-avatar-upload"
              />
            </div>

            {/* User Full Name Displayed Below Profile Picture */}
            <div className="mt-4 space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
                <span>{fullName || 'Student Scholar'}</span>
                <Sparkles className="w-5 h-5 text-purple-400 shrink-0" />
              </h1>
              <p className="text-sm font-medium text-purple-300/80">
                {major ? `${major}` : 'Student Scholar'}
                {university ? ` • ${university}` : ''}
              </p>
            </div>
          </div>

          {/* Validation Alert */}
          {validationError && (
            <div className="mt-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-8">
            {/* 2. Basic Information Form */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-1 text-xs font-bold uppercase tracking-wider text-purple-400">
                <User className="w-4 h-4" />
                <span>Basic Information</span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {/* Full Name (Editable) */}
                <div>
                  <label
                    htmlFor="profile-full-name"
                    className="block text-xs font-semibold text-zinc-300 mb-1.5"
                  >
                    Full Name <span className="text-purple-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      id="profile-full-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Alex Rivera"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#181926] border border-[#2b2d42] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    />
                  </div>
                </div>

                {/* Email Address (Read-only/Disabled field, used for login) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="profile-email"
                      className="block text-xs font-semibold text-zinc-300"
                    >
                      Email Address
                    </label>
                    <span className="text-[11px] font-medium text-zinc-500 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-zinc-500" />
                      Read-only (Login ID)
                    </span>
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      id="profile-email"
                      type="email"
                      value={email}
                      disabled
                      readOnly
                      className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#141520]/80 border border-[#202236] text-sm text-zinc-400 cursor-not-allowed select-none opacity-85"
                    />
                    <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  </div>
                  <p className="mt-1 text-[11px] text-zinc-500">
                    Your email address is linked to your login credentials and cannot be changed here.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Academic Details (Crucial for Students) */}
            <div className="space-y-4 pt-2 border-t border-[#202236]">
              <div className="flex items-center gap-2 pb-1 text-xs font-bold uppercase tracking-wider text-purple-400">
                <GraduationCap className="w-4 h-4" />
                <span>Academic Details</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* School / University Name */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="profile-university"
                    className="block text-xs font-semibold text-zinc-300 mb-1.5"
                  >
                    School / University Name
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      id="profile-university"
                      type="text"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      placeholder="e.g. Stanford University, MIT, State University"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#181926] border border-[#2b2d42] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    />
                  </div>
                </div>

                {/* Course / Major */}
                <div>
                  <label
                    htmlFor="profile-major"
                    className="block text-xs font-semibold text-zinc-300 mb-1.5"
                  >
                    Course / Major
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      id="profile-major"
                      type="text"
                      value={major}
                      onChange={(e) => setMajor(e.target.value)}
                      placeholder="e.g. Computer Science, Design"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#181926] border border-[#2b2d42] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    />
                  </div>
                </div>

                {/* Current Semester / Year */}
                <div>
                  <label
                    htmlFor="profile-semester"
                    className="block text-xs font-semibold text-zinc-300 mb-1.5"
                  >
                    Current Semester / Year
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      id="profile-semester"
                      type="text"
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      placeholder="e.g. Semester 4 / Year 2, Junior"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#181926] border border-[#2b2d42] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Security & Simple Settings */}
            <div className="space-y-5 pt-2 border-t border-[#202236]">
              <div className="flex items-center gap-2 pb-1 text-xs font-bold uppercase tracking-wider text-purple-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Security & Settings</span>
              </div>

              {/* New Password Field */}
              <div>
                <label
                  htmlFor="profile-new-password"
                  className="block text-xs font-semibold text-zinc-300 mb-1.5"
                >
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    id="profile-new-password"
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password to update"
                    className="w-full pl-10 pr-12 py-3 rounded-xl bg-[#181926] border border-[#2b2d42] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors p-1"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="mt-1 text-[11px] text-zinc-500">
                  Leave blank if you do not wish to change your password.
                </p>
              </div>

              {/* App Notifications: Single custom purple toggle switch */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#161726] border border-[#24263a] hover:border-purple-500/40 transition-colors">
                <div className="flex items-center gap-3 pr-4">
                  <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      Study Reminders & Notifications
                    </h4>
                    <p className="text-xs text-zinc-400">
                      Enable push alerts for upcoming deadlines, habit streaks, and focus sessions.
                    </p>
                  </div>
                </div>

                {/* Custom Purple Toggle Switch */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={notificationsEnabled}
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  id="profile-notifications-toggle"
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212] ${
                    notificationsEnabled
                      ? 'bg-purple-600 shadow-[0_0_12px_rgba(138,43,226,0.6)]'
                      : 'bg-zinc-700'
                  }`}
                >
                  <span className="sr-only">Toggle study reminders</span>
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* 5. Prominent "Save Changes" Button with Vibrant Purple Glowing Hover Effect */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                id="profile-save-btn"
                className={`w-full py-4 px-6 rounded-2xl font-bold text-sm sm:text-base text-white flex items-center justify-center gap-2.5 transition-all duration-300 active:scale-[0.99] cursor-pointer ${
                  saveSuccess
                    ? 'bg-emerald-600 shadow-[0_0_25px_rgba(16,185,129,0.5)]'
                    : 'bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(138,43,226,0.5)] hover:shadow-[0_0_35px_rgba(138,43,226,0.85)] hover:scale-[1.01]'
                }`}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : saveSuccess ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-white" />
                    <span>Changes Saved!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
