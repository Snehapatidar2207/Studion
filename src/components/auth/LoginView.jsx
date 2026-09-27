import React, { useState } from 'react';
import {
  Sparkles,
  Mail,
  Lock,
  User,
  GraduationCap,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  X,
  Zap,
  Timer,
  BookOpen,
  Award,
  ShieldCheck,
  KeyRound,
  RotateCcw
} from 'lucide-react';
import { useStudion } from '../../context/StudionContext';

export const LoginView = () => {
  const {
    loginUser,
    signupUser,
    showAuthView,
    setShowAuthView,
    currentUser,
    addToast
  } = useStudion();

  // Mode: 'login' | 'signup' | 'forgot'
  const [authMode, setAuthMode] = useState('login');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('alex.rivera@university.edu');
  const [loginPassword, setLoginPassword] = useState('studion2026!');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Sign up form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupMajor, setSignupMajor] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Forgot password form state
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!showAuthView) return null;

  // Email validation regex
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Password strength calculator
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: 'Empty', color: 'bg-zinc-700' };
    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 10) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 2) return { score, label: 'Weak', color: 'bg-rose-500' };
    if (score <= 3) return { score, label: 'Fair', color: 'bg-amber-500' };
    if (score <= 4) return { score, label: 'Good', color: 'bg-purple-500' };
    return { score, label: 'Strong', color: 'bg-emerald-500' };
  };

  // Handle Login submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!loginEmail.trim()) {
      newErrors.loginEmail = 'Email address is required';
    } else if (!validateEmail(loginEmail)) {
      newErrors.loginEmail = 'Please enter a valid email address';
    }

    if (!loginPassword) {
      newErrors.loginPassword = 'Password is required';
    } else if (loginPassword.length < 6) {
      newErrors.loginPassword = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      loginUser(loginEmail, loginPassword, rememberMe);
      setIsSubmitting(false);
    }, 600);
  };

  // Handle Sign Up submission
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!signupName.trim() || signupName.trim().length < 2) {
      newErrors.signupName = 'Please enter your full name (at least 2 letters)';
    }

    if (!signupEmail.trim()) {
      newErrors.signupEmail = 'Email address is required';
    } else if (!validateEmail(signupEmail)) {
      newErrors.signupEmail = 'Please enter a valid academic or personal email';
    }

    if (!signupPassword) {
      newErrors.signupPassword = 'Password is required';
    } else if (signupPassword.length < 6) {
      newErrors.signupPassword = 'Password must be at least 6 characters';
    }

    if (signupPassword !== signupConfirmPassword) {
      newErrors.signupConfirmPassword = 'Passwords do not match';
    }

    if (!agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the Terms of Service';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      signupUser(signupName.trim(), signupEmail.trim(), signupPassword, signupMajor.trim() || 'Computer Science');
      setIsSubmitting(false);
    }, 700);
  };

  // Handle Quick Demo Login
  const handleDemoLogin = () => {
    setLoginEmail('alex.rivera@university.edu');
    setLoginPassword('studion2026!');
    loginUser('alex.rivera@university.edu', 'studion2026!', true);
  };

  // Handle Forgot Password submission
  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail.trim() || !validateEmail(forgotEmail)) {
      setErrors({ forgotEmail: 'Please enter a valid registered email' });
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setForgotSubmitted(true);
      addToast(`Password reset link sent to ${forgotEmail}`, 'success');
    }, 800);
  };

  const strength = getPasswordStrength(signupPassword);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      {/* Container modal card with split screen */}
      <div className="relative w-full max-w-5xl bg-[#121212] border border-purple-500/25 rounded-3xl shadow-[0_0_80px_rgba(138,43,226,0.25)] overflow-hidden flex flex-col lg:flex-row min-h-[640px]">
        
        {/* Dismiss / Close button */}
        <button
          onClick={() => setShowAuthView(false)}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700/50 backdrop-blur-md transition-all shadow-lg"
          title="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ============================================================ */}
        {/* LEFT SIDE: Visual Student Illustration & Atmospheric Branding */}
        {/* ============================================================ */}
        <div className="relative w-full lg:w-1/2 min-h-[260px] lg:min-h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 overflow-hidden bg-[#0C0D12]">
          {/* Background Illustration */}
          <div className="absolute inset-0 z-0">
            <img
              src="/assets/auth-illustration.jpg"
              alt="Studion Futuristic Student Workspace"
              className="w-full h-full object-cover object-center filter brightness-90 saturate-[1.1] scale-105 animate-pulse duration-[12000ms]"
            />
            {/* Ambient gradients to ensure text readability & sleek dark vibe */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D12] via-[#0C0D12]/60 to-purple-950/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0C0D12]/30 to-[#121212]" />
            <div className="absolute -top-24 -left-24 w-80 h-80 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Top Brand Banner */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-700 via-purple-600 to-indigo-500 p-0.5 shadow-[0_0_20px_rgba(138,43,226,0.6)] flex items-center justify-center">
                <div className="w-full h-full bg-[#121212] rounded-[14px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-purple-400 animate-spin duration-[6000ms]" />
                </div>
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                  STUDION
                </span>
                <span className="block text-[10px] uppercase tracking-wider font-semibold text-purple-400/80">
                  Student Operating System
                </span>
              </div>
            </div>

            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-medium backdrop-blur-md">
              <Zap className="w-3.5 h-3.5 text-purple-400" />
              <span>v2.4 Pro</span>
            </div>
          </div>

          {/* Middle Floating Badges */}
          <div className="relative z-10 my-6 sm:my-auto space-y-3">
            <div className="inline-block p-1 bg-purple-500/20 backdrop-blur-md rounded-2xl border border-purple-500/30">
              <div className="px-4 py-2 text-xs sm:text-sm font-semibold text-purple-200 flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-300" />
                <span>Engineered for Peak Academic Performance</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight drop-shadow-md">
              Master Your Semesters with{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-400 bg-clip-text text-transparent">
                Unstoppable Focus.
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-zinc-300/90 max-w-md leading-relaxed drop-shadow">
              All your assignments, flexible study timer, spaced repetition flashcards, and GPA analytics unified into one frictionless workspace.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md text-[11px] font-medium text-zinc-200">
                <Timer className="w-3.5 h-3.5 text-purple-400" />
                <span>Flexible Timer</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md text-[11px] font-medium text-zinc-200">
                <BookOpen className="w-3.5 h-3.5 text-pink-400" />
                <span>Smart Flashcards</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md text-[11px] font-medium text-zinc-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Syllabus Tracking</span>
              </div>
            </div>
          </div>

          {/* Bottom Student Testimonial */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <img
                src="/assets/student-avatar.jpg"
                alt="Student user"
                className="w-7 h-7 rounded-full border border-purple-400/40 object-cover"
              />
              <span className="text-zinc-300 font-medium">Alex Rivera & 50k+ scholars</span>
            </div>
            <span className="text-purple-300/80 font-mono text-[11px]">⚡ 99.4% Focus Score</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* RIGHT SIDE: Interactive Auth Form (Login / Sign Up / Forgot) */}
        {/* ============================================================ */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center bg-[#121212] relative">
          {/* Subtle purple backdrop ambient glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* ============================================ */}
          {/* VIEW 1: LOG IN FORM */}
          {/* ============================================ */}
          {authMode === 'login' && (
            <div className="space-y-6 relative z-10">
              {/* Header Title */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Secure Student Portal</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Welcome Back!
                </h2>
                <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                  Log in to resume your active study sessions and flashcard decks.
                </p>
              </div>

              {/* Demo Account Quick-Fill Card */}
              <div className="p-3.5 rounded-2xl bg-purple-950/20 border border-purple-500/25 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-300">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">One-Click Demo Scholar</div>
                    <div className="text-[11px] text-zinc-400 font-mono">alex.rivera@university.edu</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40 hover:border-purple-400 transition-all shadow-sm active:scale-95"
                >
                  Quick Fill
                </button>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => {
                        setLoginEmail(e.target.value);
                        if (errors.loginEmail) setErrors((prev) => ({ ...prev, loginEmail: '' }));
                      }}
                      placeholder="student@university.edu"
                      className={`w-full pl-10 pr-4 py-3 bg-zinc-900/90 border rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 transition-all ${
                        errors.loginEmail
                          ? 'border-rose-500/80 focus:ring-rose-500/40'
                          : 'border-zinc-800 focus:border-purple-500 focus:ring-purple-500/30'
                      }`}
                    />
                  </div>
                  {errors.loginEmail && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.loginEmail}</span>
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-zinc-300">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('forgot');
                        setForgotEmail(loginEmail);
                        setErrors({});
                      }}
                      className="text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => {
                        setLoginPassword(e.target.value);
                        if (errors.loginPassword) setErrors((prev) => ({ ...prev, loginPassword: '' }));
                      }}
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-11 py-3 bg-zinc-900/90 border rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 transition-all ${
                        errors.loginPassword
                          ? 'border-rose-500/80 focus:ring-rose-500/40'
                          : 'border-zinc-800 focus:border-purple-500 focus:ring-purple-500/30'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-zinc-200 transition-colors"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.loginPassword && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.loginPassword}</span>
                    </p>
                  )}
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-purple-600 focus:ring-purple-500/40 focus:ring-offset-0 transition"
                    />
                    <span className="text-xs text-zinc-300 font-medium">Remember me on this browser</span>
                  </label>
                </div>

                {/* Submit Button (Vibrant Purple with Glowing Hover Effect) */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:scale-[0.99] transition-all duration-300 shadow-[0_0_25px_rgba(138,43,226,0.45)] hover:shadow-[0_0_35px_rgba(138,43,226,0.7)] flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Log In to Studion</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Social Login Divider */}
              <div className="relative flex items-center justify-center">
                <div className="border-t border-zinc-800 w-full" />
                <span className="bg-[#121212] px-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                  Or continue with
                </span>
                <div className="border-t border-zinc-800 w-full" />
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    loginUser('google.scholar@gmail.com', 'google_auth_mock', true);
                  }}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800/80 border border-zinc-800 text-xs font-medium text-zinc-200 transition-all hover:border-zinc-700"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.4 8.9 5 12 5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.4s.2-1.7.4-2.4L1.6 7c-.8 1.6-1.3 3.4-1.3 5.3s.5 3.7 1.3 5.3l3.7-2.9z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.1-6.7-5.1L1.6 16.1C3.5 19.9 7.4 23 12 23z"
                    />
                  </svg>
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    loginUser('developer.student@github.edu', 'github_auth_mock', true);
                  }}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800/80 border border-zinc-800 text-xs font-medium text-zinc-200 transition-all hover:border-zinc-700"
                >
                  <svg className="w-4 h-4 fill-current text-zinc-300" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>GitHub</span>
                </button>
              </div>

              {/* Toggle to Sign Up */}
              <div className="pt-2 text-center text-xs text-zinc-400">
                <span>New to Studion? </span>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signup');
                    setErrors({});
                  }}
                  className="text-purple-400 hover:text-purple-300 font-semibold underline underline-offset-4 decoration-purple-500/50 hover:decoration-purple-400 transition"
                >
                  Create an Account
                </button>
              </div>
            </div>
          )}

          {/* ============================================ */}
          {/* VIEW 2: SIGN UP FORM */}
          {/* ============================================ */}
          {authMode === 'signup' && (
            <div className="space-y-5 relative z-10">
              {/* Header Title */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Join the Scholar Collective</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Create Your Account
                </h2>
                <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                  Set up your personalized academic dashboard in under 30 seconds.
                </p>
              </div>

              {/* Sign Up Form */}
              <form onSubmit={handleSignupSubmit} className="space-y-3.5">
                {/* Full Name & Major Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={signupName}
                        onChange={(e) => {
                          setSignupName(e.target.value);
                          if (errors.signupName) setErrors((prev) => ({ ...prev, signupName: '' }));
                        }}
                        placeholder="Jordan Lee"
                        className={`w-full pl-9 pr-3 py-2.5 bg-zinc-900/90 border rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 transition-all ${
                          errors.signupName
                            ? 'border-rose-500/80 focus:ring-rose-500/40'
                            : 'border-zinc-800 focus:border-purple-500 focus:ring-purple-500/30'
                        }`}
                      />
                    </div>
                    {errors.signupName && (
                      <p className="mt-1 text-[11px] text-rose-400">{errors.signupName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Major / Study Field
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={signupMajor}
                        onChange={(e) => setSignupMajor(e.target.value)}
                        placeholder="Biomedical Eng '27"
                        className="w-full pl-9 pr-3 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Academic or Personal Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={signupEmail}
                      onChange={(e) => {
                        setSignupEmail(e.target.value);
                        if (errors.signupEmail) setErrors((prev) => ({ ...prev, signupEmail: '' }));
                      }}
                      placeholder="jordan.lee@university.edu"
                      className={`w-full pl-9 pr-3 py-2.5 bg-zinc-900/90 border rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 transition-all ${
                        errors.signupEmail
                          ? 'border-rose-500/80 focus:ring-rose-500/40'
                          : 'border-zinc-800 focus:border-purple-500 focus:ring-purple-500/30'
                      }`}
                    />
                  </div>
                  {errors.signupEmail && (
                    <p className="mt-1 text-[11px] text-rose-400">{errors.signupEmail}</p>
                  )}
                </div>

                {/* Password & Confirm Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={signupPassword}
                        onChange={(e) => {
                          setSignupPassword(e.target.value);
                          if (errors.signupPassword) setErrors((prev) => ({ ...prev, signupPassword: '' }));
                        }}
                        placeholder="••••••••"
                        className={`w-full pl-9 pr-8 py-2.5 bg-zinc-900/90 border rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 transition-all ${
                          errors.signupPassword
                            ? 'border-rose-500/80 focus:ring-rose-500/40'
                            : 'border-zinc-800 focus:border-purple-500 focus:ring-purple-500/30'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-zinc-400 hover:text-zinc-200"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                        <KeyRound className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={signupConfirmPassword}
                        onChange={(e) => {
                          setSignupConfirmPassword(e.target.value);
                          if (errors.signupConfirmPassword) setErrors((prev) => ({ ...prev, signupConfirmPassword: '' }));
                        }}
                        placeholder="••••••••"
                        className={`w-full pl-9 pr-3 py-2.5 bg-zinc-900/90 border rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 transition-all ${
                          errors.signupConfirmPassword
                            ? 'border-rose-500/80 focus:ring-rose-500/40'
                            : 'border-zinc-800 focus:border-purple-500 focus:ring-purple-500/30'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Password strength meter */}
                {signupPassword && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-zinc-400">Strength:</span>
                      <span className="font-semibold text-zinc-200">{strength.label}</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden flex gap-1">
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <div
                          key={lvl}
                          className={`h-full flex-1 rounded-full transition-all duration-300 ${
                            strength.score >= lvl ? strength.color : 'bg-zinc-800'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Error banner if any */}
                {(errors.signupPassword || errors.signupConfirmPassword) && (
                  <p className="text-[11px] text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.signupPassword || errors.signupConfirmPassword}</span>
                  </p>
                )}

                {/* Terms agreement */}
                <label className="flex items-start gap-2 pt-1 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => {
                      setAgreeTerms(e.target.checked);
                      if (errors.agreeTerms) setErrors((prev) => ({ ...prev, agreeTerms: '' }));
                    }}
                    className="mt-0.5 w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-purple-600 focus:ring-purple-500/40"
                  />
                  <span className="text-[11px] text-zinc-400 leading-snug">
                    I agree to Studion's{' '}
                    <span className="text-purple-400 hover:underline">Honor Code</span> &{' '}
                    <span className="text-purple-400 hover:underline">Privacy Policy</span>.
                  </span>
                </label>
                {errors.agreeTerms && (
                  <p className="text-[11px] text-rose-400">{errors.agreeTerms}</p>
                )}

                {/* Sign Up Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:scale-[0.99] transition-all duration-300 shadow-[0_0_25px_rgba(138,43,226,0.45)] hover:shadow-[0_0_35px_rgba(138,43,226,0.7)] flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Start Studying with Studion</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Toggle to Login */}
              <div className="pt-1 text-center text-xs text-zinc-400">
                <span>Already have an account? </span>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setErrors({});
                  }}
                  className="text-purple-400 hover:text-purple-300 font-semibold underline underline-offset-4 decoration-purple-500/50 hover:decoration-purple-400 transition"
                >
                  Log In
                </button>
              </div>
            </div>
          )}

          {/* ============================================ */}
          {/* VIEW 3: FORGOT PASSWORD FORM */}
          {/* ============================================ */}
          {authMode === 'forgot' && (
            <div className="space-y-6 relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-2">
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Account Recovery</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Reset Password
                </h2>
                <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                  Enter your email address and we'll send you a secure link to reset your password.
                </p>
              </div>

              {forgotSubmitted ? (
                <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/30 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Reset Link Dispatched!</h3>
                  <p className="text-xs text-zinc-300">
                    We've sent password reset instructions to <br />
                    <span className="font-mono text-purple-300 font-semibold">{forgotEmail}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setForgotSubmitted(false);
                    }}
                    className="mt-2 px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md transition"
                  >
                    Return to Log In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Your Registered Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => {
                          setForgotEmail(e.target.value);
                          if (errors.forgotEmail) setErrors({});
                        }}
                        placeholder="student@university.edu"
                        className="w-full pl-10 pr-4 py-3 bg-zinc-900/90 border border-zinc-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none transition-all"
                      />
                    </div>
                    {errors.forgotEmail && (
                      <p className="mt-1 text-xs text-rose-400">{errors.forgotEmail}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all shadow-[0_0_25px_rgba(138,43,226,0.45)] hover:shadow-[0_0_35px_rgba(138,43,226,0.7)] flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <span>Send Reset Link</span>
                    )}
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('login');
                        setErrors({});
                      }}
                      className="text-xs text-zinc-400 hover:text-zinc-200 transition"
                    >
                      ← Back to Log In
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Continue as Guest option */}
          <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500">
            <span>Exploring features?</span>
            <button
              type="button"
              onClick={() => setShowAuthView(false)}
              className="text-zinc-400 hover:text-purple-300 font-medium transition"
            >
              Continue as Guest Scholar →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
