import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-xl space-y-6">
        <div className="w-24 h-24 mx-auto rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-5xl shadow-inner border border-emerald-100">
          🛒
        </div>

        <div className="space-y-2">
          <span className="text-sm font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            ৪০৪ — পেজটি পাওয়া যায়নি
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
            দুঃখিত, পাতাটি খুঁজে পাওয়া যাচ্ছে না
          </h1>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            আপনি যে লিংকটিতে প্রবেশের চেষ্টা করেছেন তা পরিবর্তন করা হয়েছে অথবা আর বিদ্যমান নেই।
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/30"
          >
            <Home className="w-4 h-4" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
          <Link
            href="/category/chal"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <span>চাল বিভাগ দেখুন</span>
          </Link>
        </div>
      </div>
    </div>
  );
}