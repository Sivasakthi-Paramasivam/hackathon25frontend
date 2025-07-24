/// <reference types="vite/client" />
import { Product, ApiResponse, SearchFilters } from '../types';
import { HttpService } from './http.service';

export class ApiService {
  private httpService: HttpService;
  private readonly basePath: string;
  private authHeaders: { Authorization: string } | undefined | null;

  constructor() {
    this.basePath = "http://34.93.69.206/api";
    
    this.httpService = new HttpService(this.basePath, this.authHeaders);
  }

 

  /**
   * Get products with pagination and filters
   */
  public async getProducts(
    page = 1,
    limit = 12,
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
    console.log("Get Products:",response)
    return response;
  }

  /**
   * Get single product by ID
   */
  public async getProduct(id: string): Promise<Product> {
    const response = await this.httpService.get<Product>(`/products/${id}`);
    return response.data;
  }

  /**
   * Search products
   */
  public async searchProducts(
    query: string,
    page = 1,
    limit = 12
  ): Promise<ApiResponse<Product[]>> {
    const params = new URLSearchParams({
      q: query,
      page: page.toString(),
      limit: limit.toString(),
    });
    const response = await this.httpService.get<ApiResponse<Product[]>>(`/products/search?${params}`);
    return response.data;
  }

  /**
   * Get categories
   */
  public async getCategories(): Promise<string[]> {
    const response = await this.httpService.get<string[]>('/categories');
    return response.data;
  }

  /**
   * Get health stats
   */
  public async getHealthStats(): Promise<any> {
    const response = await this.httpService.get('/health-stats');
    return response.data;
  }
}


export default ApiService; 