import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/common/SmoothScroll';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'The Local Printer | Find Local Printers & Designers Near You',
  description: 'India\'s largest online directory for printing businesses. Find verified printing services near you.',
};

export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
      
      <body className={`${inter.variable} font-sans antialiased flex flex-col min-h-screen text-slate-800 bg-white selection:bg-accent-green selection:text-white`}>
        <SmoothScroll>
          <Header />
          <main className="flex-grow flex flex-col">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}