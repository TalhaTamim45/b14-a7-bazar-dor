import React from 'react';
import Image from 'next/image';
import { getBengaliDate } from '@/lib/bengali';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const todayDate = getBengaliDate();

  return (
    <section className="bg-white border-b border-[#e1e8e1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* বামপাশে টেক্সট কনটেন্ট */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            {/* তারিখ আইব্রো */}
            <div className="inline-flex items-center px-3 py-1 rounded-md bg-[#fafcfa] text-[#1d271f]/80 text-xs sm:text-sm font-medium border border-[#e1e8e1]">
              <span>{todayDate}</span>
            </div>

            {/* ফিগমার মূল শিরোনাম */}
            <h1 className="text-3xl sm:text-5xl font-bold text-[#1d271f] leading-tight tracking-tight">
              আজকের বাজারের দাম <span className="text-[#05893e]">এক নজরে</span>
            </h1>

            {/* ফিগমার সাবটাইটেল */}
            <p className="text-base sm:text-lg text-[#1d271f]/70 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম প্রতিদিন আপডেট করা হয়।
            </p>

            {/* CTA বোতাম */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#সব-পণ্য"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#05893e] hover:bg-[#047f39] transition-colors"
              >
                <span>সব পণ্য দেখুন</span>
                <ArrowDown className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* ডানপাশে ব্যানার ইমেজ */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md rounded-xl border border-[#e1e8e1] bg-[#fafcfa] p-4">
              <div className="relative w-full aspect-4/3 rounded-lg overflow-hidden bg-white flex items-center justify-center">
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
