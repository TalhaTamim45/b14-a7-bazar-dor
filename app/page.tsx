import Hero from '@/components/home/Hero';
import ProductGridSection from '@/components/home/ProductGridSection';
import { getAllProducts, getCategories } from '@/lib/api';

export const revalidate = 60; // 60 সেকেন্ড পরপর ক্যাশ রিভ্যালিডেট হবে

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen">
      {/* হিরো ব্যানার */}
      <Hero />

      {/* পণ্যের সেকশনসমূহ (আজ দাম বেড়েছে, কমেছে ও সব পণ্য) */}
      <ProductGridSection products={products} categories={categories} />
    </div>
  );
}