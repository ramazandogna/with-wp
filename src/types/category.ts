// getCategorySlugs fonksiyonu için parametre tipi
export interface GetCategorySlugsParams {
  name?: string;
}
// Kategori detay bilgileri
export interface CategoryDetails {
  count: number;
  name: string;
  slug: string;
  description: string;
}
