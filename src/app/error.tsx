'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/common';
import { Button } from '@/components/ui';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';

/**
 * Global Error Boundary
 * 
 * Bu component tüm page-level hataları yakalar.
 * NOT: layout.tsx hatalarını yakala(ya)maz - bunun için global-error.tsx gerekir.
 * 
 * @param error - Yakalanan hata objesi (production'da digest ile unique ID içerir)
 * @param reset - Component'i yeniden render etmek için fonksiyon
 */
export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Error'u console'a log et (production'da Sentry/Datadog'a gönderilebilir)
    console.error('Global Error Boundary:', error);
  }, [error]);

  // Development vs Production error messages
  const isDev = process.env.NODE_ENV === 'development';
  const errorMessage = isDev ? error.message : 'Bir şeyler yanlış gitti. Lütfen tekrar deneyin.';
  const errorStack = isDev && error.stack;

  return (
    <div className="flex items-center justify-center px-4 py-16">
      <Container>
        <div className="bg-background/50 border-border/20 mx-auto max-w-2xl rounded-lg border px-8 py-12 text-center shadow-lg backdrop-blur-lg">
          {/* Error Icon */}
          <div className="bg-destructive/10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
            <AlertCircle className="text-destructive h-10 w-10" />
          </div>

          {/* Error Title */}
          <h1 className="text-foreground mb-4 text-3xl font-bold">Hata Oluştu</h1>

          {/* Error Message */}
          <p className="text-muted-foreground mb-6 text-lg">{errorMessage}</p>

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
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* Try Again Button */}
            <Button
              onClick={reset}
              variant="default"
              size="lg"
              className="min-w-[200px]"
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              Tekrar Dene
            </Button>

            {/* Go Home Button */}
            <Link href="/">
              <Button variant="outline" size="lg" className="min-w-[200px]">
                <Home className="mr-2 h-5 w-5" />
                Ana Sayfaya Dön
              </Button>
            </Link>
          </div>

          {/* Help Text */}
          <p className="text-muted-foreground mt-8 text-sm">
            Sorun devam ederse, lütfen{' '}
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
