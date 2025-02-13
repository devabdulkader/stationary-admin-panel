import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navbar from '@/components/shared/header/Navbar';
import { SelectedProductsProvider } from '@/context/SelectedProductsContext';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Stationary Admin Panel',
  description: 'Stationary Admin Panel for Management of Stationary Site',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SelectedProductsProvider>
          <Navbar />
          <main className="bg-gray-100 px-5 py-5 2xl:px-10">{children}</main>
        </SelectedProductsProvider>
      </body>
    </html>
  );
}
