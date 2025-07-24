// export interface Product {
//   'Internal ID': string;
//   'Product Name': string;
//   'Product Description': string;
//   'Product Category': string;
//   'Product Price': number;
//   'Product Image URL': string;
//   'Product Brand': string;
//   'Product Rating': number;
//   'Product Reviews': number;
//   'Product Stock': number;
//   'Product SKU': string;
//   'Product Weight': number;
//   'Product Dimensions': string;
//   'Product Color': string;
//   'Product Material': string;
//   'Product Warranty': string;
//   'Product Shipping': string;
//   'Product Return Policy': string;
//   'Product Tags': string[];
//   'Product Features': string[];
//   'Product Specifications': Record<string, string>;
// }

export interface Product {
  Index: number;
  Name: string;
  Brand: string;
  Category: string;
  Price: number;
  Currency: string;
  Stock: number;
  'Internal ID': string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  name: string;
  count: number;
}

// export interface ApiResponse<T> {
//   data: T;
//   total: number;
//   page: number;
//   limit: number;
//   totalPages: number;
// }

export interface ApiResponse<T> {
  products: T;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}


export interface SearchFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  rating?: number;
  sortBy?: 'price' | 'name' | 'rating' | 'reviews';
  sortOrder?: 'asc' | 'desc';
}

export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaSecondary: string;
  gradient: string;
} 