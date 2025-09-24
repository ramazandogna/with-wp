// next
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
// helpers
import { generateMetadata } from '@/helpers/seo';
// server utils
import { getInitialTheme } from '@/lib/server-utils';
// components
import { Header, Footer } from '@/components/common';
import { ThemeProvider } from '@/components/provider';
// styles
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

export async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getInitialTheme();

  return (
    <html lang="tr" className={theme}>
      <head>
        <link rel="preconnect" href="https://wp.ramazandogna.com" />
        <link rel="dns-prefetch" href="https://wp.ramazandogna.com" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider defaultTheme={theme}>
          {/*           
          Header
           */}
          <Header />
          {/*           
            Main
            */}
          <main className="header-padding relative h-full min-h-screen w-full flex-1">{children}</main>

          {/*           
          Footer
           */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

{
  /* FaultyTerminal background animation */
}

export default RootLayout;
