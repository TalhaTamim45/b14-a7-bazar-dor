import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#e1e8e1] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#1d271f]/80">
          {/* ফিগমার বাম পাশের লেখা */}
          <div className="flex items-center space-x-2">
            <span className="text-base">🛒</span>
            <span className="font-semibold text-[#1d271f]">
              বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </span>
          </div>

          {/* ফিগমার ডান পাশের ডিসক্লেইমার */}
          <div className="text-center sm:text-right text-xs text-[#1d271f]/60 italic">
            “সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।”
          </div>
        </div>
      </div>
    </footer>
  );
}
