/// <reference types="vite/client" />
import { Product, ApiResponse, SearchFilters, LatestProductsResponse } from '../types';
import { HttpService } from './http.service';

export class ApiService {
  private httpService: HttpService;
  private readonly basePath: string;
  // private authHeaders: { Authorization: string } | undefined | null;

  constructor() {
    // Use localhost for backend communication when on same server
    // In production, this will be the private IP of the backend container
    this.basePath = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
    this.httpService = new HttpService(this.basePath);
  }

  public async getProducts(page = 1, limit = 12, filters?: SearchFilters): Promise<ApiResponse<Product[]>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (filters?.category) params.append('category', filters.category);
    if (filters?.minPrice) params.append('min_price', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('max_price', filters.maxPrice.toString());
    if (filters?.brand) params.append('brand', filters.brand);
    if (filters?.rating) params.append('rating', filters.rating.toString());
    if (filters?.sortBy) params.append('sort_by', filters.sortBy);
    if (filters?.sortOrder) params.append('sort_order', filters.sortOrder);

    const response = await this.httpService.get<undefined, ApiResponse<Product[]>>(`/products?${params}`);
    return response;
  }

  public async getProduct(id: string): Promise<Product> {
    const response = await this.httpService.get<undefined, Product>(`/products/${id}`);
    return response;
  }

  public async searchProducts(productIndex: number, page = 1, limit = 12): Promise<ApiResponse<Product[]>> {
    const params = new URLSearchParams({
      q: productIndex.toString(),
      page: page.toString(),
      limit: limit.toString(),
    });
    const response = await this.httpService.get<undefined, ApiResponse<Product[]>>(`/products/search?${params}`);
    return response;
  }

  public async getLatestProducts(limit = 10): Promise<LatestProductsResponse> {
    const params = new URLSearchParams({ limit: limit.toString() });
    const response = await this.httpService.get<undefined, LatestProductsResponse>(`/products/latest?${params}`);
    return response;
  }

  public async getCategories(): Promise<string[]> {
    const response = await this.httpService.get<undefined, string[]>('/categories');
    return response;
  }

  public async getHealthStats(): Promise<any> {
    const response = await this.httpService.get<undefined, any>('/health-stats');
    return response;
  }

  public async downloadStatisticsReport(): Promise<void> {
    try {
      const response = await fetch(`${this.basePath}/statistics/download`, {
        method: 'GET',
        headers: {
          'Accept': 'text/csv',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `statistics-report-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading report:', error);
      throw error;
    }
  }
}

export default ApiService; 