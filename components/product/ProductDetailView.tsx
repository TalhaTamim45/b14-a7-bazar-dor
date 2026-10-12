'use client';

import React, { useState, useMemo, useEffect } from 'react';
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
import {
  Lock,
  ArrowLeft,
  Store,
  MapPin,
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  Building2,
  Search,
  Filter,
} from 'lucide-react';

interface ProductDetailViewProps {
  product: Product | null;
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [selectedDivision, setSelectedDivision] = useState<string>('all');
  const [marketSearch, setMarketSearch] = useState<string>('');
  const [hasRedirected, setHasRedirected] = useState<boolean>(false);

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
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 shadow-sm space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-rose-50 text-rose-600 flex items-center justify-center text-4xl shadow-inner">
            🔍
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            পণ্যটি খুঁজে পাওয়া যায়নি
          </h2>
          <p className="text-slate-500 max-w-md mx-auto text-sm sm:text-base">
            আপনি যে পণ্যের তথ্য খুঁজছেন তা বর্তমানে ডাটাবেজে পাওয়া যায়নি।
          </p>
          <div>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/30"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>হোম পেজে ফিরে যান</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // যদি লোডিং চলে অথবা ইউজার লগইন না থাকে
  if (isLoading || !user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center shadow-lg space-y-6 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200 shadow-inner">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">
              সুরক্ষিত পেজ — লগইন আবশ্যক
            </h2>
            <p className="text-slate-500 text-sm">
              <span className="font-semibold text-slate-800">{product.nameBn}</span>-এর বিস্তারিত পাইকারি ও বিভাগীয় বাজারদর দেখার জন্য সাইন ইন প্রয়োজন। আপনাকে সাইন ইন পেজে নিয়ে যাওয়া হচ্ছে...
            </p>
          </div>
          <div className="pt-2">
            <Link
              href={`/signin?callbackUrl=${encodeURIComponent(`/product/${product.slug || product.id}`)}`}
              className="inline-flex items-center justify-center w-full py-3.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/30"
            >
              এখনই সাইন ইন করুন
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const change = getChangeInfo(product.change);
  const markets = product.markets || [];

  // বাজারভিত্তিক সর্বনিম্ন, সর্বোচ্চ এবং গড় দর হিসাব
  const priceStats = useMemo(() => {
    if (markets.length === 0) {
      return {
        minPrice: product.today,
        maxPrice: product.today,
        avgPrice: product.today,
      };
    }

    const allMins = markets.map((m) => m.min);
    const allMaxs = markets.map((m) => m.max);

    const minPrice = Math.min(...allMins);
    const maxPrice = Math.max(...allMaxs);
    const avgPrice = Math.round(
      markets.reduce((acc, curr) => acc + (curr.min + curr.max) / 2, 0) / markets.length
    );

    return { minPrice, maxPrice, avgPrice };
  }, [markets, product.today]);

  // অনন্য বিভাগের তালিকা
  const divisions = useMemo(() => {
    const list = Array.from(new Set(markets.map((m) => m.division).filter(Boolean)));
    return list;
  }, [markets]);

  // ফিল্টার করা বাজারসমূহ
  const filteredMarkets = useMemo(() => {
    return markets.filter((m) => {
      const matchDiv = selectedDivision === 'all' || m.division === selectedDivision;
      const matchSearch =
        !marketSearch.trim() ||
        m.market.toLowerCase().includes(marketSearch.trim().toLowerCase()) ||
        m.division.toLowerCase().includes(marketSearch.trim().toLowerCase());
      return matchDiv && matchSearch;
    });
  }, [markets, selectedDivision, marketSearch]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* ব্রেডক্রাম্ব */}
      <nav className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 font-medium">
        <Link href="/" className="hover:text-emerald-600 transition-colors">
          হোম
        </Link>
        <span>/</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-emerald-600 transition-colors"
        >
          {product.categoryNameBn || 'ক্যাটাগরি'}
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-semibold">{product.nameBn}</span>
      </nav>

      {/* ========================================================
          টপ সামারি সেকশন: Emoji + Title + Category + Unit + Price
         ======================================================== */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          {/* বাম কলাম: ইলাস্ট্রেশন ও টেক্সট */}
          <div className="flex items-start space-x-5 sm:space-x-7">
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-3xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-4xl sm:text-6xl shadow-inner shrink-0">
              {product.image || product.categoryIcon || '🛒'}
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/category/${product.category}`}
                  className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                >
                  <span>{product.categoryIcon || '🏷️'}</span>
                  <span>{product.categoryNameBn || 'নিত্যপণ্য'}</span>
                </Link>

                <span
                  className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold border ${change.bgColor} ${change.textColor} ${change.borderColor}`}
                >
                  <span>{change.text}</span>
                </span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-4xl font-black text-slate-900">
                  {product.nameBn}
                </h1>
                <p className="text-slate-500 text-xs sm:text-sm mt-1 font-medium">
                  {formatUnit(product.unit)} — আজকের গড় বাজার দর এবং জেলাভিত্তিক পাইকারি পর্যালোচনা
                </p>
              </div>
            </div>
          </div>

          {/* ডান কলাম: আজকের মূল দর হাইলাইট */}
          <div className="lg:text-right bg-slate-50 lg:bg-transparent p-5 lg:p-0 rounded-2xl border lg:border-none border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              আজকের নির্ধারিত গড় দাম
            </span>
            <div className="text-3xl sm:text-5xl font-black text-emerald-600 font-mono tracking-tight mt-1">
              {formatPrice(product.today)}
            </div>
            <span className="text-xs font-medium text-slate-500 mt-1 block">
              একক: {formatUnit(product.unit)}
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================
          প্রাইস সামারি কার্ডসমূহ (Min, Max, Avg Price Summary)
         ======================================================== */}
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center space-x-2">
          <span>মূল্য পর্যালোচনা ও পরিসংখ্যান</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* সর্বনিম্ন দাম */}
          <div className="bg-white rounded-2xl border border-emerald-200/80 p-6 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full blur-xl -translate-y-6 translate-x-6" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              সর্বনিম্ন বাজারমূল্য
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono mt-2">
              {formatPrice(priceStats.minPrice)}
            </div>
            <p className="text-xs text-slate-500 mt-1.5">
              দেশের বিভাগীয় বাজারসমূহে পাওয়া সবচেয়ে সাশ্রয়ী দাম
            </p>
          </div>

          {/* গড় দাম */}
          <div className="bg-white rounded-2xl border border-blue-200/80 p-6 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full blur-xl -translate-y-6 translate-x-6" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              জাতীয় গড় দাম
            </span>
            <div className="text-2xl sm:text-3xl font-black text-blue-700 font-mono mt-2">
              {formatPrice(priceStats.avgPrice)}
            </div>
            <p className="text-xs text-slate-500 mt-1.5">
              সকল পাইকারি ও খুচরা বাজারের সম্মিলিত মধ্যবর্তী মূল্য
            </p>
          </div>

          {/* সর্বোচ্চ দাম */}
          <div className="bg-white rounded-2xl border border-amber-200/80 p-6 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-full blur-xl -translate-y-6 translate-x-6" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              সর্বোচ্চ বাজারমূল্য
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-700 font-mono mt-2">
              {formatPrice(priceStats.maxPrice)}
            </div>
            <p className="text-xs text-slate-500 mt-1.5">
              বিভিন্ন বিভাগের সর্বোচ্চ খুচরা বিক্রয়মূল্য
            </p>
          </div>
        </div>
      </div>

      {/* ঐতিহাসিক দামের তারতম্য তুলনা */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-emerald-600" />
          <span>পূর্ববর্তী দিনের বাজারদরের তুলনা</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-xs text-slate-500 font-semibold block">আজকের দাম</span>
            <span className="text-lg font-black text-slate-900 font-mono mt-1 block">
              {formatPrice(product.today)}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-xs text-slate-500 font-semibold block">গতকালের দাম</span>
            <span className="text-lg font-black text-slate-700 font-mono mt-1 block">
              {formatPrice(product.yesterday)}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-xs text-slate-500 font-semibold block">গত সপ্তাহের দাম</span>
            <span className="text-lg font-black text-slate-700 font-mono mt-1 block">
              {formatPrice(product.lastWeek)}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-xs text-slate-500 font-semibold block">গত মাসের দাম</span>
            <span className="text-lg font-black text-slate-700 font-mono mt-1 block">
              {formatPrice(product.lastMonth)}
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================
          বাজারভিত্তিক আজকের দাম (Market-wise Prices Section)
         ======================================================== */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center space-x-2">
              <Store className="w-6 h-6 text-emerald-600" />
              <span>বাজারভিত্তিক আজকের দাম</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              বিভিন্ন বিভাগ ও আঞ্চলিক বাজারের পাইকারি ও খুচরা সর্বনিম্ন এবং সর্বোচ্চ দর
            </p>
          </div>

          {/* সার্চ ও বিভাগ ফিল্টার */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[200px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="বাজার খুঁজুন..."
                value={marketSearch}
                onChange={(e) => setMarketSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>
        </div>

        {/* বিভাগীয় ফিল্টার বাটন */}
        {divisions.length > 0 && (
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
            <button
              onClick={() => setSelectedDivision('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                selectedDivision === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              সব বিভাগ ({markets.length})
            </button>
            {divisions.map((div) => {
              const count = markets.filter((m) => m.division === div).length;
              return (
                <button
                  key={div}
                  onClick={() => setSelectedDivision(div)}
                  className={`flex items-center space-x-1 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                    selectedDivision === div
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <MapPin className="w-3 h-3" />
                  <span>{div}</span>
                  <span className="opacity-75">({toBengaliNumber(count)})</span>
                </button>
              );
            })}
          </div>
        )}

        {/* বাজারের টেবিল / কার্ড লিস্ট */}
        {filteredMarkets.length > 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600 text-xs uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-4 px-6">বাজারের নাম</th>
                    <th className="py-4 px-6">বিভাগ</th>
                    <th className="py-4 px-6 text-right">সর্বনিম্ন দর</th>
                    <th className="py-4 px-6 text-right">সর্বোচ্চ দর</th>
                    <th className="py-4 px-6 text-right">গড় দর</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredMarkets.map((m, idx) => {
                    const avg = Math.round((m.min + m.max) / 2);
                    return (
                      <tr
                        key={`${m.market}-${idx}`}
                        className="hover:bg-slate-50/80 transition-colors"
                      >
                        <td className="py-4 px-6 font-bold text-slate-900 flex items-center space-x-2">
                          <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{m.market}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span>{m.division}</span>
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right font-mono font-bold text-emerald-700">
                          {formatPrice(m.min)}
                        </td>
                        <td className="py-4 px-6 text-right font-mono font-bold text-rose-700">
                          {formatPrice(m.max)}
                        </td>
                        <td className="py-4 px-6 text-right font-mono font-bold text-slate-800">
                          {formatPrice(avg)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500">
            এই নির্বাচনের জন্য কোনো বাজারের তথ্য পাওয়া যায়নি
          </div>
        )}
      </div>
    </div>
  );
}