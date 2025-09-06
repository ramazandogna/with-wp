# WordPress + Next.js Headless CMS

Bu proje WordPress'i headless CMS olarak kullanarak Next.js ile modern bir blog sitesi oluşturur.

## 🚀 Özellikler

- **Headless WordPress CMS** - GraphQL API ile veri çekme
- **Next.js 15** - App Router ve RSC kullanımı
- **ISR (Incremental Static Regeneration)** - Performans optimizasyonu
- **TypeScript** - Tam tip güvenliği
- **TailwindCSS** - Modern stil sistemi
- **SEO Odaklı** - Metadata ve structured data
- **Performance Optimized** - Image optimization ve caching

## 📋 Gereksinimler

- Node.js 18+
- pnpm
- WordPress site (GraphQL plugin ile)

## 🛠️ Kurulum

1. Projeyi klonlayın:
```bash
git clone <repo-url>
cd with-wp
```

2. Bağımlılıkları yükleyin:
```bash
pnpm install
```

3. Environment değişkenlerini ayarlayın:
```bash
cp .env.example .env
```

4. `.env` dosyasını düzenleyin:
```
GRAPHQL_URL=https://your-wordpress-site.com/graphql
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

5. Geliştirme sunucusunu başlatın:
```bash
pnpm dev
```

## 📁 Proje Yapısı

```
src/
├── app/                 # Next.js App Router
├── components/          # React bileşenleri
├── lib/                 # WordPress API fonksiyonları
│   ├── wp-api.ts       # Ana API wrapper
│   └── graphqlRequest.ts
├── types/              # TypeScript type tanımları
├── constants/          # Sabit değerler
├── helpers/            # Yardımcı fonksiyonlar
└── styles/             # CSS dosyaları
```

## 🎯 WordPress API Kullanımı

### 1. Named Import Yaklaşımı (Önerilen):
```typescript
import { getPosts, getPost, getPostsByCategory } from '@/lib/wp-api';

// Tüm postları getir
const posts = await getPosts();

// Tekil post getir
const post = await getPost('post-slug');

// Kategoriye göre postları getir
const categoryPosts = await getPostsByCategory('category-slug');
```

### 2. Default Import Yaklaşımı:
```typescript
import wp from '@/lib/wp-api';

// Tüm postları getir
const posts = await wp.getPosts();

// Tekil post getir
const post = await wp.getPost('post-slug');

// Kategoriye göre postları getir
const categoryPosts = await wp.getPostsByCategory('category-slug');
```

### 3. Gelişmiş Kullanım:
```typescript
import { getPosts, searchPosts, getRelatedPosts } from '@/lib/wp-api';

// Sayfalama ile postlar
const posts = await getPosts({ 
  limit: 12, 
  cursor: 'eyJvZmZzZXQiOjEwfQ==' 
});

// Arama
const searchResults = await searchPosts('next.js');

// İlgili postlar
const related = await getRelatedPosts({
  categorySlugs: ['react', 'javascript'],
  excludeSlug: 'current-post-slug',
  limit: 3
});
```

## 🔧 TypeScript

Proje tam TypeScript desteği ile yazılmıştır:

- Strict mode aktif
- `any` kullanımı yasak
- Tüm API yanıtları tiplendirilmiş
- Type güvenli WordPress API wrapper

## 📈 SEO Optimizasyonu

- Otomatik metadata oluşturma
- Structured data
- Open Graph tags
- Performance optimizasyonları
- ISR ile hızlı sayfa yükleme

## 🚦 Komutlar

```bash
# Geliştirme
pnpm dev

# Build
pnpm build

# Lint
pnpm lint

# Type check
pnpm exec tsc --noEmit
```

## 📝 WordPress Gereksinimleri

WordPress sitenizde aşağıdaki plugin'lerin kurulu olması gerekir:

- WPGraphQL
- WPGraphQL for Advanced Custom Fields (ACF kullanıyorsanız)

## 🎨 Styling

TailwindCSS kullanılır:

- Prettier ile otomatik sıralama
- Dark mode desteği
- Responsive design
- Modern CSS features

## 🔒 Güvenlik

- Environment variables
- CORS ayarları
- Headers optimizasyonu
- XSS protection

---

**Not:** Bu proje production kullanıma hazırdır. WordPress sitenizi ayarlayıp environment değişkenlerini güncelledikten sonra deploy edebilirsiniz.