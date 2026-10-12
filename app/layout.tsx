import type { Metadata } from 'next';
import { Hind_Siliguri } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/ui/Footer';
import { getCategories, getAllProducts } from '@/lib/api';

const hindSiliguri = Hind_Siliguri({
  weight: ['400', '500', '600', '700'],
  subsets: ['bengali', 'latin'],
  display: 'swap',
  variable: '--font-hind-siliguri',
});

export const metadata: Metadata = {
  title: 'বাজার দর — নিত্যপ্রয়োজনীয় পণ্যের সঠিক বাজার দর ট্র্যাকিং',
  description: 'দৈনন্দিন চাল, ডাল, তেল, শাকসবজি, মাছ-মাংস ও নিত্যপ্রয়োজনীয় পণ্যের বাজার দর, দাম বৃদ্ধির তালিকা ও পর্যালোচনা।',
  keywords: ['বাজার দর', 'bazar dor', 'বাংলাদেশ বাজার', 'কাঁচাবাজারের দাম', 'সবজির দাম'],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [categories, products] = await Promise.all([
    getCategories(),
    getAllProducts(),
  ]);

  return (
    <html lang="bn" className={`scroll-smooth ${hindSiliguri.variable}`}>
      <body className={`${hindSiliguri.className} min-h-screen flex flex-col bg-[#fafcfa] text-[#1d271f] antialiased selection:bg-[#05893e] selection:text-white`}>
        <AuthProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                background: '#1d271f',
                color: '#fafcfa',
                borderRadius: '0.5rem',
                border: '1px solid #e1e8e1',
                fontSize: '0.875rem',
                fontWeight: 500,
              },
              success: {
                iconTheme: {
                  primary: '#05893e',
                  secondary: '#ffffff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#d03739',
                  secondary: '#ffffff',
                },
              },
            }}
          />
          <Navbar categories={categories} tickerProducts={products} />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
