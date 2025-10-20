"use client"
import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react'; // veya başka bir ikon

type BreadCrumb = {
  title: string;
  categories: Array<{
    name: string;
    slug: string;
    link?: string;
  }>;
  slug?: string;
};

export default function BreadCrumb({ title, categories, slug }: BreadCrumb) {
  const [open, setOpen] = useState(false);

  const hasCategories = categories && categories.length > 0;
  const mainCategory = hasCategories ? categories[0] : undefined;
  const hasMultiple = categories.length > 1;

  return (
    <nav
      className="flex w-full justify-center text-sm text-muted-foreground"
      aria-label="Breadcrumb"
    >
      <ol className="flex w-full items-center gap-2">
        {/* Anasayfa */}
        <li>
          <Link href="/" className="hover:text-primary transition-colors font-medium">
            Anasayfa
          </Link>
        </li>
        <li>/</li>

        {/* Kategoriler */}
        {categories.length === 1 && mainCategory && (
          <>
            <li>
              <Link
                href={mainCategory.link || `/category/${mainCategory.slug}`}
                className="hover:text-primary transition-colors"
              >
                {mainCategory.name}
              </Link>
            </li>
            <li>/</li>
          </>
        )}

        {hasMultiple && mainCategory && (
          <>
            <li
              className="relative"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <button
                className="flex items-center gap-1 hover:text-primary transition-colors"
                type="button"
              >
                <span>
                  <Link
                    href={mainCategory.link || `/category/${mainCategory.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {mainCategory.name}
                  </Link>
                </span>
                <ChevronDown size={16} />
              </button>
              {open && (
                <ul className="absolute left-0 top-full z-10 mt-1 min-w-[120px] rounded bg-white shadow border py-1">
                  {categories.slice(1).map((cat) => (
                    <li key={cat.slug}>
                      <Link
                        href={cat.link || `/category/${cat.slug}`}
                        className="block px-3 py-1 hover:text-primary transition-colors"
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>/</li>
          </>
        )}

        {/* Yazı başlığı */}
        <li>
          <Link
            href={`/${slug}`}
            className="hover:text-primary transition-colors font-semibold"
          >
            {title}
          </Link>
        </li>
      </ol>
    </nav>
  );
}