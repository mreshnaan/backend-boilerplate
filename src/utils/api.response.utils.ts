
/**
 * API Response Utility
 * Standardized response format for all API endpoints
 */

interface ApiResponseData {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export class ApiResponse {
  static success(message: string, data?: any, meta?: any): ApiResponseData {
    const response: ApiResponseData = {
      success: true,
      message,
    };

    if (data !== undefined) {
      response.data = data;
    }

    if (meta) {
      response.meta = meta;
    }

    return response;
  }

  static error(message: string, error?: any): ApiResponseData {
    const response: ApiResponseData = {
      success: false,
      message,
    };

    if (error !== undefined) {
      response.error = error;
    }

    return response;
  }

  static paginated(message: string, data: any[], page: number, limit: number, total: number) {
    return this.success(message, data, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  }
}
