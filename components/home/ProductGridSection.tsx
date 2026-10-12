'use client';

import React, { useState, useMemo } from 'react';
import { Product, Category } from '@/types';
import ProductCard from '@/components/product/ProductCard';
import {
  TrendingUp,
  TrendingDown,
  LayoutGrid,
  Search,
  Filter,
  Sparkles,
} from 'lucide-react';

interface ProductGridSectionProps {
  products: Product[];
  categories: Category[];
}

export default function ProductGridSection({
  products,
  categories,
}: ProductGridSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // সেকশন এ: আজ দাম বেড়েছে (Top 6 risers)
  const topRisers = useMemo(() => {
    return products
      .filter((p) => p.change?.dir === 'up')
      .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
      .slice(0, 6);
  }, [products]);

  // সেকশন বি: আজ দাম কমেছে (Top 6 fallers)
  const topFallers = useMemo(() => {
    return products
      .filter((p) => p.change?.dir === 'down')
      .sort((a, b) => Math.abs(b.change?.pct || 0) - Math.abs(a.change?.pct || 0))
      .slice(0, 6);
  }, [products]);

  // সেকশন সি: সব পণ্য (ফিল্টারিং ও সার্চিং সহ)
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat =
        selectedCategory === 'all' || p.category === selectedCategory;
      const matchQuery =
        !searchQuery.trim() ||
        p.nameBn.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        p.categoryNameBn.toLowerCase().includes(searchQuery.trim().toLowerCase());
      return matchCat && matchQuery;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* ========================================================
          সেকশন এ এবং বি: দামের পরিবর্তন (আজ দাম বেড়েছে ও কমেছে)
         ======================================================== */}
      <div id="দাম-পরিবর্তন" className="space-y-16 scroll-mt-24">
        {/* সেকশন এ: আজ দাম বেড়েছে ▲ */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-emerald-100 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <TrendingUp className="w-4 h-4" />
                <span>বাজার বৃদ্ধির প্রবণতা</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2">
                <span>আজ দাম বেড়েছে</span>
                <span className="text-emerald-600 font-mono">▲</span>
              </h2>
              <p className="text-sm text-slate-500">
                গতকালের তুলনায় যেসব পণ্যের পাইকারি ও খুচরা বাজারমূল্য বৃদ্ধি পেয়েছে (শীর্ষ ৬টি পণ্য)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topRisers.length > 0 ? (
              topRisers.map((product) => (
                <ProductCard key={`riser-${product.id}`} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center py-8 text-slate-500">
                আজ দাম বৃদ্ধির কোনো নতুন তথ্য নেই
              </p>
            )}
          </div>
        </div>

        {/* সেকশন বি: আজ দাম কমেছে ▼ */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-rose-100 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-2 text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                <TrendingDown className="w-4 h-4" />
                <span>দরপতন ও স্বস্তিদায়ক দাম</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2">
                <span>আজ দাম কমেছে</span>
                <span className="text-rose-600 font-mono">▼</span>
              </h2>
              <p className="text-sm text-slate-500">
                গতকালের তুলনায় যেসব পণ্যের বাজারমূল্য হ্রাস পেয়ে ক্রেতাদের নাগালে এসেছে (শীর্ষ ৬টি পণ্য)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topFallers.length > 0 ? (
              topFallers.map((product) => (
                <ProductCard key={`faller-${product.id}`} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center py-8 text-slate-500">
                আজ দাম কমার কোনো নতুন তথ্য নেই
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================
          সেকশন সি: সব পণ্য (Sub-title + Responsive Grid + Anchor)
         ======================================================== */}
      <div id="সব-পণ্য" className="space-y-8 scroll-mt-24 pt-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
              <LayoutGrid className="w-4 h-4 text-emerald-600" />
              <span>সম্পূর্ণ ক্যাটালগ</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
              সব পণ্য
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl">
              বাজারের সকল নিত্যপ্রয়োজনীয় খাদ্য ও গৃহস্থালি পণ্যের আজকের হালনাগাদ দামের তালিকা
            </p>
          </div>

          {/* সার্চ ও ফিল্টার কন্ট্রোল */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* সার্চ বক্স */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="পণ্য বা ক্যাটাগরি খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* ক্যাটাগরি কুইক ফিল্টার বাটন */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            সব ক্যাটাগরি ({products.length})
          </button>
          {categories.map((cat) => {
            const count = products.filter((p) => p.category === cat.slug).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                  selectedCategory === cat.slug
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
                <span className="text-[11px] opacity-75">({count})</span>
              </button>
            );
          })}
        </div>

        {/* পণ্য গ্রিড */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 p-8 space-y-3">
            <span className="text-4xl">🔍</span>
            <h3 className="text-lg font-bold text-slate-800">
              কোনো পণ্য পাওয়া যায়নি
            </h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              আপনার খোঁজা নামের সাথে কোনো পণ্য মিলছে না। অনুগ্রহ করে অন্য নাম লিখে চেষ্টা করুন।
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-semibold hover:bg-emerald-100 transition-colors"
            >
              ফিল্টার রিসেট করুন
            </button>
          </div>
        )}
      </div>
    </div>
  );
}