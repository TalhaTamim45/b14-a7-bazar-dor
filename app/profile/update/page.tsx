'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { User, ArrowLeft, Check, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export default function UpdateProfilePage() {
  const router = useRouter();
  const { user, isLoading, updateName } = useAuth();
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error('প্রোফাইল আপডেট করতে আগে সাইন ইন করুন');
      router.push('/signin?callbackUrl=/profile/update');
    } else if (user) {
      setName(user.name || '');
    }
  }, [user, isLoading, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('নামের ঘরটি খালি রাখা যাবে না');
      return;
    }

    setIsSubmitting(true);
    // C3 Challenge: BetterAuth ইউজার আপডেট
    const success = await updateName(name.trim());
    setIsSubmitting(false);

    if (success) {
      router.push('/profile');
    }
  };

  if (isLoading || !user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-10 h-10 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-slate-500 text-sm">লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-12 space-y-6">
      {/* ব্যাক লিংক */}
      <div>
        <Link
          href="/profile"
          className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>প্রোফাইলে ফিরে যান</span>
        </Link>
      </div>

      {/* আপডেট ফরম কার্ড (C3 Challenge) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-lg space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>তথ্য পরিবর্তন</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            তথ্য আপডেট করুন
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            আপনার অ্যাকাউন্টের প্রদর্শনীয় নাম পরিবর্তন করুন (BetterAuth)
          </p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              আপনার নাম (Name)
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="নতুন নাম লিখুন"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">
              এই নামটি সাইটের ন্যাভবার এবং আপনার প্রোফাইল পেজে প্রদর্শিত হবে।
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/30 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>তথ্য আপডেট করুন</span>
                </>
              )}
            </button>

            <Link
              href="/profile"
              className="w-full sm:w-auto text-center px-5 py-3.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              বাতিল করুন
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}