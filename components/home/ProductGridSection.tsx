'use client';

import React, { useState, useMemo } from 'react';
import { Product, Category } from '@/types';
import ProductCard from '@/components/product/ProductCard';
import { toBengaliNumber } from '@/lib/bengali';
import { Search } from 'lucide-react';

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

  // সেকশন সি: সব পণ্য
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* ========================================================
          সেকশন এ: আজ দাম বেড়েছে ▲
         ======================================================== */}
      <section className="space-y-4">
        <div className="border-b border-[#e1e8e1] pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1d271f] flex items-center gap-2">
            <span className="text-[#05893e]">▲</span>
            <span>আজ দাম বেড়েছে</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#1d271f]/60 mt-0.5">
            গতকালের তুলনায় যেসব পণ্যের বাজারমূল্য বৃদ্ধি পেয়েছে
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topRisers.map((product) => (
            <ProductCard key={`riser-${product.id}`} product={product} />
          ))}
        </div>
      </section>

      {/* ========================================================
          সেকশন বি: আজ দাম কমেছে ▼
         ======================================================== */}
      <section className="space-y-4">
        <div className="border-b border-[#e1e8e1] pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1d271f] flex items-center gap-2">
            <span className="text-[#d03739]">▼</span>
            <span>আজ দাম কমেছে</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#1d271f]/60 mt-0.5">
            গতকালের তুলনায় যেসব পণ্যের বাজারমূল্য হ্রাস পেয়েছে
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topFallers.map((product) => (
            <ProductCard key={`faller-${product.id}`} product={product} />
          ))}
        </div>
      </section>

      {/* ========================================================
          সেকশন সি: সব পণ্য
         ======================================================== */}
      <section id="সব-পণ্য" className="space-y-5 scroll-mt-20 pt-2">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#e1e8e1] pb-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1d271f]">
              সব পণ্য
            </h2>
            <p className="text-xs sm:text-sm text-[#1d271f]/60 mt-0.5">
              মোট {toBengaliNumber(filteredProducts.length)}টি পণ্য দেখানো হচ্ছে
            </p>
          </div>

          {/* সার্চ বক্স */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-[#1d271f]/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="পণ্য খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-[#e1e8e1] bg-white text-[#1d271f] focus:outline-none focus:border-[#05893e]"
            />
          </div>
        </div>

        {/* ক্যাটাগরি চিপস */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-[#05893e] text-white'
                : 'bg-white text-[#1d271f] border border-[#e1e8e1] hover:bg-[#fafcfa]'
            }`}
          >
            সব ({toBengaliNumber(products.length)})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                selectedCategory === cat.slug
                  ? 'bg-[#05893e] text-white'
                  : 'bg-white text-[#1d271f] border border-[#e1e8e1] hover:bg-[#fafcfa]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.nameBn}</span>
            </button>
          ))}
        </div>

        {/* পণ্য গ্রিড */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-[#e1e8e1] p-6 space-y-2">
            <p className="text-sm text-[#1d271f]/60">কোনো পণ্য পাওয়া যায়নি</p>
          </div>
        )}
      </section>
    </div>
  );
}
