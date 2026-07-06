export interface Product {
  id: string;
  nama: string;
  sku: string;
  barcode: string;
  kategori: string;
  merk: string;
  imageId: string | null;
  unit: string;
  stok: {
    toko: number;
  };
  harga: {
    hpp: number;
    eceran: number;
    grosir: number;
    partai: number;
  };
}

export type PriceTier = 'eceran' | 'grosir' | 'partai' | 'custom';

export interface CartItem {
  product: Product;
  qty: number;
  priceTier: PriceTier;
  customPrice: number;
  note: string;
}

export interface HistoryItem {
  id: string;
  date: string; // ISO String
  isDraft: boolean;
  customerName: string;
  customerPhone: string;
  customerNote: string;
  cart: CartItem[];
  total: number;
}

export interface FlyerCatalogItem {
  id: string;
  sku: string;
  productName: string;
  category: string;
  merk: string;
  unit: string;
  price: number;
  imageId: string; // row[19] - Gambar Story
  lastUpdateStr: string; // row[20] - Last Update untuk Gambar Story
  lastUpdateDate: Date;
  productId: string; // matched product SKU / ID
}

