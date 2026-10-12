import ProductCardSkeleton from '@/components/product/ProductCardSkeleton';

export default function RootLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-pulse">
      {/* হিরো স্কেলিটন */}
      <div className="bg-slate-100 rounded-3xl h-72 sm:h-96 w-full" />

      {/* সেকশন হেডার */}
      <div className="space-y-3">
        <div className="h-6 w-48 bg-slate-200 rounded-full" />
        <div className="h-8 w-64 bg-slate-200 rounded-lg" />
      </div>

      {/* গ্রিড স্কেলিটন */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}