/// <reference types="vite/client" />
import { Product, ApiResponse, SearchFilters, LatestProductsResponse } from '../types';
import { HttpService } from './http.service';

export class ApiService {
  private httpService: HttpService;
  private readonly basePath: string;
  // private authHeaders: { Authorization: string } | undefined | null;

  constructor() {
    // Use environment variable or fallback to current server IP
    this.basePath = import.meta.env.VITE_API_BASE_URL || "http://34.93.69.206/api";
    
    this.httpService = new HttpService(this.basePath);
  }

 

  /**
   * Get products with pagination and filters
   */
  public async getProducts(
    page = 1,
    limit = 50,
    filters?: SearchFilters
  ): Promise<ApiResponse<Product[]>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(filters?.category && { category: filters.category }),
      ...(filters?.minPrice && { min_price: filters.minPrice.toString() }),
      ...(filters?.maxPrice && { max_price: filters.maxPrice.toString() }),
      ...(filters?.brand && { brand: filters.brand }),
      ...(filters?.rating && { rating: filters.rating.toString() }),
      ...(filters?.sortBy && { sort_by: filters.sortBy }),
      ...(filters?.sortOrder && { sort_order: filters.sortOrder }),
    });
    const response = await this.httpService.get<undefined, ApiResponse<Product[]>>(`/products?${params}`);
    return response;
  }

  /**
   * Get single product by ID
   */
  public async getProduct(id: string): Promise<Product> {
    const response = await this.httpService.get<undefined, Product>(`/products/${id}`);
    return response;
  }

  /**
   * Get latest products
   */
  public async getLatestProducts(limit = 10): Promise<LatestProductsResponse> {
    const params = new URLSearchParams({
      limit: limit.toString(),
    });
    const response = await this.httpService.get<undefined, LatestProductsResponse>(`/products/latest?${params}`);
    return response;
  }

  /**
   * Search products
   */
  public async searchProducts(
    query: number,
    page = 1,
    limit = 12
  ): Promise<ApiResponse<Product[]>> {
    const params = new URLSearchParams({
      q: query.toString(),
      page: page.toString(),
      limit: limit.toString(),
    });
    const response = await this.httpService.get<undefined, ApiResponse<Product[]>>(`/products/search?${params}`);
    return response;
  }

  /**
   * Get categories
   */
  public async getCategories(): Promise<string[]> {
    const response = await this.httpService.get<undefined, string[]>('/categories');
    return response;
  }

  /**
   * Get health stats
   */
  public async getHealthStats(): Promise<any> {
    const response = await this.httpService.get('/health-stats');
    return response;
  }
}


export default ApiService; 