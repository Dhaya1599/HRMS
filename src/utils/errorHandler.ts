/**
 * Error handling without axios or network.
 */
export interface AppError {
  message: string;
  code?: string;
  statusCode?: number;
}

export const handleApiError = (error: unknown): AppError => {
  if (error instanceof Error) {
    return { message: error.message, code: 'ERROR' };
  }
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return { message: String((error as { message: unknown }).message), code: 'ERROR' };
  }
  return { message: 'An unexpected error occurred', code: 'UNKNOWN_ERROR' };
};

export const getErrorMessage = (error: unknown): string => handleApiError(error).message;
export const isNetworkError = (): boolean => false;
