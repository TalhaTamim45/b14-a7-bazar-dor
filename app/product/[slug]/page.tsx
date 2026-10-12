import { Metadata } from 'next';
import { getProductByIdOrSlug } from '@/lib/api';
import ProductDetailView from '@/components/product/ProductDetailView';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductByIdOrSlug(slug);

  if (!product) {
    return {
      title: 'পণ্য খুঁজে পাওয়া যায়নি — বাজার দর',
    };
  }

  return {
    title: `${product.nameBn} বাজার দর ও বিস্তারিত মূল্য — বাজার দর`,
    description: `${product.nameBn}-এর আজকের খুচরা ও পাইকারি বাজারদর, সর্বনিম্ন, সর্বোচ্চ ও গড় মূল্য পর্যালোচনা।`,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductByIdOrSlug(slug);

  return (
    <div className="min-h-[80vh]">
      <ProductDetailView product={product} />
    </div>
  );
}