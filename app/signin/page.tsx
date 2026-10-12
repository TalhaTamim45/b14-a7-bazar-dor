'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const { loginWithEmail, loginWithSocial, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // ইউজার আগেই লগইন থাকলে সরাসরি গন্তব্যে রিডাইরেক্ট
  React.useEffect(() => {
    if (user) {
      router.push(callbackUrl);
    }
  }, [user, callbackUrl, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      const err = 'ইমেইল এবং পাসওয়ার্ড উভয়ই পূরণ করা আবশ্যক';
      setErrorMessage(err);
      toast.error(err);
      return;
    }

    setIsLoading(true);
    const success = await loginWithEmail(email, password, callbackUrl);
    setIsLoading(false);

    if (!success) {
      setErrorMessage('প্রদত্ত ইমেইল বা পাসওয়ার্ড সঠিক নয়। অনুগ্রহ করে পুনরায় যাচাই করুন।');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* কার্ড বক্স */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-xl space-y-7">
          {/* হেডার */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-2xl border border-emerald-100 shadow-inner">
              🛒
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              সাইন ইন করুন
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              বাজার দর প্ল্যাটফর্মে প্রবেশ করে বিভাগীয় বাজার বিশ্লেষণ দেখুন
            </p>
          </div>

          {/* এরর মেসেজ বক্স */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-medium">
              {errorMessage}
            </div>
          )}

          {/* সাইন ইন ফর্ম */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                ইমেইল এড্রেস
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                পাসওয়ার্ড
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-slate-400 hover:text-slate-600 absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/30 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>সাইন ইন করুন</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* বিভাজক */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0">
              অথবা সোশ্যাল লগইন
            </span>
          </div>

          {/* সোশ্যাল লগইন বাটনসমূহ */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => loginWithSocial('google', callbackUrl)}
              className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs sm:text-sm font-bold text-slate-700 transition-colors shadow-2xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>গুগল</span>
            </button>

            <button
              type="button"
              onClick={() => loginWithSocial('github', callbackUrl)}
              className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs sm:text-sm font-bold text-slate-700 transition-colors shadow-2xs"
            >
              <svg className="w-4 h-4 fill-current text-slate-900" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>গিটহাব</span>
            </button>
          </div>

          {/* রেজিস্ট্রেশন পেজের লিংক */}
          <div className="text-center pt-2">
            <p className="text-xs sm:text-sm text-slate-500">
              এখনও কোনো অ্যাকাউন্ট নেই?{' '}
              <Link
                href="/signup"
                className="font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
              >
                বিনামূল্যে সাইন আপ করুন
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">লোড হচ্ছে...</div>}>
      <SignInContent />
    </Suspense>
  );
}