import { Container } from '@/components/common';

/**
 * Global Loading State
 * 
 * Bu component ana sayfa (HomePage) yüklenirken gösterilir.
 * Next.js otomatik olarak Suspense boundary oluşturur.
 * 
 * Kapsam:
 * - Server Component initial load
 * - Client-side navigation (/)
 * - ISR revalidation sırasında
 */
export default function Loading() {
  return (
    <Container className="pb-4">
      <div className="flex flex-col gap-4">
        {/* Section Title Skeleton */}
        <div className="mb-2">
          <div className="bg-muted h-8 w-48 animate-pulse rounded-lg" />
        </div>

        {/* Posts Grid Skeleton */}
        <div className="bg-background/50 border-border/20 grid grid-cols-1 gap-6 rounded-lg border px-8 py-8 shadow-lg backdrop-blur-lg">
          {/* 3 Post Card Skeletons */}
          {[1, 2, 3].map((index) => (
            <PostCardSkeleton key={index} />
          ))}
        </div>

        {/* Load More Button Skeleton */}
        <div className="mt-4 flex justify-center">
          <div className="bg-muted h-12 w-48 animate-pulse rounded-lg" />
        </div>
      </div>
    </Container>
  );
}

/**
 * PostCard Skeleton Component
 * Matches the actual PostCard layout from PostCard.tsx
 */
function PostCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border-0 shadow-0">
      {/* Image Skeleton */}
      <div className="bg-muted h-48 w-full animate-pulse rounded-t-lg md:h-80" />

      {/* Content Skeleton */}
      <div className="flex flex-1 flex-col px-6 pb-6">
        {/* Category and Date Skeleton */}
        <div className="mb-4 mt-4 flex items-center justify-between">
          <div className="bg-muted h-4 w-20 animate-pulse rounded" />
          <div className="bg-muted h-4 w-24 animate-pulse rounded" />
        </div>

        {/* Title Skeleton */}
        <div className="mb-4 space-y-2">
          <div className="bg-muted h-6 w-full animate-pulse rounded" />
          <div className="bg-muted h-6 w-3/4 animate-pulse rounded" />
        </div>

        {/* Excerpt Skeleton */}
        <div className="mb-4 space-y-2">
          <div className="bg-muted h-4 w-full animate-pulse rounded" />
          <div className="bg-muted h-4 w-full animate-pulse rounded" />
          <div className="bg-muted h-4 w-2/3 animate-pulse rounded" />
        </div>

        {/* Read More Button Skeleton */}
        <div className="bg-muted mt-4 h-6 w-32 animate-pulse rounded" />
      </div>
    </div>
  );
}
