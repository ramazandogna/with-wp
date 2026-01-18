import Image from 'next/image';

interface PostImageProps {
  src: string;
  alt: string;
  width?: number; // Optional - if not provided, full width will be used
  height?: number; // Optional - if not provided, aspect ratio will be calculated
  className?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string | undefined;
  priority?: boolean;
}

export default function PostImage({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder = 'blur',
  blurDataURL,
  priority = false
}: PostImageProps) {
  // Eğer width/height belirtilmemişse, responsive full width kullan
  const hasExplicitDimensions = width && height;
  const aspectRatio = hasExplicitDimensions ? width / height : 16 / 9; // Default aspect ratio

  // Dinamik sizes attribute
  const dynamicSizes = hasExplicitDimensions && width <= 400
    ? `${width}px`
    : '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px';

  if (hasExplicitDimensions) {
    // Boyutları belli olan görseller için
    return (
      <div
        className={`relative mx-auto ${className}`}
        style={{
          width: '100%',
          maxWidth: `${width}px`,
          aspectRatio: aspectRatio.toString()
        }}
      >
        <Image
          src={src}
          alt={alt || 'Post image'}
          placeholder={placeholder}
          {...(blurDataURL && { blurDataURL })}
          loading={priority ? 'eager' : 'lazy'}
          priority={priority}
          fill
          className="object-contain rounded-lg"
          sizes={dynamicSizes}
          quality={85}
        />
      </div>
    );
  }

  // Boyutu belirsiz görseller için full width responsive
  return (
    <div
      className={`relative w-full ${className}`}
      style={{
        aspectRatio: aspectRatio.toString()
      }}
    >
      <Image
        src={src}
        alt={alt || 'Post image'}
        placeholder={placeholder}
        {...(blurDataURL && { blurDataURL })}
        loading={priority ? 'eager' : 'lazy'}
        priority={priority}
        fill
        className="object-cover rounded-lg"
        sizes={dynamicSizes}
        quality={85}
      />
    </div>
  );
}
