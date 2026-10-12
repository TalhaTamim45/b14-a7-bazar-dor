import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { formatPrice, formatUnit, getChangeInfo } from '@/lib/bengali';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const change = getChangeInfo(product.change);
  const detailUrl = `/product/${product.slug || product.id}`;

  return (
    <Link
      href={detailUrl}
      className="group block bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
    >
      {/* অ্যাকসেন্ট টপ বর্ডার */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/40 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* উপরের রো: ক্যাটাগরি এবং চেঞ্জ ব্যাজ */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="inline-flex items-center space-x-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
          <span>{product.categoryIcon || '🏷️'}</span>
          <span>{product.categoryNameBn || 'নিত্যপণ্য'}</span>
        </span>

        <span
          className={`inline-flex items-center space-x-1 text-xs font-bold px-2.5 py-0.5 rounded-full border ${change.bgColor} ${change.textColor} ${change.borderColor}`}
        >
          {change.isUp ? (
            <ArrowUpRight className="w-3.5 h-3.5 inline" />
          ) : change.isDown ? (
            <ArrowDownRight className="w-3.5 h-3.5 inline" />
          ) : (
            <Minus className="w-3.5 h-3.5 inline" />
          )}
          <span>{change.text}</span>
        </span>
      </div>

      {/* ইমেজ ও নাম */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50/80 border border-emerald-100 flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-inner">
          {product.image || product.categoryIcon || '🛒'}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
            {product.nameBn}
          </h3>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            {formatUnit(product.unit)}
          </p>
        </div>
      </div>

      {/* নিচের দামের রো */}
      <div className="pt-3 border-t border-slate-100 flex items-end justify-between">
        <div>
          <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            আজকের দাম
          </span>
          <span className="text-xl font-extrabold text-slate-900 font-mono tracking-tight group-hover:text-emerald-600 transition-colors">
            {formatPrice(product.today)}
          </span>
        </div>

        <span className="text-xs font-semibold text-emerald-600 group-hover:underline flex items-center space-x-0.5">
          <span>বিস্তারিত</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}