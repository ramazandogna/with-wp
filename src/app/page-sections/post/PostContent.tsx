import parse, { Element, DOMNode, domToReact } from 'html-react-parser';
import PostImage from '@/components/ui/Image';

type PostContentProps = {
  content: string;
};

// WordPress görsellerinden dominant color ve blurhash ayıkla
const extractImageMetadata = (src: string): { color: string; blurhash?: string } => {
  // TODO: WordPress REST API'den blurhash gelecek
  // Şu an hardcoded lookup
  if (src.includes('cldup.com/EKNF8xD2UM')) return { color: '#4a7ba7' };
  if (src.includes('picsum.photos')) return { color: '#d4a574' };
  return { color: '#e5e7eb' };
};

// Blurhash을 blur data URL로 변환 (현재는 solid color, 나중에 실제 blurhash 구현)
const generateBlurDataURL = (color: string): string => {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect fill='${encodeURIComponent(color)}' width='1' height='1'/%3E%3C/svg%3E`;
};

export default async function PostContent({ content }: PostContentProps) {

  const options = {
    replace: (domNode: DOMNode) => {
      // img taglerini Next.js Image ile değiştir
      if (domNode.type === 'tag' && domNode instanceof Element && domNode.name === 'img') {
        const { src, alt, width, height, class: className } = domNode.attribs;

        // Eğer src yoksa default davranış
        if (!src) return domNode;

        // WordPress'ten gelen boyutları kullan
        const imgWidth = width ? parseInt(width, 10) : undefined;
        const imgHeight = height ? parseInt(height, 10) : undefined;
        const { color } = extractImageMetadata(src);
        const blurDataURL = generateBlurDataURL(color);

        // Server-side render - Suspense yok, direkt Image render
        return (
          <PostImage
            src={src}
            alt={alt || 'Post image'}
            {...(imgWidth && { width: imgWidth })}
            {...(imgHeight && { height: imgHeight })}
            className={className || 'my-4'}
            blurDataURL={blurDataURL}
            placeholder="blur"
            priority={false}
          />
        );
      }

      // figure içindeki img taglerini yakala
      if (domNode.type === 'tag' && domNode instanceof Element && domNode.name === 'figure') {
        const imgElement = domNode.children.find(
          (child): child is Element =>
            child.type === 'tag' && child instanceof Element && child.name === 'img'
        );

        if (imgElement) {
          const { src, alt, width, height, class: imgClassName } = imgElement.attribs;

          // src yoksa default davranış
          if (!src) return domNode;

          // WordPress'ten gelen boyutları kullan
          const imgWidth = width ? parseInt(width, 10) : undefined;
          const imgHeight = height ? parseInt(height, 10) : undefined;
          const { color } = extractImageMetadata(src);
          const blurDataURL = generateBlurDataURL(color);

          // figcaption'ı bul
          const figcaptionElement = domNode.children.find(
            (child): child is Element =>
              child.type === 'tag' && child instanceof Element && child.name === 'figcaption'
          );

          return (
            <figure className={domNode.attribs.class || ''}>
              <PostImage
                src={src}
                alt={alt || 'Post image'}
                {...(imgWidth && { width: imgWidth })}
                {...(imgHeight && { height: imgHeight })}
                className={imgClassName || ''}
                blurDataURL={blurDataURL}
                placeholder="blur"
                priority={false}
              />
              {figcaptionElement && (
                <figcaption className="text-muted-foreground py-2 text-center text-sm italic">
                  {domToReact(figcaptionElement.children as DOMNode[])}
                </figcaption>
              )}
            </figure>
          );
        }
      }
      
      // Default: değişiklik yapma
      return undefined;
    }
  };

  return (
    <div className="mx-auto">
      <div className="post-content">{parse(content, options)}</div>
    </div>
  );
}
