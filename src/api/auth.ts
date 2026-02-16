/**
 * Mock only — no backend.
 */
import { ApiResponse, AuthResponse } from '@types/index';
import { MOCK_USER } from '../data/mockData';

export const authApi = {
  async login(): Promise<ApiResponse<AuthResponse>> {
    return {
      success: true,
      data: {
        user: { ...MOCK_USER },
        accessToken: 'mock-token',
        refreshToken: 'mock-refresh',
        expiresIn: 3600,
      },
    };
  },
  async logout(): Promise<ApiResponse<unknown>> {
    return { success: true };
  },
  async refreshToken(): Promise<ApiResponse<AuthResponse>> {
    return {
      success: true,
      data: {
        user: { ...MOCK_USER },
        accessToken: 'mock-token',
        refreshToken: 'mock-refresh',
        expiresIn: 3600,
      },
    };
  },
};
