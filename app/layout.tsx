import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/ui/Footer';
import { getCategories, getAllProducts } from '@/lib/api';

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
    <html lang="bn" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-emerald-500 selection:text-white">
        <AuthProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                background: '#0f172a',
                color: '#f8fafc',
                borderRadius: '0.75rem',
                border: '1px solid #334155',
                fontSize: '0.875rem',
                fontWeight: 500,
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#ffffff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
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