import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, TrendingUp, ShieldCheck, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-slate-50 to-white pt-8 pb-14 sm:pb-20 border-b border-slate-200/60">
      {/* ব্যাকগ্রাউন্ড ডেকোরেটিভ প্যাটার্ন */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-80 h-80 bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* টেক্সট কলাম */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* আইব্রো ব্যাজ */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300/60 text-emerald-800 text-xs sm:text-sm font-bold shadow-xs">
              <Zap className="w-4 h-4 text-emerald-600 animate-bounce" />
              <span>প্রতিদিনের নির্ভরযোগ্য কাঁচাবাজার দর পোর্টাল</span>
            </div>

            {/* মূল শিরোনাম */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.15] tracking-tight">
              নিত্যপ্রয়োজনীয় পণ্যের <br />
              <span className="text-emerald-600 underline decoration-emerald-300 decoration-wavy underline-offset-6">
                সঠিক বাজার দর
              </span>{' '}
              জানুন প্রতিদিন
            </h1>

            {/* সাবটাইটেল */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              ঢাকা ও দেশের প্রধান বিভাগীয় পাইকারি ও খুচরা বাজারের চাল, ডাল, তেল, শাকসবজি এবং মাছ-মাংসের সর্বশেষ দাম ও দরপতন পর্যবেক্ষণ করুন ঘরে বসেই।
            </p>

            {/* CTA বাটন */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#সব-পণ্য"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-7 py-4 rounded-xl text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40 hover:-translate-y-0.5"
              >
                <span>সব পণ্যের দর দেখুন</span>
                <ArrowDown className="w-5 h-5 animate-pulse" />
              </a>

              <a
                href="#দাম-পরিবর্তন"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-4 rounded-xl text-base font-semibold text-slate-700 hover:text-emerald-700 bg-white hover:bg-slate-100 transition-all border border-slate-300 shadow-xs"
              >
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <span>আজকের ওঠানামা</span>
              </a>
            </div>

            {/* ফিচার ব্যাজসমূহ */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-slate-200/80 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <span className="block text-xl sm:text-2xl font-black text-slate-900">৮+</span>
                <span className="text-xs text-slate-500 font-medium">প্রধান ক্যাটাগরি</span>
              </div>
              <div className="text-center lg:text-left">
                <span className="block text-xl sm:text-2xl font-black text-emerald-600">১২+</span>
                <span className="text-xs text-slate-500 font-medium">বিভাগীয় বাজার</span>
              </div>
              <div className="text-center lg:text-left">
                <span className="block text-xl sm:text-2xl font-black text-amber-600">১০০%</span>
                <span className="text-xs text-slate-500 font-medium">দৈনিক হালনাগাদ</span>
              </div>
            </div>
          </div>

          {/* হিরো ইমেজ কলাম */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-none">
              {/* গ্লো ইফেক্ট */}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-amber-500/20 rounded-3xl blur-2xl transform scale-95" />
              
              <div className="relative bg-white/80 backdrop-blur-xs border border-emerald-100 rounded-3xl p-4 sm:p-6 shadow-2xl">
                <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-emerald-50 flex items-center justify-center">
                  <Image
                    src="/bazar-hero.png"
                    alt="বাজার দর হিরো ব্যানার"
                    width={520}
                    height={390}
                    className="object-contain w-full h-full hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>

                {/* ফ্লোটিং ব্যাজ */}
                <div className="mt-4 flex items-center justify-between bg-emerald-50/80 border border-emerald-200/60 rounded-xl px-4 py-2.5">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                      ৳
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">সরাসরি পাইকারি মূল্য</span>
                      <span className="text-[11px] text-slate-500">কারওয়ান বাজার ও অন্যান্য</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-full">
                    সক্রিয়
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}