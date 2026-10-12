'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SignUpPage() {
  const router = useRouter();
  const { register, loginWithSocial, isLoading } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('আপনার নাম লিখুন');
      return;
    }
    if (!email.trim()) {
      setErrorMessage('ইমেইল ঠিকানা লিখুন');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('দুই পাসওয়ার্ড মেলেনি');
      return;
    }

    const success = await register(name.trim(), email.trim(), password);
    if (success) {
      router.push('/signin');
    } else {
      setErrorMessage('রেজিস্ট্রেশন ব্যর্থ হয়েছে। ইমেইলটি ইতিমধ্যে ব্যবহৃত হতে পারে।');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-4">
        {/* হোম পেজে ফিরে যাওয়ার লিংক */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-semibold text-[#1d271f]/60 hover:text-[#05893e] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← হোম পেজে ফিরে যান</span>
          </Link>
        </div>

        {/* কার্ড বক্স */}
        <div className="bg-white rounded-xl border border-[#e1e8e1] p-6 sm:p-8 space-y-6">
          {/* হেডার */}
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-[#1d271f]">
              অ্যাকাউন্ট তৈরি করুন
            </h1>
            <p className="text-xs sm:text-sm text-[#1d271f]/60">
              বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
            </p>
          </div>

          {/* এরর মেসেজ বক্স */}
          {errorMessage && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-[#d03739] text-xs font-medium">
              {errorMessage}
            </div>
          )}

          {/* সাইন আপ ফর্ম */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#1d271f] mb-1.5">
                নাম
              </label>
              <input
                type="text"
                required
                placeholder="যেমন: রহিম উদ্দিন"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#e1e8e1] bg-white text-sm text-[#1d271f] focus:outline-none focus:border-[#05893e]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1d271f] mb-1.5">
                ইমেইল
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#e1e8e1] bg-white text-sm text-[#1d271f] focus:outline-none focus:border-[#05893e]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1d271f] mb-1.5">
                পাসওয়ার্ড
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 pr-10 rounded-lg border border-[#e1e8e1] bg-white text-sm text-[#1d271f] focus:outline-none focus:border-[#05893e]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-[#1d271f]/40 hover:text-[#1d271f] absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1d271f] mb-1.5">
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <input
                type="password"
                required
                placeholder="আবার লিখুন"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#e1e8e1] bg-white text-sm text-[#1d271f] focus:outline-none focus:border-[#05893e]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-lg text-sm font-semibold text-white bg-[#05893e] hover:bg-[#047f39] transition-colors disabled:opacity-50"
            >
              {isLoading ? 'অ্যাকাউন্ট তৈরি হচ্ছে...' : 'অ্যাকাউন্ট তৈরি করুন'}
            </button>
          </form>

          {/* বিভাজক */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#e1e8e1] w-full" />
            <span className="bg-white px-3 text-xs text-[#1d271f]/50 shrink-0">
              অথবা
            </span>
          </div>

          {/* সোশ্যাল রেজিস্ট্রেশন বাটনসমূহ */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => loginWithSocial('google')}
              className="flex items-center justify-center space-x-2 py-2.5 px-3 rounded-lg border border-[#e1e8e1] hover:bg-[#fafcfa] text-xs font-semibold text-[#1d271f] transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Google দিয়ে চালিয়ে যান</span>
            </button>

            <button
              type="button"
              onClick={() => loginWithSocial('github')}
              className="flex items-center justify-center space-x-2 py-2.5 px-3 rounded-lg border border-[#e1e8e1] hover:bg-[#fafcfa] text-xs font-semibold text-[#1d271f] transition-colors"
            >
              <svg className="w-4 h-4 fill-current text-[#1d271f]" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub দিয়ে চালিয়ে যান</span>
            </button>
          </div>

          {/* সাইন ইন লিংক */}
          <div className="text-center pt-2 border-t border-[#e1e8e1]">
            <p className="text-xs text-[#1d271f]/70">
              অ্যাকাউন্ট আছে?{' '}
              <Link
                href="/signin"
                className="font-semibold text-[#05893e] hover:underline"
              >
                সাইন ইন করুন
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
