'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Product, Category, SortOption } from '@/types';
import ProductCard from '@/components/product/ProductCard';
import { toBengaliNumber } from '@/lib/bengali';
import { ChevronDown, SlidersHorizontal, ArrowLeft } from 'lucide-react';

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

  // সংখ্যাগতভাবে সর্টিং সম্পাদন করা (C1 Challenge)
  const sortedProducts = useMemo(() => {
    const list = [...initialProducts];
    switch (sortOption) {
      case 'price-asc':
        return list.sort((a, b) => Number(a.today) - Number(b.today));
      case 'price-desc':
        return list.sort((a, b) => Number(b.today) - Number(a.today));
      case 'default':
      default:
        return list;
    }
  }, [initialProducts, sortOption]);

  const sortLabels: Record<SortOption, string> = {
    default: 'ডিফল্ট',
    'price-asc': 'দাম: কম থেকে বেশি',
    'price-desc': 'দাম: বেশি থেকে কম',
  };

  // খালি ক্যাটাগরি অবস্থা
  if (!category || initialProducts.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-xl border border-[#e1e8e1] p-8 space-y-4">
          <h2 className="text-xl font-bold text-[#1d271f]">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
          </h2>
          <p className="text-[#1d271f]/60 text-sm">
            অনুরোধকৃত ক্যাটাগরিতে বর্তমানে কোনো পণ্যের দর তালিকাভুক্ত নেই।
          </p>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-[#05893e] hover:bg-[#047f39]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* টপ হেডার ও সর্ট কন্ট্রোল */}
      <div className="bg-white rounded-xl border border-[#e1e8e1] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-lg bg-[#fafcfa] border border-[#e1e8e1] flex items-center justify-center text-3xl shrink-0">
            {category.icon || '📦'}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#1d271f]">
              {category.nameBn} বিভাগ
            </h1>
            <p className="text-xs text-[#1d271f]/60 mt-0.5">
              মোট {toBengaliNumber(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
            </p>
          </div>
        </div>

        {/* C1: সর্ট ড্রপডাউন */}
        <div className="relative">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-[#1d271f]/60 flex items-center space-x-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>সাজান:</span>
            </span>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="inline-flex items-center justify-between space-x-2 px-3.5 py-2 rounded-lg border border-[#e1e8e1] bg-white text-xs font-semibold text-[#1d271f] hover:border-[#05893e] min-w-[170px]"
              >
                <span>{sortLabels[sortOption]}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#1d271f]/40" />
              </button>

              {isSortOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setIsSortOpen(false)}
                  />
                  <div className="absolute right-0 mt-1 w-48 rounded-lg bg-white border border-[#e1e8e1] shadow-md py-1 z-40">
                    {(['default', 'price-asc', 'price-desc'] as SortOption[]).map(
                      (option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setSortOption(option);
                            setIsSortOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2 text-xs font-medium ${
                            sortOption === option
                              ? 'bg-[#fafcfa] text-[#05893e] font-bold'
                              : 'text-[#1d271f] hover:bg-[#fafcfa]'
                          }`}
                        >
                          {sortLabels[option]}
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

      {/* প্রোডাক্ট গ্রিড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
