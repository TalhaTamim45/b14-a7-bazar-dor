'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Category, Product } from '@/types';
import { getBengaliDate } from '@/lib/bengali';
import PriceTicker from './PriceTicker';
import { Menu, X, User as UserIcon, LogOut } from 'lucide-react';

interface NavbarProps {
  categories: Category[];
  tickerProducts: Product[];
}

export default function Navbar({ categories, tickerProducts }: NavbarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [bengaliDate, setBengaliDate] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setBengaliDate(getBengaliDate());
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* প্রথম সারি: লোগো ও অথেন্টিকেশন */}
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* বামপাশে লোগো ও তারিখ */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center p-1.5 shrink-0">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর"
                width={32}
                height={32}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                বাজার <span className="text-[#05893e]">দর</span>
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {bengaliDate || 'দৈনিক বাজার দর'}
              </span>
            </div>
          </Link>

          {/* ডানপাশে অথেন্টিকেশন */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-2">
                <Link
                  href="/profile"
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                  ) : (
                    <UserIcon className="w-4 h-4 text-[#05893e]" />
                  )}
                  <span>{user.name || 'প্রোফাইল'}</span>
                </Link>

                <button
                  onClick={() => logout()}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:text-rose-600 hover:bg-slate-50 transition-colors"
                  title="সাইন আউট"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>সাইন আউট</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/signin"
                  className="px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#05893e] hover:bg-[#047f39] transition-colors"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>

          {/* মোবাইল মেনু টগল */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="মেনু"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* দ্বিতীয় সারি: ক্যাটাগরি চিপস */}
        <div className="hidden md:flex items-center space-x-1 py-2 overflow-x-auto no-scrollbar border-t border-slate-100">
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0 ${
              pathname === '/'
                ? 'bg-[#05893e] text-white'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            সকল পণ্য
          </Link>

          {categories.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                  isActive
                    ? 'bg-[#05893e] text-white font-bold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* মোবাইল মেনু */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg text-xs font-semibold bg-slate-50 text-slate-800"
            >
              সকল পণ্য
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-1 p-2 rounded-lg text-xs font-medium bg-slate-50 text-slate-800"
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col space-y-2">
            {user ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-50 text-xs font-semibold text-slate-800"
                >
                  <span>{user.name}</span>
                  <span className="text-[11px] text-[#05893e]">প্রোফাইল</span>
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full text-center py-2 text-xs font-semibold text-rose-600 bg-rose-50 rounded-lg"
                >
                  সাইন আউট
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-700"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 rounded-lg bg-[#05893e] text-white text-xs font-bold"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* প্রাইস টিকার */}
      <PriceTicker products={tickerProducts} />
    </header>
  );
}