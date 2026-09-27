export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T | null;
}

export interface ApiError {
  success: boolean;
  statusCode: number;
  message: string;
}

