import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });

export const metadata: Metadata = {
  title: 'EcoMart | Sustainable Living Starts Here',
  description: 'Curated collection of everyday products designed for a better, greener tomorrow.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${manrope.variable} font-sans antialiased bg-background-dark text-off-white min-h-screen flex flex-col`}>
        <Providers>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
