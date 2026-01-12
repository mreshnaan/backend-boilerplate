import { Response } from 'express';
import { HTTP_STATUS } from '@/constants/http.status.constant';
import { ApiResponse } from '@/utils/api.response.utils';

/**
 * Success Handler Utility
 * Easy-to-use functions for sending success responses
 */

export class SuccessHandler {
  /**
   * Send a standard success response
   */
  static ok(res: Response, message: string, data?: any) {
    return res.status(HTTP_STATUS.OK).json(ApiResponse.success(message, data));
  }

  /**
   * Send a created response (201)
   */
  static created(res: Response, message: string, data?: any) {
    return res.status(HTTP_STATUS.CREATED).json(ApiResponse.success(message, data));
  }

  /**
   * Send a no content response (204)
   */
  static noContent(res: Response) {
    return res.status(HTTP_STATUS.NO_CONTENT).send();
  }

  /**
   * Send a paginated response
   */
  static paginated(
    res: Response,
    message: string,
    data: any[],
    page: number,
    limit: number,
    total: number
  ) {
    return res
      .status(HTTP_STATUS.OK)
      .json(ApiResponse.paginated(message, data, page, limit, total));
  }

  /**
   * Send accepted response (202)
   */
  static accepted(res: Response, message: string, data?: any) {
    return res.status(HTTP_STATUS.ACCEPTED).json(ApiResponse.success(message, data));
  }
}
