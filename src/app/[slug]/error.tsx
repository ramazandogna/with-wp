'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/common';
import { Button, Input } from '@/components/ui';
import { BookX, Home, RefreshCw, Sparkles } from 'lucide-react';

/**
 * Post Detail Error Boundary
 * 
 * Bu component post detail sayfasındaki hataları yakalar.
 * Global error.tsx'ten daha spesifik ve post context'ine uygun.
 * 
 * Yakalanan senaryolar:
 * - GraphQL API errors (network, timeout)
 * - Post data fetch errors
 * - Post component render errors
 * 
 * @param error - Yakalanan hata objesi (production'da digest ile unique ID içerir)
 * @param reset - Component'i yeniden render etmek için fonksiyon
 */
export default function PostError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Error'u console'a log et (production'da Sentry/Datadog'a gönderilebilir)
    console.error('Post Detail Error:', error);
  }, [error]);

  // Development vs Production error messages
  const isDev = process.env.NODE_ENV === 'development';
  const errorMessage = isDev
    ? error.message
    : 'İstediğiniz yazı yüklenirken bir sorun oluştu. Lütfen tekrar deneyin.';
  const errorStack = isDev && error.stack;

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <Container>
        <div className="bg-background/50 border-border/20 mx-auto max-w-2xl rounded-lg border px-8 py-12 text-center shadow-lg backdrop-blur-lg">
          {/* Error Icon */}
          <div className="bg-destructive/10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
            <BookX className="text-destructive h-10 w-10" />
          </div>

          {/* Error Title */}
          <h1 className="text-foreground mb-4 text-3xl font-bold">Yazı Yüklenemedi</h1>

          {/* Error Message */}
          <p className="text-muted-foreground mb-8 text-lg">{errorMessage}</p>

          {/* Error Digest (Production tracking ID) */}
          {error.digest && (
            <p className="text-muted-foreground mb-6 text-sm">
              Hata Kodu: <code className="bg-muted rounded px-2 py-1">{error.digest}</code>
            </p>
          )}

          {/* Error Stack (Development only) */}
          {errorStack && (
            <details className="bg-muted/50 mb-6 rounded-lg p-4 text-left">
              <summary className="text-foreground cursor-pointer text-sm font-semibold">
                Teknik Detaylar (Development)
              </summary>
              <pre className="text-muted-foreground mt-4 overflow-x-auto text-xs">
                {errorStack}
              </pre>
            </details>
          )}

          {/* Action Buttons */}
          <div className="mb-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* Try Again Button */}
            <Button onClick={reset} variant="default" size="lg" className="w-full min-w-[200px] sm:w-auto">
              <RefreshCw className="mr-2 h-5 w-5" />
              Tekrar Dene
            </Button>

            {/* Go to Blog Button */}
            <Link href="/" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full min-w-[200px]">
                <Home className="mr-2 h-5 w-5" />
                Anasayfa&apos;ya Dön
              </Button>
            </Link>
          </div>

          {/* Search Input */}
          <div className="mb-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
                }
              }}
              className="mx-auto flex max-w-[416px] items-stretch gap-2"
            >
              <Input
                id="search-error"
                type="text"
                placeholder="Ya da aradığınız içeriği bulun..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 flex-1"
              />
              <Button type="submit" size="lg" variant="secondary" disabled={!searchQuery.trim()}>
                Ara
              </Button>
            </form>
          </div>

          {/* Suggestions Section */}
          <div className="bg-muted/50 mt-8 rounded-lg p-6 text-left">
            <h3 className="text-foreground mb-3 flex items-center gap-2 text-lg font-semibold">
              <Sparkles className="h-5 w-5" />
              Ne yapabilirsiniz?
            </h3>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>
                  <Link href="/" className="text-primary hover:underline">
                    En son yazılara
                  </Link>{' '}
                  göz atın
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Kategorilere göz atarak ilginizi çeken içerikleri bulun</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Sayfa URL&apos;sini kontrol edip tekrar deneyin</span>
              </li>
            </ul>
          </div>

          {/* Footer Help Text */}
          <p className="text-muted-foreground mt-6 text-sm">
            Sorun devam ederse,{' '}
            <Link href="/contact" className="text-primary hover:underline">
              bizimle iletişime geçin
            </Link>
            .
          </p>
        </div>
      </Container>
    </div>
  );
}
