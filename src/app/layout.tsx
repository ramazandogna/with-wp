import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { generateMetadata } from '@/helpers/seo';
import { Header, Footer, DotGrid } from '@/components/common';
import '../styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap'
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = generateMetadata();

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <head>
        <link rel="preconnect" href="https://wp.ramazandogna.com" />
        <link rel="dns-prefetch" href="https://wp.ramazandogna.com" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <div className="relative h-full min-h-screen w-full">
          <div className="pointer-events-none fixed inset-0 -z-10">
            <DotGrid
              dotSize={5}
              gap={15}
              baseColor="#271E37"
              activeColor="#5227FF"
              proximity={120}
              shockRadius={250}
              shockStrength={5}
              resistance={750}
              returnDuration={1.5}
            />
          </div>
          <main className="relative h-full min-h-screen w-full flex-1">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
