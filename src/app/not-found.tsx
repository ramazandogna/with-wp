'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/common';
import { Button, Input } from '@/components/ui';
import { Home, Sparkles, FileQuestion } from 'lucide-react';

/**
 * Custom 404 Not Found Page
 *
 * Bu sayfa şu durumlarda gösterilir:
 * 1. Mevcut olmayan bir route'a gidildiğinde (/invalid-route)
 * 2. notFound() fonksiyonu çağrıldığında (örn: post bulunamadığında)
 *
 * Kullanım:
 * - import { notFound } from 'next/navigation'
 * - if (!post) notFound()
 */
export default function NotFound() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <Container>
        <div className="bg-background/50 border-border/20 mx-auto max-w-2xl rounded-lg border px-8 py-12 text-center shadow-lg backdrop-blur-lg">
          {/* 404 Icon */}
          <div className="bg-primary/10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
            <FileQuestion className="text-primary h-10 w-10" />
          </div>

          {/* 404 Title */}
          <h1 className="text-foreground mb-2 text-6xl font-bold">404</h1>
          <h2 className="text-foreground mb-4 text-2xl font-semibold">Sayfa Bulunamadı</h2>

          {/* Description */}
          <p className="text-muted-foreground mb-8 text-lg">
            Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
          </p>

          {/* Action Buttons */}
          <div className="mb-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* Go Home Button */}
            <Link href="/" className="w-full sm:w-auto">
              <Button variant="default" size="lg" className="w-full min-w-[200px]">
                <Home className="mr-2 h-5 w-5" />
                Ana Sayfaya Dön
              </Button>
            </Link>

            {/* Editor's Pick Button */}
            <Link href="/#featured" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full min-w-[200px]">
                <Sparkles className="mr-2 h-5 w-5" />
                Editörün Seçimi
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
                id="search-404"
                type="text"
                placeholder="Ya da aradığınız içeriği bulun..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 flex-1"
              />
              <Button type="submit" size="lg" variant="secondary" disabled={!searchQuery.trim()}>
                Ara
              </Button>
            </form>
          </div>

          {/* Help Section */}
          <div className="bg-muted/50 mt-8 rounded-lg p-6 text-left">
            <h3 className="text-foreground mb-3 text-lg font-semibold">Ne yapabilirsiniz?</h3>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Ana sayfadan en son yazılara göz atın</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>URL&apos;yi kontrol edin ve tekrar deneyin</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Arama yaparak istediğiniz içeriği bulun</span>
              </li>
            </ul>
          </div>

          {/* Footer Help Text */}
          <p className="text-muted-foreground mt-6 text-sm">
            Bir sorun olduğunu düşünüyorsanız,{' '}
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
