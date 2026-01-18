'use client';
import Image from 'next/image';

interface PostImageProps {
  src: string;
  alt: string;
  width: number; // REQUIRED - must be known at build time
  height: number; // REQUIRED - must be known at build time
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
  // Dinamik sizes attribute (görselin boyutuna göre)
  const dynamicSizes = width <= 400 
    ? `${width}px` // Küçük görseller için fixed
    : `(max-width: 768px) 100vw, (max-width: 1200px) 50vw, ${width}px`;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: `${width}px`, // Görselin orijinal boyutundan büyümesini engelle
        aspectRatio: `${width}/${height}`
      }}
      className={`relative overflow-hidden rounded-lg ${className}`}
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
