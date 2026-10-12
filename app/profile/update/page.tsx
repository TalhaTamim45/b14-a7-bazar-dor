'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { ArrowLeft, Check } from 'lucide-react';
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
        <div className="w-10 h-10 border-2 border-[#05893e] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-[#1d271f]/60">লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      {/* ব্যাক লিংক */}
      <div>
        <Link
          href="/profile"
          className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-semibold text-[#1d271f]/60 hover:text-[#05893e] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>প্রোফাইলে ফিরে যান</span>
        </Link>
      </div>

      {/* আপডেট ফরম কার্ড */}
      <div className="bg-white rounded-xl border border-[#e1e8e1] p-6 sm:p-8 space-y-6">
        <div className="space-y-1 border-b border-[#e1e8e1] pb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-[#1d271f]">
            তথ্য আপডেট করুন
          </h1>
          <p className="text-xs sm:text-sm text-[#1d271f]/60">
            আপনার অ্যাকাউন্টের প্রদর্শনীয় নাম পরিবর্তন করুন (BetterAuth)
          </p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-[#1d271f] uppercase tracking-wider mb-2">
              আপনার নাম (Name)
            </label>
            <input
              type="text"
              required
              placeholder="নতুন নাম লিখুন"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#e1e8e1] bg-white text-sm text-[#1d271f] focus:outline-none focus:border-[#05893e]"
            />
            <p className="text-[11px] text-[#1d271f]/60 mt-1.5">
              এই নামটি সাইটের ন্যাভবার এবং আপনার প্রোফাইল পেজে প্রদর্শিত হবে।
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-2.5 rounded-lg font-bold text-white bg-[#05893e] hover:bg-[#047f39] transition-colors disabled:opacity-50 text-sm"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>তথ্য আপডেট করুন</span>
                </>
              )}
            </button>

            <Link
              href="/profile"
              className="w-full sm:w-auto text-center px-4 py-2.5 rounded-lg text-sm font-semibold text-[#1d271f]/70 hover:bg-[#f0f5f0] transition-colors"
            >
              বাতিল করুন
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
