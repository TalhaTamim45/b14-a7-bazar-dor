import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { formatPrice, formatUnit, getChangeInfo } from '@/lib/bengali';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const change = getChangeInfo(product.change);
  const detailUrl = `/product/${product.slug || product.id}`;

  return (
    <Link
      href={detailUrl}
      className="group bg-white rounded-xl border border-slate-200 hover:border-[#05893e] p-4 transition-all duration-200 hover:shadow-xs flex flex-col justify-between"
    >
      <div>
        {/* উপরের সারি: ইমোজি, পণ্যের নাম এবং ইউনিট */}
        <div className="flex items-center space-x-3.5 mb-3">
          <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl shrink-0">
            {product.image || product.categoryIcon || '🛒'}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-slate-900 group-hover:text-[#05893e] transition-colors truncate">
              {product.nameBn}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {formatUnit(product.unit)}
            </p>
          </div>
        </div>
      </div>

      {/* নিচের সারি: আজকের দাম এবং পরিবর্তনের হার */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="block text-[11px] text-slate-500 font-medium">
            আজকের দাম
          </span>
          <span className="text-base sm:text-lg font-bold text-slate-900 font-mono">
            {formatPrice(product.today)}
          </span>
        </div>

        <span
          className={`inline-flex items-center space-x-1 text-xs font-semibold px-2 py-0.5 rounded border ${
            change.isUp
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : change.isDown
              ? 'bg-rose-50 text-rose-700 border-rose-200'
              : 'bg-slate-50 text-slate-600 border-slate-200'
          }`}
        >
          <span>{change.text}</span>
        </span>
      </div>
    </Link>
  );
}