'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import {
  User as UserIcon,
  Mail,
  Calendar,
  ShieldCheck,
  Edit3,
  LogOut,
  ArrowRight,
  TrendingUp,
  BellRing,
} from 'lucide-react';
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
        <div className="w-12 h-12 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-500 font-medium">প্রোফাইল তথ্য লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* টপ হেডার */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          আমার প্রোফাইল
        </h1>
        <p className="text-sm text-slate-500">
          আপনার ব্যক্তিগত তথ্য ও অ্যাকাউন্ট সেটিংস পরিচালনা করুন
        </p>
      </div>

      {/* প্রোফাইল মূল কার্ড */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs relative overflow-hidden space-y-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 border-b border-slate-100 pb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
            {/* অ্যাভাটার */}
            <div className="relative">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-24 h-24 rounded-3xl object-cover border-2 border-emerald-400 shadow-md"
                />
              ) : (
                <div className="w-24 h-24 rounded-3xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-4xl font-bold border-2 border-emerald-200 shadow-inner">
                  {user.name ? user.name.charAt(0) : 'U'}
                </div>
              )}
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white text-[10px]" title="সক্রিয়">
                ✓
              </span>
            </div>

            {/* ইউজার বিবরণ */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {user.name || 'ব্যবহারকারী'}
                </h2>
                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>যাচাইকৃত গ্রাহক</span>
                </span>
              </div>

              <div className="flex items-center justify-center sm:justify-start space-x-2 text-sm text-slate-500">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>{user.email}</span>
              </div>
            </div>
          </div>

          {/* C3 রিকোয়ারমেন্ট: আপডেট বাটন যা ইউজারকে অন্য রুটে নিয়ে যায় */}
          <div className="shrink-0">
            <Link
              href="/profile/update"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/30 hover:-translate-y-0.5"
            >
              <Edit3 className="w-4 h-4" />
              <span>প্রোফাইল আপডেট করুন</span>
            </Link>
          </div>
        </div>

        {/* অ্যাকাউন্ট মেটা তথ্য */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              অ্যাকাউন্টের ধরন
            </span>
            <span className="text-sm font-bold text-slate-900 block">
              সাধারণ সদস্য (ফ্রি)
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              বাজার দর অ্যাক্সেস
            </span>
            <span className="text-sm font-bold text-emerald-700 block">
              সম্পূর্ণ আনলিমিটেড
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              নিরাপত্তা স্ট্যাটাস
            </span>
            <span className="text-sm font-bold text-slate-900 block">
              BetterAuth এনক্রিপ্টেড
            </span>
          </div>
        </div>

        {/* অ্যাকশন বাটনসমূহ */}
        <div className="pt-4 flex items-center justify-between border-t border-slate-100">
          <Link
            href="/"
            className="text-sm font-bold text-[#05893e] hover:text-emerald-700 flex items-center space-x-1"
          >
            <span>বাজারে ফিরে যান</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={() => logout()}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 transition-colors border border-rose-200"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>লগআউট করুন</span>
          </button>
        </div>
      </div>
    </div>
  );
}