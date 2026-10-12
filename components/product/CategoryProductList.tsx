'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Product, Category, SortOption } from '@/types';
import ProductCard from '@/components/product/ProductCard';
import { toBengaliNumber } from '@/lib/bengali';
import {
  ChevronDown,
  ArrowUpDown,
  Home,
  SlidersHorizontal,
  PackageX,
} from 'lucide-react';

interface CategoryProductListProps {
  initialProducts: Product[];
  category: Category | null;
}

export default function CategoryProductList({
  initialProducts,
  category,
}: CategoryProductListProps) {
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [isSortOpen, setIsSortOpen] = useState(false);

  // সংখ্যাগতভাবে সঠিকভাবে সর্টিং সম্পাদন করা (C1 Challenge Requirement)
  const sortedProducts = useMemo(() => {
    const list = [...initialProducts];

    switch (sortOption) {
      case 'price-asc':
        // দাম: কম থেকে বেশি (Numeric ascending)
        return list.sort((a, b) => Number(a.today) - Number(b.today));

      case 'price-desc':
        // দাম: বেশি থেকে কম (Numeric descending)
        return list.sort((a, b) => Number(b.today) - Number(a.today));

      case 'default':
      default:
        // ডিফল্ট ক্রম (API থেকে প্রাপ্ত মূল ক্রম)
        return list;
    }
  }, [initialProducts, sortOption]);

  const sortLabels: Record<SortOption, string> = {
    default: 'ডিফল্ট',
    'price-asc': 'দাম: কম থেকে বেশি',
    'price-desc': 'দাম: বেশি থেকে কম',
  };

  // যদি ক্যাটাগরি অবৈধ হয় বা পণ্য শূন্য থাকে (Empty state Requirement)
  if (!category || initialProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 shadow-sm space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center text-4xl shadow-inner">
            <PackageX className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
            </h2>
            <p className="text-slate-500 max-w-md mx-auto text-sm sm:text-base">
              অনুরোধকৃত ক্যাটাগরিটি বিদ্যমান নেই অথবা বর্তমানে এর কোনো বাজার দর তালিকাভুক্ত হয়নি।
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/30"
            >
              <Home className="w-4 h-4" />
              <span>হোম পেজে ফিরে যান</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* টপ হেডার বার ও সর্টিং কন্ট্রোল */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* ক্যাটাগরি তথ্য */}
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-3xl shadow-inner shrink-0">
            {category.icon || '📦'}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                {category.nameBn} বিভাগ
              </h1>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                {toBengaliNumber(sortedProducts.length)}টি পণ্য
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              এই বিভাগের সকল পণ্যের পাইকারি ও খুচরা বর্তমান বাজারদর
            </p>
          </div>
        </div>

        {/* C1: সর্ট ড্রপডাউন (সাজান কন্ট্রোল) */}
        <div className="relative shrink-0">
          <div className="flex items-center space-x-2">
            <span className="text-xs sm:text-sm font-bold text-slate-600 flex items-center space-x-1">
              <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
              <span>সাজান:</span>
            </span>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="inline-flex items-center justify-between space-x-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white text-xs sm:text-sm font-semibold text-slate-800 shadow-2xs hover:border-emerald-300 transition-all min-w-[190px]"
              >
                <span className="truncate">{sortLabels[sortOption]}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    isSortOpen ? 'rotate-180 text-emerald-600' : ''
                  }`}
                />
              </button>

              {isSortOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setIsSortOpen(false)}
                  />
                  <div className="absolute right-0 mt-1.5 w-56 rounded-xl bg-white border border-slate-200 shadow-xl py-1.5 z-40 animate-in fade-in-50 zoom-in-95">
                    {(['default', 'price-asc', 'price-desc'] as SortOption[]).map(
                      (option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setSortOption(option);
                            setIsSortOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-xs sm:text-sm font-medium transition-colors flex items-center justify-between ${
                            sortOption === option
                              ? 'bg-emerald-50 text-emerald-700 font-bold'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span>{sortLabels[option]}</span>
                          {sortOption === option && (
                            <span className="w-2 h-2 rounded-full bg-emerald-600" />
                          )}
                        </button>
                      )
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* প্রোডাক্ট কার্ড গ্রিড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}