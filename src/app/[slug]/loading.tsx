import { Container } from '@/components/common';

/**
 * Post Detail Loading State
 * 
 * Bu component post detail sayfası yüklenirken gösterilir.
 * Next.js otomatik olarak Suspense boundary oluşturur.
 * 
 * Layout:
 * - Breadcrumb skeleton
 * - Hero section skeleton (featured image, meta info)
 * - Content skeleton (paragraphs)
 * 
 * Kapsam:
 * - Server Component initial load
 * - Client-side navigation (/[slug])
 * - ISR revalidation (revalidate: 3600)
 */
export default function PostLoading() {
  return (
    <Container>
      <div className="bg-background/50 border-border/20 grid grid-cols-1 gap-6 rounded-lg border px-8 py-8 shadow-lg backdrop-blur-lg">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2">
          <div className="bg-muted h-4 w-16 animate-pulse rounded" />
          <div className="bg-muted h-4 w-2 animate-pulse rounded" />
          <div className="bg-muted h-4 w-24 animate-pulse rounded" />
          <div className="bg-muted h-4 w-2 animate-pulse rounded" />
          <div className="bg-muted h-4 w-32 animate-pulse rounded" />
        </div>

        {/* Hero Section Skeleton */}
        <div className="mx-auto flex w-full flex-col gap-6">
          {/* Featured Image Skeleton */}
          <div className="bg-muted relative h-[400px] w-full animate-pulse overflow-hidden rounded-lg" />

          {/* Meta Info Skeleton */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {/* Date */}
            <div className="flex items-center gap-2">
              <div className="bg-muted h-4 w-4 animate-pulse rounded" />
              <div className="bg-muted h-4 w-24 animate-pulse rounded" />
            </div>
            {/* Author */}
            <div className="flex items-center gap-2">
              <div className="bg-muted h-4 w-4 animate-pulse rounded" />
              <div className="bg-muted h-4 w-20 animate-pulse rounded" />
            </div>
            {/* Read Time */}
            <div className="flex items-center gap-2">
              <div className="bg-muted h-4 w-4 animate-pulse rounded" />
              <div className="bg-muted h-4 w-16 animate-pulse rounded" />
            </div>
            {/* Comments */}
            <div className="flex items-center gap-2">
              <div className="bg-muted h-4 w-4 animate-pulse rounded" />
              <div className="bg-muted h-4 w-12 animate-pulse rounded" />
            </div>
          </div>

          {/* Title Skeleton */}
          <div className="space-y-3">
            <div className="bg-muted h-10 w-full animate-pulse rounded" />
            <div className="bg-muted h-10 w-3/4 animate-pulse rounded" />
          </div>

          {/* Categories Skeleton */}
          <div className="flex flex-wrap gap-2">
            <div className="bg-muted h-8 w-24 animate-pulse rounded-full" />
            <div className="bg-muted h-8 w-28 animate-pulse rounded-full" />
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="space-y-6">
          {/* Paragraph 1 */}
          <div className="space-y-3">
            <div className="bg-muted h-4 w-full animate-pulse rounded" />
            <div className="bg-muted h-4 w-full animate-pulse rounded" />
            <div className="bg-muted h-4 w-5/6 animate-pulse rounded" />
          </div>

          {/* Paragraph 2 */}
          <div className="space-y-3">
            <div className="bg-muted h-4 w-full animate-pulse rounded" />
            <div className="bg-muted h-4 w-full animate-pulse rounded" />
            <div className="bg-muted h-4 w-4/5 animate-pulse rounded" />
          </div>

          {/* Subheading Skeleton */}
          <div className="space-y-3">
            <div className="bg-muted h-7 w-2/3 animate-pulse rounded" />
          </div>

          {/* Paragraph 3 */}
          <div className="space-y-3">
            <div className="bg-muted h-4 w-full animate-pulse rounded" />
            <div className="bg-muted h-4 w-full animate-pulse rounded" />
            <div className="bg-muted h-4 w-3/4 animate-pulse rounded" />
          </div>

          {/* Image Placeholder Skeleton */}
          <div className="bg-muted my-8 h-64 w-full animate-pulse rounded-lg" />

          {/* Paragraph 4 */}
          <div className="space-y-3">
            <div className="bg-muted h-4 w-full animate-pulse rounded" />
            <div className="bg-muted h-4 w-full animate-pulse rounded" />
            <div className="bg-muted h-4 w-5/6 animate-pulse rounded" />
          </div>

          {/* Paragraph 5 */}
          <div className="space-y-3">
            <div className="bg-muted h-4 w-full animate-pulse rounded" />
            <div className="bg-muted h-4 w-4/5 animate-pulse rounded" />
          </div>
        </div>
      </div>
    </Container>
  );
}
