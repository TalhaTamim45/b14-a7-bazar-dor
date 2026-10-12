'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { formatPrice, getChangeInfo } from '@/lib/bengali';

interface PriceTickerProps {
  products: Product[];
}

export default function PriceTicker({ products }: PriceTickerProps) {
  if (!products || products.length === 0) return null;

  // স্ক্রল যেন মসৃণ হয় সেজন্য পণ্যের তালিকাকে দ্বিগুণ করা
  const displayItems = [...products, ...products];

  return (
    <div className="bg-emerald-950 text-emerald-100 border-y border-emerald-800/60 overflow-hidden select-none py-2 relative">
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-emerald-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-emerald-950 to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center space-x-6 text-xs sm:text-sm font-medium">
        {displayItems.map((p, idx) => {
          const change = getChangeInfo(p.change);
          return (
            <Link
              key={`${p.id}-${idx}`}
              href={`/product/${p.slug || p.id}`}
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-900/50 hover:bg-emerald-800/80 transition-colors border border-emerald-700/50"
            >
              <span className="text-base">{p.image || p.categoryIcon || '🛒'}</span>
              <span className="font-semibold text-white">{p.nameBn}</span>
              <span className="text-emerald-300 font-mono">
                {formatPrice(p.today)}/{p.unit}
              </span>
              <span
                className={`font-semibold text-xs px-1.5 py-0.5 rounded ${
                  change.isUp
                    ? 'text-emerald-300 bg-emerald-950'
                    : change.isDown
                    ? 'text-rose-300 bg-rose-950'
                    : 'text-slate-300 bg-slate-800'
                }`}
              >
                {change.text}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}