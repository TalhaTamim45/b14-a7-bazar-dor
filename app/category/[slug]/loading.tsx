import ProductCardSkeleton from '@/components/product/ProductCardSkeleton';

export default function CategoryLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-pulse">
      {/* হেডার স্কেলিটন */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <div className="w-14 h-14 rounded-2xl bg-slate-200 shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-7 w-48 bg-slate-200 rounded-md" />
            <div className="h-4 w-64 bg-slate-100 rounded-md" />
          </div>
        </div>
        <div className="h-10 w-44 bg-slate-200 rounded-xl" />
      </div>

      {/* প্রোডাক্ট কার্ড গ্রিড স্কেলিটন */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}