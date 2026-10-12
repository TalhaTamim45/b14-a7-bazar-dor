'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Category, Product } from '@/types';
import { getBengaliDate } from '@/lib/bengali';
import PriceTicker from './PriceTicker';
import {
  Menu,
  X,
  User as UserIcon,
  LogOut,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

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
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs">
      {/* প্রধান ন্যাভবার টপ রো */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* বামপাশে লোগো এবং বাংলা তারিখ */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center p-2 shadow-xs group-hover:scale-105 transition-transform">
                <Image
                  src="/logo-icon.png"
                  alt="বাজার দর"
                  width={34}
                  height={34}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                    বাজার <span className="text-emerald-600 dark:text-emerald-400">দর</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                    লাইভ
                  </span>
                </div>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {bengaliDate || 'আজকের তাজা দর'}
                </span>
              </div>
            </Link>
          </div>

          {/* ডানপাশের অথেন্টিকেশন বাটন */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <Link
                  href="/profile"
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all border ${
                    pathname.startsWith('/profile')
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-6 h-6 rounded-full object-cover border border-emerald-400"
                    />
                  ) : (
                    <UserIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  )}
                  <span className="max-w-[120px] truncate">{user.name || 'আমার প্রোফাইল'}</span>
                </Link>

                <button
                  onClick={() => logout()}
                  className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-sm font-medium text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/30 dark:hover:bg-rose-950/50 transition-colors border border-rose-200 dark:border-rose-900"
                  title="সাইন আউট"
                >
                  <LogOut className="w-4 h-4" />
                  <span>সাইন আউট</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/signin"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-xs shadow-emerald-600/30 hover:shadow-md hover:shadow-emerald-600/20"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>

          {/* মোবাইল মেনু বাটন */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="মেনু খুলুন"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* ক্যাটাগরি নেভিগেশন বার (দ্বিতীয় সারি) */}
        <div className="hidden md:flex items-center space-x-1 py-2.5 overflow-x-auto no-scrollbar border-t border-slate-100 dark:border-slate-800/80">
          <Link
            href="/"
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all shrink-0 ${
              pathname === '/'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>🏠</span>
            <span>সকল পণ্য</span>
          </Link>

          {categories.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all shrink-0 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* মোবাইল ড্রপডাউন মেনু */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-5 space-y-3 shadow-lg">
          {/* ক্যাটাগরি লিংক তালিকা */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium ${
                pathname === '/'
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
              }`}
            >
              <span>🏠</span>
              <span>সব পণ্য</span>
            </Link>

            {categories.map((cat) => {
              const isActive = pathname === `/category/${cat.slug}`;
              return (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'bg-emerald-600 text-white font-semibold'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.nameBn}</span>
                </Link>
              );
            })}
          </div>

          {/* মোবাইল অথেন্টিকেশন বাটন */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col space-y-2">
            {user ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-semibold text-sm"
                >
                  <div className="flex items-center space-x-2">
                    <UserIcon className="w-4 h-4 text-emerald-600" />
                    <span>{user.name}</span>
                  </div>
                  <span className="text-xs bg-emerald-200 dark:bg-emerald-800 px-2 py-0.5 rounded">প্রোফাইল</span>
                </Link>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-lg text-rose-600 bg-rose-50 dark:bg-rose-950/30 text-sm font-semibold"
                >
                  <LogOut className="w-4 h-4" />
                  <span>সাইন আউট</span>
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-semibold text-sm"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center py-2.5 rounded-lg bg-emerald-600 text-white font-semibold text-sm shadow-xs"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* মারকুই প্রাইজ টিকার বার */}
      <PriceTicker products={tickerProducts} />
    </header>
  );
}