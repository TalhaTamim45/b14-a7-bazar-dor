export default function ProductLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-pulse">
      {/* ব্রেডক্রাম্ব */}
      <div className="h-4 w-48 bg-slate-200 rounded" />

      {/* টপ কার্ড */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-6 w-full lg:w-auto">
          <div className="w-24 h-24 rounded-2xl bg-slate-200 shrink-0" />
          <div className="space-y-3 flex-1">
            <div className="h-5 w-24 bg-slate-200 rounded-full" />
            <div className="h-8 w-60 bg-slate-200 rounded-md" />
            <div className="h-4 w-40 bg-slate-100 rounded" />
          </div>
        </div>
        <div className="h-14 w-48 bg-slate-200 rounded-xl" />
      </div>

      {/* স্ট্যাট কার্ড ৩টি */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="h-32 bg-white rounded-2xl border border-slate-200 p-6" />
        <div className="h-32 bg-white rounded-2xl border border-slate-200 p-6" />
        <div className="h-32 bg-white rounded-2xl border border-slate-200 p-6" />
      </div>

      {/* টেবিল স্কেলিটন */}
      <div className="h-64 bg-white rounded-2xl border border-slate-200 p-6" />
    </div>
  );
}