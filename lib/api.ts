import { Category, Product } from '@/types';

const API_BASES = [
  'https://openapi.programming-hero.com/api/bazardor',
  'https://api.api-store.workers.dev/api/bazardor',
  'https://api.abcz.workers.dev/api/bazardor',
];

/**
 * একাধিক ফ্যালব্যাক API সহ নিরাপদ ডেটা ফেচিং
 */
async function fetchFromApi<T>(endpoint: string): Promise<T | null> {
  for (const base of API_BASES) {
    try {
      const url = `${base}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
      const res = await fetch(url, {
        next: { revalidate: 60 },
      });
      if (!res.ok) continue;
      const data = await res.json();
      return data as T;
    } catch {
      // পরবর্তী বেস URL এ চেষ্টা করবে
      continue;
    }
  }
  return null;
}

/**
 * সকল ক্যাটাগরি ফেচ করা
 */
export async function getCategories(): Promise<Category[]> {
  const data = await fetchFromApi<Category[]>('/categories');
  if (Array.isArray(data)) return data;

  // ফ্যালব্যাক ক্যাটাগরি তালিকা
  return [
    { id: 'chal', slug: 'chal', nameBn: 'চাল', icon: '🍚' },
    { id: 'dal', slug: 'dal', nameBn: 'ডাল', icon: '🫘' },
    { id: 'tel', slug: 'tel', nameBn: 'তেল', icon: '🛢️' },
    { id: 'sobji', slug: 'sobji', nameBn: 'সবজি', icon: '🥬' },
    { id: 'mach', slug: 'mach', nameBn: 'মাছ', icon: '🐟' },
    { id: 'mangsho', slug: 'mangsho', nameBn: 'মাংস', icon: '🍗' },
    { id: 'dim-dui', slug: 'dim-dui', nameBn: 'ডিম-দুধ', icon: '🥛' },
    { id: 'mosla', slug: 'mosla', nameBn: 'মসলা', icon: '🌶️' },
  ];
}

/**
 * নির্দিষ্ট ক্যাটাগরির বিস্তারিত তথ্য
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const data = await fetchFromApi<Category>(`/categories/${slug}`);
  if (data && data.nameBn) return data;

  const all = await getCategories();
  return all.find((c) => c.slug === slug || c.id === slug) || null;
}

/**
 * সকল পণ্য ফেচ করা
 */
export async function getAllProducts(): Promise<Product[]> {
  const data = await fetchFromApi<Product[]>('/products');
  if (Array.isArray(data)) return data;
  return [];
}

/**
 * ক্যাটাগরি অনুযায়ী পণ্য ফিল্টার করা
 */
export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const data = await fetchFromApi<Product[]>(`/products?category=${encodeURIComponent(categorySlug)}`);
  if (Array.isArray(data) && data.length > 0) return data;

  // যদি কুয়েরি প্যারাম কাজ না করে, সব পণ্য এনে ফিল্টার করা
  const all = await getAllProducts();
  return all.filter((p) => p.category === categorySlug);
}

/**
 * আইডি অথবা স্লাগ অনুযায়ী পণ্য অনুসন্ধান
 */
export async function getProductByIdOrSlug(idOrSlug: string | number): Promise<Product | null> {
  const queryStr = String(idOrSlug);
  const isNumeric = /^\d+$/.test(queryStr);

  if (isNumeric) {
    const singleData = await fetchFromApi<Product>(`/products/${queryStr}`);
    if (singleData && singleData.nameBn) {
      return singleData;
    }
  }

  // সব পণ্য এনে স্লাগ বা আইডি মিলিয়ে দেখা
  const all = await getAllProducts();
  const matched = all.find(
    (p) => p.slug === queryStr || String(p.id) === queryStr
  );

  if (matched) {
    // বিস্তারিত মার্কেট তথ্য নিশ্চিত করা
    if (matched.markets && matched.markets.length > 0) {
      return matched;
    }
    const full = await fetchFromApi<Product>(`/products/${matched.id}`);
    return full || matched;
  }

  return null;
}