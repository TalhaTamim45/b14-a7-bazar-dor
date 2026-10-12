import { Metadata } from 'next';
import { getCategoryBySlug, getProductsByCategory, getCategories } from '@/lib/api';
import CategoryProductList from '@/components/product/CategoryProductList';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: 'ক্যাটাগরি পাওয়া যায়নি — বাজার দর',
    };
  }

  return {
    title: `${category.nameBn} বাজার দর — নিত্যপ্রয়োজনীয় পণ্যের দাম`,
    description: `${category.nameBn} ক্যাটাগরির সকল পণ্যের বর্তমান পাইকারি ও খুচরা বাজার দর তালিকা।`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const [category, products] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsByCategory(slug),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[70vh]">
      <CategoryProductList initialProducts={products} category={category} />
    </div>
  );
}