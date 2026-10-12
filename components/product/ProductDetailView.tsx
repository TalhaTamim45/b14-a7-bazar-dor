'use client';

import React, { useMemo, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import { useAuth } from '@/lib/auth-context';
import {
  formatPrice,
  formatUnit,
  getChangeInfo,
  toBengaliNumber,
} from '@/lib/bengali';
import toast from 'react-hot-toast';
import { Lock, ArrowLeft } from 'lucide-react';

interface ProductDetailViewProps {
  product: Product | null;
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [hasRedirected, setHasRedirected] = useState(false);

  // প্রোটেক্টেড রুট হ্যান্ডলিং
  useEffect(() => {
    if (!isLoading && !user && !hasRedirected) {
      setHasRedirected(true);
      toast.error('পণ্যের বিস্তারিত দেখতে অনুগ্রহ করে আগে সাইন ইন করুন', {
        id: 'auth-required',
      });
      const callback = product ? `/product/${product.slug || product.id}` : '/';
      router.push(`/signin?callbackUrl=${encodeURIComponent(callback)}`);
    }
  }, [user, isLoading, hasRedirected, product, router]);

  // যদি পণ্য পাওয়া না যায়
  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl border border-slate-200 p-10 space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            পণ্যটি খুঁজে পাওয়া যায়নি
          </h2>
          <p className="text-slate-500 text-sm">
            আপনি যে পণ্যের তথ্য খুঁজছেন তা বর্তমানে ডাটাবেজে পাওয়া যায়নি।
          </p>
          <div>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-[#05893e] hover:bg-[#047f39]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>হোম পেজে ফিরে যান</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // যদি লোডিং বা আনঅথেন্টিকেটেড থাকে
  if (isLoading || !user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            সুরক্ষিত পেজ — সাইন ইন প্রয়োজন
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            {product.nameBn}-এর বিস্তারিত বাজার দর দেখতে অনুগ্রহ করে সাইন ইন করুন।
          </p>
          <Link
            href={`/signin?callbackUrl=${encodeURIComponent(`/product/${product.slug || product.id}`)}`}
            className="inline-block w-full py-2.5 rounded-lg text-sm font-bold text-white bg-[#05893e] hover:bg-[#047f39]"
          >
            সাইন ইন করুন
          </Link>
        </div>
      </div>
    );
  }

  const change = getChangeInfo(product.change);
  const markets = product.markets || [];

  // বাজারভিত্তিক পরিসংখ্যান হিসাব (ফিগমা কার্ডসমূহ)
  const stats = useMemo(() => {
    if (markets.length === 0) {
      return {
        minPrice: product.today,
        maxPrice: product.today,
        avgPrice: product.today,
        cheapestMarket: 'সদর বাজার',
        costliestMarket: 'কারওয়ান বাজার',
      };
    }

    let min = Infinity;
    let max = -Infinity;
    let cheapest = markets[0]?.market || '';
    let costliest = markets[0]?.market || '';
    let totalMid = 0;

    for (const m of markets) {
      if (m.min < min) {
        min = m.min;
        cheapest = m.market;
      }
      if (m.max > max) {
        max = m.max;
        costliest = m.market;
      }
      totalMid += (m.min + m.max) / 2;
    }

    return {
      minPrice: min,
      maxPrice: max,
      avgPrice: Math.round(totalMid / markets.length),
      cheapestMarket: cheapest,
      costliestMarket: costliest,
    };
  }, [markets, product.today]);

  // দাম পরিবর্তনের সারমর্ম লাইন (যেমন: গতকালের তুলনায় দাম বেড়েছে ২ টাকা)
  const diffYesterday = product.today - (product.yesterday || product.today);
  const diffText =
    diffYesterday > 0
      ? `গতকালের তুলনায় দাম বেড়েছে ${toBengaliNumber(Math.abs(diffYesterday))} টাকা`
      : diffYesterday < 0
      ? `গতকালের তুলনায় দাম কমেছে ${toBengaliNumber(Math.abs(diffYesterday))} টাকা`
      : 'গতকালের তুলনায় দাম অপরিবর্তিত';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* ব্রেডক্রাম্ব */}
      <nav className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 font-medium">
        <Link href="/" className="hover:text-[#05893e]">
          হোম
        </Link>
        <span>/</span>
        <Link href={`/category/${product.category}`} className="hover:text-[#05893e]">
          {product.categoryNameBn || 'ক্যাটাগরি'}
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-semibold">{product.nameBn}</span>
      </nav>

      {/* ========================================================
          ফিগমা টপ হেডার
         ======================================================== */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-4xl shrink-0">
            {product.image || product.categoryIcon || '🛒'}
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                {product.nameBn}
              </h1>
              <span
                className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded border ${
                  change.isUp
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : change.isDown
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}
              >
                {change.text}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              {diffText} • {formatUnit(product.unit)}
            </p>
          </div>
        </div>

        <div className="md:text-right border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
          <span className="block text-xs text-slate-500 font-medium">আজকের গড় দাম</span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
            {formatPrice(product.today)}
          </span>
        </div>
      </div>

      {/* ========================================================
          ফিগমা সামারি কার্ড ৩টি (সর্বনিম্ন, গড়, সর্বাধিক)
         ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* সর্বনিম্ন দাম */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-1.5">
          <span className="text-xs text-slate-500 font-medium block">
            সর্বনিম্ন দাম
          </span>
          <div className="text-2xl font-black text-emerald-700 font-mono">
            {formatPrice(stats.minPrice)}
          </div>
          <p className="text-xs text-slate-500">
            সবচেয়ে কম দামের বাজার: <span className="font-semibold text-slate-700">{stats.cheapestMarket}</span>
          </p>
        </div>

        {/* গড় দাম */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-1.5">
          <span className="text-xs text-slate-500 font-medium block">
            গড় দাম
          </span>
          <div className="text-2xl font-black text-slate-900 font-mono">
            {formatPrice(stats.avgPrice)}
          </div>
          <p className="text-xs text-slate-500">
            {formatUnit(product.unit)}-এর হিসাবে
          </p>
        </div>

        {/* সর্বোচ্চ দাম */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-1.5">
          <span className="text-xs text-slate-500 font-medium block">
            সর্বোচ্চ দাম
          </span>
          <div className="text-2xl font-black text-rose-700 font-mono">
            {formatPrice(stats.maxPrice)}
          </div>
          <p className="text-xs text-slate-500">
            সবচেয়ে বেশি দামের বাজার: <span className="font-semibold text-slate-700">{stats.costliestMarket}</span>
          </p>
        </div>
      </div>

      {/* ========================================================
          ফিগমা বাজারভিত্তিক আজকের দাম (টেবিল)
         ======================================================== */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden space-y-0">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900">
            বাজারভিত্তিক আজকের দাম
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 text-xs font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-6">বাজার</th>
                <th className="py-3 px-6">বিভাগ</th>
                <th className="py-3 px-6 text-right">সর্বনিম্ন</th>
                <th className="py-3 px-6 text-right">সর্বাধিক</th>
                <th className="py-3 px-6 text-right">গড়</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {markets.map((m, idx) => {
                const avg = ((m.min + m.max) / 2).toFixed(1).replace('.0', '');
                return (
                  <tr key={`${m.market}-${idx}`} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-900">
                      {m.market}
                    </td>
                    <td className="py-3.5 px-6 text-slate-600">
                      {m.division}
                    </td>
                    <td className="py-3.5 px-6 text-right font-mono font-medium text-emerald-700">
                      {formatPrice(m.min)}
                    </td>
                    <td className="py-3.5 px-6 text-right font-mono font-medium text-rose-700">
                      {formatPrice(m.max)}
                    </td>
                    <td className="py-3.5 px-6 text-right font-mono font-semibold text-slate-800">
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