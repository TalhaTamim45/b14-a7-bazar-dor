import React from 'react';
import Image from 'next/image';
import { getBengaliDate } from '@/lib/bengali';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const todayDate = getBengaliDate();

  return (
    <section className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* বামপাশে টেক্সট কনটেন্ট */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            {/* তারিখ আইব্রো */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold border border-slate-200">
              <span>{todayDate}</span>
            </div>

            {/* ফিগমার মূল শিরোনাম */}
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-[1.2] tracking-tight">
              আজকের বাজারের দাম <span className="text-[#05893e]">এক নজরে</span>
            </h1>

            {/* ফিগমার সাবটাইটেল */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* CTA বোতাম */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#সব-পণ্য"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-lg text-sm font-bold text-white bg-[#05893e] hover:bg-[#047f39] transition-colors shadow-xs"
              >
                <span>সব পণ্য দেখুন</span>
                <ArrowDown className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* ডানপাশে ব্যানার ইমেজ */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-xs">
              <div className="relative w-full aspect-4/3 rounded-xl overflow-hidden bg-white flex items-center justify-center">
                <Image
                  src="/bazar-hero.png"
                  alt="বাজার দর"
                  width={480}
                  height={360}
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}