import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center pb-8 border-b border-slate-800">
          {/* বাম অংশ */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-700 flex items-center justify-center p-2 shadow-xs">
                <Image
                  src="/logo-icon.png"
                  alt="বাজার দর লোগো"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-black text-white">
                বাজার <span className="text-emerald-400">দর</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 font-medium">
              বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </p>
          </div>

          {/* মধ্যবর্তী দ্রুত লিংকসমূহ */}
          <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-400 justify-start md:justify-center">
            <Link href="/" className="hover:text-emerald-400 transition-colors">
              হোম
            </Link>
            <Link href="/category/chal" className="hover:text-emerald-400 transition-colors">
              চাল
            </Link>
            <Link href="/category/dal" className="hover:text-emerald-400 transition-colors">
              ডাল
            </Link>
            <Link href="/category/tel" className="hover:text-emerald-400 transition-colors">
              তেল
            </Link>
            <Link href="/category/sobji" className="hover:text-emerald-400 transition-colors">
              সবজি
            </Link>
            <Link href="/category/mach" className="hover:text-emerald-400 transition-colors">
              মাছ
            </Link>
          </div>

          {/* ডান অংশ */}
          <div className="text-left md:text-right">
            <p className="text-xs text-amber-300/90 italic bg-amber-950/40 border border-amber-900/60 rounded-lg p-3 inline-block">
              “সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।”
            </p>
          </div>
        </div>

        {/* কপিরাইট */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© ২০২৬ বাজার দর। সর্বস্বত্ব সংরক্ষিত।</p>
          <p>
            তৈরি করা হয়েছে <span className="text-emerald-400 font-medium">Next.js & BetterAuth</span> দিয়ে।
          </p>
        </div>
      </div>
    </footer>
  );
}