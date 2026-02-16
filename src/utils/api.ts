/**
 * No network. Mock-only stub.
 */
import { ApiResponse } from '@types/index';

const noNetwork = (): Promise<ApiResponse<never>> =>
  Promise.resolve({ success: false, error: 'Mock mode — no network' });

class ApiClient {
  private token: string | null = null;

  async setToken(token: string): Promise<void> {
    this.token = token;
  }

  get<T>(_url: string): Promise<ApiResponse<T>> {
    return noNetwork();
  }

  post<T>(_url: string, _data?: unknown): Promise<ApiResponse<T>> {
    return noNetwork();
  }

  put<T>(_url: string, _data?: unknown): Promise<ApiResponse<T>> {
    return noNetwork();
  }
}

export const apiClient = new ApiClient();
