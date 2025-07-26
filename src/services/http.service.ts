import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
// import { ErrorResponseDTO } from '../dtos/Common/Error.dto';

interface ErrorResponseDTO {
    message: string;
    code?: string;
}

export class HttpService {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string, headers?: Record<string, string>) {
    this.axiosInstance = axios.create({
      baseURL,
      headers,
    });
  }

  private parseErrorResponse(message:any):string {
    const error ='An error occurred. Please try again later.';
    return (message.data as ErrorResponseDTO)?.message || 
    (message.data as string) || 
    (message as ErrorResponseDTO)?.message ||
    (message as string) ||
    error;
  }

  private async request<D, P, T>(
    method: string,
    path: string,
    data?: D,
    params?: P,
    headers?: Record<string, string> // Headers as Record<string, string>
  ): Promise<T> {
    const config: AxiosRequestConfig = {
      method,
      url: path,
      headers: headers,
    };
    if(params) config.params = params;
    if(data) config.data = data;
    try {
      const response: AxiosResponse<T|ErrorResponseDTO> = await this.axiosInstance.request<T|ErrorResponseDTO>(config);
      if(response.status < 200 || response.status >= 300) {
        throw this.parseErrorResponse(response);
      }
      return response.data as T;
    } catch (error: any) {
      if (axios.isAxiosError<ErrorResponseDTO>(error)) {
        console.error("Axios Error:", error.response?.data || error.message);
        throw this.parseErrorResponse(error.response?.data || error);
      } else {
        console.error("Non-Axios Error:", error);
        throw this.parseErrorResponse(error);
      }
    }
  }

  public async get<P, T>(path: string, params?: P, headers?: Record<string, string>): Promise<T> {
    return this.request<undefined, P, T>('get', path, undefined, params, headers);
  }

  public async post<D, P, T>(path: string, params?: P, data?: D, headers?: Record<string, string>): Promise<T> {
    return this.request<D, P, T>('post', path, data, params, headers);
  }

  public async put<D, P, T>(path: string, params?: P, data?: D, headers?: Record<string, string>): Promise<T> {
    return this.request<D, P, T>('put', path, data, params, headers);
  }

  public async delete<P, T>(path: string, params?: P, headers?: Record<string, string>): Promise<T> {
    return this.request<undefined, P, T>('delete', path, undefined, params, headers);
  }
}

export default HttpService;