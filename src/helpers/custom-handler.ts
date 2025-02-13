import { type Response } from 'express';

/**
 * Handles a successful API response.
 *
 * @param {Response} res - The response object to send the response with.
 * @param {boolean} status - send true or false in the response.
 * @param {number} statusCode - The HTTP status code to send in the response.
 * @param {*} data - The data to include in the response.
 * @param {string} message - The message to include in the response.
 * @param {string | null | undefined} redirect - Optional redirection URL.
 * @param {object | undefined} pagination - Optional pagination data.
 * @returns {void}
 */
export const SUCCESS_RESPONSE = (
  res: Response,
  status: boolean,
  statusCode: number,
  data: object | undefined,
  message: string,
  pagination?: object,
): any => {
  res.status(statusCode).json({
    status,
    data,
    message,
    pagination,
  });
};

/**
 * Handles an error API response.
 *
 * @param {Response} res - The response object to send the response with.
 * @param {boolean} status - send true or false in the response.
 * @param {number} statusCode - The HTTP status code to send in the response.
 * @param {string} message - The error message to include in the response.
 * @returns {void}
 */
export const ERROR_RESPONSE = (
  res: Response,
  status: boolean,
  statusCode: number,
  message: any,
  errors?: any,
): any => {
  return res.status(statusCode).json({ status, errors, error: message });
};
