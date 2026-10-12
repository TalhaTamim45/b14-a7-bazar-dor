'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Category, Product } from '@/types';
import PriceTicker from '@/components/navbar/PriceTicker';
import { useAuth } from '@/lib/auth-context';
import { getBengaliDate } from '@/lib/bengali';
import { ChevronDown, Menu, X, User as UserIcon, LogOut } from 'lucide-react';

interface NavbarProps {
  categories: Category[];
  tickerProducts: Product[];
}

export default function Navbar({ categories, tickerProducts }: NavbarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [bengaliDate, setBengaliDate] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setBengaliDate(getBengaliDate());
  }, []);

  // ড্রপডাউন বন্ধ করার হ্যান্ডলার
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e1e8e1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* প্রথম সারি: লোগো ও অথেন্টিকেশন */}
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* বামপাশে লোগো ও তারিখ */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-lg bg-[#fafcfa] border border-[#e1e8e1] flex items-center justify-center p-1.5 shrink-0 group-hover:border-[#05893e] transition-colors">
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
              <span className="text-xl sm:text-2xl font-bold text-[#1d271f] leading-tight">
                বাজার <span className="text-[#05893e]">দর</span>
              </span>
              <span className="text-xs text-[#1d271f]/60 font-medium">
                {bengaliDate || 'দৈনিক বাজার দর'}
              </span>
            </div>
          </Link>

          {/* ডানপাশে অথেন্টিকেশন — ফিগমা স্টাইল ড্রপডাউন */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2.5 px-3 py-1.5 rounded-lg border border-[#e1e8e1] bg-white hover:bg-[#fafcfa] hover:border-[#05893e] transition-colors"
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-7 h-7 rounded-full object-cover border border-[#e1e8e1]"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#f0f5f0] text-[#05893e] flex items-center justify-center font-bold text-xs border border-[#e1e8e1]">
                      {user.name ? user.name.charAt(0) : 'U'}
                    </div>
                  )}
                  <span className="text-sm font-semibold text-[#1d271f]">
                    {user.name || 'ব্যবহারকারী'}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#1d271f]/60" />
                </button>

                {/* ফিগমার User Menu ড্রপডাউন */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-1.5 w-56 rounded-xl bg-white border border-[#e1e8e1] shadow-lg py-1.5 z-50">
                    <div className="px-4 py-2 border-b border-[#e1e8e1] bg-[#fafcfa]/60">
                      <p className="text-sm font-bold text-[#1d271f] truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-[#1d271f]/60 truncate">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-xs font-semibold text-[#1d271f] hover:bg-[#f0f5f0] hover:text-[#05893e] transition-colors"
                    >
                      <UserIcon className="w-3.5 h-3.5" />
                      <span>আমার প্রোফাইল</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-xs font-semibold text-[#d03739] hover:bg-rose-50 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>সাইন আউট</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2.5">
                <Link
                  href="/signin"
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-[#1d271f] hover:bg-[#f0f5f0] transition-colors"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#05893e] hover:bg-[#047f39] transition-colors"
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
              className="p-2 rounded-lg text-[#1d271f] hover:bg-[#f0f5f0]"
              aria-label="মেনু"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* দ্বিতীয় সারি: ক্যাটাগরি চিপস */}
        <div className="hidden md:flex items-center space-x-1.5 py-2.5 overflow-x-auto no-scrollbar border-t border-[#e1e8e1]">
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0 ${
              pathname === '/'
                ? 'bg-[#05893e] text-white'
                : 'text-[#1d271f] hover:bg-[#f0f5f0]'
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
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                  isActive
                    ? 'bg-[#05893e] text-white font-bold'
                    : 'text-[#1d271f] hover:bg-[#f0f5f0]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* মোবাইল মেনু ড্রয়ার */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#e1e8e1] bg-white px-4 py-3 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg text-xs font-semibold bg-[#f0f5f0] text-[#1d271f]"
            >
              সকল পণ্য
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-1 p-2 rounded-lg text-xs font-medium bg-[#fafcfa] text-[#1d271f]"
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-[#e1e8e1] flex flex-col space-y-2">
            {user ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2 rounded-lg bg-[#fafcfa] text-xs font-semibold text-[#1d271f]"
                >
                  <span>{user.name}</span>
                  <span className="text-[11px] text-[#05893e]">প্রোফাইল</span>
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full text-center py-2 text-xs font-semibold text-[#d03739] bg-rose-50 rounded-lg"
                >
                  সাইন আউট
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 rounded-lg border border-[#e1e8e1] text-xs font-bold text-[#1d271f]"
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
