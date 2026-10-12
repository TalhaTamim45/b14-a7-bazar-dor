import React from 'react';

export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs animate-pulse">
      {/* টপ ক্যাটাগরি ও ব্যাজ */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-5 w-20 bg-slate-200 rounded-full" />
        <div className="h-5 w-16 bg-slate-200 rounded-full" />
      </div>

      {/* ইমেজ ও নাম */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 rounded-2xl bg-slate-200 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-slate-200 rounded-md w-3/4" />
          <div className="h-3.5 bg-slate-100 rounded-md w-1/2" />
        </div>
      </div>

      {/* দামের রো */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="space-y-1">
          <div className="h-3 w-14 bg-slate-100 rounded" />
          <div className="h-6 w-24 bg-slate-200 rounded" />
        </div>
        <div className="h-4 w-12 bg-slate-100 rounded" />
      </div>
    </div>
  );
}