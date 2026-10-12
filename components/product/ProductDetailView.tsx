'use client';

import React, { useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import { useAuth } from '@/lib/auth-context';
import toast from 'react-hot-toast';
import {
  formatPrice,
  formatUnit,
  getChangeInfo,
  toBengaliNumber,
} from '@/lib/bengali';

interface ProductDetailViewProps {
  product: Product;
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const change = getChangeInfo(product.change);

  // রিকোয়ারমেন্ট ৪: Protected route — requires login
  useEffect(() => {
    if (!isLoading && !user) {
      toast.error('পণ্যের বিস্তারিত মূল্য ও বাজার তুলনা দেখতে অনুগ্রহ করে আগে সাইন ইন করুন');
      const targetSlug = product.slug || product.id;
      router.push(`/signin?callbackUrl=/product/${targetSlug}`);
    }
  }, [user, isLoading, router, product]);

  // বাজার দর পরিসংখ্যান
  const markets = useMemo(() => {
    if (product.markets && product.markets.length > 0) {
      return product.markets;
    }
    const base = Number(product.today) || 100;
    return [
      { market: 'কারওয়ান বাজার', division: 'ঢাকা', min: Math.round(base * 0.94), max: Math.round(base * 1.05) },
      { market: 'মিরপুর বাজার', division: 'ঢাকা', min: Math.round(base * 0.95), max: Math.round(base * 1.06) },
      { market: 'সদর বাজার', division: 'চট্টগ্রাম', min: Math.round(base * 0.92), max: Math.round(base * 1.03) },
      { market: 'আমতলী বাজার', division: 'চট্টগ্রাম', min: Math.round(base * 0.93), max: Math.round(base * 1.04) },
      { market: 'বাসারহাট বাজার', division: 'রাজশাহী', min: Math.round(base * 0.91), max: Math.round(base * 1.02) },
      { market: 'চৌরাস্তা বাজার', division: 'সিলেট', min: Math.round(base * 0.96), max: Math.round(base * 1.08) },
      { market: 'মাঠ বাজার', division: 'ময়মনসিংহ', min: Math.round(base * 0.89), max: Math.round(base * 0.99) },
      { market: 'ডবলগেট বাজার', division: 'খুলনা', min: Math.round(base * 0.93), max: Math.round(base * 1.04) },
    ];
  }, [product]);

  const stats = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    let cheapest = '';
    let costliest = '';
    let totalMid = 0;

    for (const m of markets) {
      if (m.min < min) {
        min = m.min;
        cheapest = `${m.market} (${m.division})`;
      }
      if (m.max > max) {
        max = m.max;
        costliest = `${m.market} (${m.division})`;
      }
      totalMid += (m.min + m.max) / 2;
    }

    return {
      minPrice: min === Infinity ? product.today : min,
      maxPrice: max === -Infinity ? product.today : max,
      avgPrice: Math.round(totalMid / markets.length) || product.today,
      cheapestMarket: cheapest || 'মাঠ বাজার (ময়মনসিংহ)',
      costliestMarket: costliest || 'কারওয়ান বাজার (ঢাকা)',
    };
  }, [markets, product.today]);

  // যদি লগইন না থাকে তবে লোডিং অথবা রিডাইরেক্টিং
  if (isLoading || !user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-3">
        <div className="w-10 h-10 border-2 border-[#05893e] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-[#1d271f]/60 font-medium">নিরাপত্তা যাচাই ও রিডাইরেক্ট করা হচ্ছে...</p>
      </div>
    );
  }

  // দাম পরিবর্তনের সারমর্ম লাইন
  const diffYesterday = product.today - (product.yesterday || product.today);
  const diffText =
    diffYesterday > 0
      ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${toBengaliNumber(Math.abs(diffYesterday))} টাকা`
      : diffYesterday < 0
      ? `গতকালের তুলনায় আজ দাম কমেছে · ${toBengaliNumber(Math.abs(diffYesterday))} টাকা`
      : 'গতকালের তুলনায় দাম অপরিবর্তিত';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* ব্রেডক্রাম্ব */}
      <nav className="flex items-center space-x-2 text-xs sm:text-sm text-[#1d271f]/60 font-medium">
        <Link href="/" className="hover:text-[#05893e]">
          হোম
        </Link>
        <span>/</span>
        <Link href={`/category/${product.category}`} className="hover:text-[#05893e]">
          {product.categoryNameBn || 'ক্যাটাগরি'}
        </Link>
        <span>/</span>
        <span className="text-[#1d271f] font-semibold">{product.nameBn}</span>
      </nav>

      {/* ========================================================
          ফিগমা টপ হেডার কার্ড
         ======================================================== */}
      <div className="bg-white rounded-xl border border-[#e1e8e1] p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-xl bg-[#fafcfa] border border-[#e1e8e1] flex items-center justify-center text-4xl shrink-0">
            {product.image || product.categoryIcon || '🛒'}
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1d271f]">
              {product.nameBn}
            </h1>
            <p className="text-xs sm:text-sm text-[#1d271f]/70">
              {formatUnit(product.unit)} · {product.categoryNameBn}
            </p>
            <p className="text-xs text-[#1d271f]/60">
              {diffText}
            </p>
          </div>
        </div>

        <div className="md:text-right border-t md:border-t-0 pt-3 md:pt-0 border-[#e1e8e1]">
          <span className="block text-xs text-[#1d271f]/60 font-medium">আজকের দাম</span>
          <div className="flex items-baseline md:justify-end space-x-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#1d271f]">
              {toBengaliNumber(product.today)}
            </span>
            <span className="text-sm text-[#1d271f]/70 font-medium">
              টাকা / {product.unit}
            </span>
            <span
              className={`ml-2 inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded border ${
                change.isUp
                  ? 'bg-emerald-50 text-[#05893e] border-emerald-200'
                  : change.isDown
                  ? 'bg-rose-50 text-[#d03739] border-rose-200'
                  : 'bg-[#fafcfa] text-[#1d271f]/70 border-[#e1e8e1]'
              }`}
            >
              {change.text}
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================
          ফিগমা সামারি কার্ড ৩টি (গড়, সর্বনিম্ন, সর্বাধিক)
         ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* গড় দাম */}
        <div className="bg-white rounded-xl border border-[#e1e8e1] p-5 space-y-1.5">
          <span className="text-xs text-[#1d271f]/60 font-medium block">
            গড় দাম
          </span>
          <div className="text-2xl font-bold text-[#1d271f]">
            {formatPrice(stats.avgPrice)}
          </div>
          <p className="text-xs text-[#1d271f]/60">
            {formatUnit(product.unit)}-এর হিসাবে
          </p>
        </div>

        {/* সর্বনিম্ন দাম */}
        <div className="bg-white rounded-xl border border-[#e1e8e1] p-5 space-y-1.5">
          <span className="text-xs text-[#1d271f]/60 font-medium block">
            সর্বনিম্ন দাম
          </span>
          <div className="text-2xl font-bold text-[#05893e]">
            {formatPrice(stats.minPrice)}
          </div>
          <p className="text-xs text-[#1d271f]/60">
            সবচেয়ে কম দামের বাজার: <span className="font-semibold text-[#1d271f]">{stats.cheapestMarket}</span>
          </p>
        </div>

        {/* সর্বাধিক দাম */}
        <div className="bg-white rounded-xl border border-[#e1e8e1] p-5 space-y-1.5">
          <span className="text-xs text-[#1d271f]/60 font-medium block">
            সর্বাধিক দাম
          </span>
          <div className="text-2xl font-bold text-[#d03739]">
            {formatPrice(stats.maxPrice)}
          </div>
          <p className="text-xs text-[#1d271f]/60">
            সবচেয়ে বেশি দামের বাজার: <span className="font-semibold text-[#1d271f]">{stats.costliestMarket}</span>
          </p>
        </div>
      </div>

      {/* ========================================================
          ফিগমা বাজারভিত্তিক আজকের দাম (টেবিল)
         ======================================================== */}
      <div className="bg-white rounded-xl border border-[#e1e8e1] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e1e8e1] bg-[#fafcfa]">
          <h2 className="text-base sm:text-lg font-bold text-[#1d271f]">
            বাজারভিত্তিক আজকের দাম
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#fafcfa] text-[#1d271f]/70 text-xs font-semibold border-b border-[#e1e8e1]">
              <tr>
                <th className="py-3 px-6">বাজার</th>
                <th className="py-3 px-6">বিভাগ</th>
                <th className="py-3 px-6 text-right">সর্বনিম্ন</th>
                <th className="py-3 px-6 text-right">সর্বাধিক</th>
                <th className="py-3 px-6 text-right">গড়</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e1e8e1]">
              {markets.map((m, idx) => {
                const avg = ((m.min + m.max) / 2).toFixed(1).replace('.0', '');
                return (
                  <tr key={`${m.market}-${idx}`} className="hover:bg-[#f0f5f0]/40 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-[#1d271f]">
                      {m.market}
                    </td>
                    <td className="py-3.5 px-6 text-[#1d271f]/70">
                      {m.division}
                    </td>
                    <td className="py-3.5 px-6 text-right font-medium text-[#05893e]">
                      {formatPrice(m.min)}
                    </td>
                    <td className="py-3.5 px-6 text-right font-medium text-[#d03739]">
                      {formatPrice(m.max)}
                    </td>
                    <td className="py-3.5 px-6 text-right font-semibold text-[#1d271f]">
                      {toBengaliNumber(avg)} টাকা
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
