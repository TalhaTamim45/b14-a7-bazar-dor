'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { LogOut, Edit2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error('প্রোফাইল দেখতে অনুগ্রহ করে আগে সাইন ইন করুন');
      router.push('/signin?callbackUrl=/profile');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-10 h-10 border-2 border-[#05893e] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-[#1d271f]/60 font-medium">প্রোফাইল তথ্য লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      {/* হেডার */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1d271f]">
          আমার প্রোফাইল
        </h1>
        <p className="text-sm text-[#1d271f]/60">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      {/* প্রোফাইল পরিচিতি কার্ড */}
      <div className="bg-white rounded-xl border border-[#e1e8e1] p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#e1e8e1]">
          <div className="flex items-center space-x-4">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover border border-[#e1e8e1]"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#f0f5f0] text-[#05893e] flex items-center justify-center text-2xl font-bold border border-[#e1e8e1]">
                {user.name ? user.name.charAt(0) : 'U'}
              </div>
            )}

            <div>
              <h2 className="text-xl font-bold text-[#1d271f]">
                {user.name || 'ব্যবহারকারী'}
              </h2>
              <p className="text-sm text-[#1d271f]/60">
                {user.email}
              </p>
            </div>
          </div>

          <button
            onClick={() => logout()}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-[#d03739] border border-rose-200 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>↩ সাইন আউট</span>
          </button>
        </div>

        {/* তথ্য সেকশন */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-[#1d271f] uppercase tracking-wider">
            তথ্য
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-[#fafcfa] border border-[#e1e8e1] space-y-1">
              <span className="text-xs text-[#1d271f]/60 block">পূর্ণ নাম</span>
              <span className="text-sm font-semibold text-[#1d271f] block">
                {user.name || 'উল্লেখ নেই'}
              </span>
            </div>

            <div className="p-4 rounded-lg bg-[#fafcfa] border border-[#e1e8e1] space-y-1">
              <span className="text-xs text-[#1d271f]/60 block">ইমেইল ঠিকানা</span>
              <span className="text-sm font-semibold text-[#1d271f] block">
                {user.email}
              </span>
            </div>
          </div>

          {/* C3 Challenge: তথ্য পরিবর্তন বাটন */}
          <div className="pt-2">
            <Link
              href="/profile/update"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-[#05893e] hover:bg-[#047f39] transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              <span>তথ্য পরিবর্তন করুন</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
