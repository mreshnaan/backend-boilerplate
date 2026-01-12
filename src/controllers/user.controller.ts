import { Request, Response } from 'express';
import userService from '@/services/user.service';
import { SuccessHandler, ErrorHandler } from '@/utils';
import { MESSAGES } from '@/constants/messages.constant';
import { COMMON } from '@/constants/common.constant';

/**
 * User Controller
 * Handles HTTP requests for user operations
 */

export const getAllUsers = ErrorHandler.catchAsync(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || COMMON.DEFAULT_PAGE;
  const limit = parseInt(req.query.limit as string) || COMMON.DEFAULT_LIMIT;

  const result = await userService.getAllUsers(page, limit);

  SuccessHandler.paginated(res, MESSAGES.USER.LIST_FETCHED, result.users, page, limit, result.total);
});

export const getUserById = ErrorHandler.catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);

  SuccessHandler.ok(res, MESSAGES.USER.FETCHED, user);
});

export const createUser = ErrorHandler.catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);

  SuccessHandler.created(res, MESSAGES.USER.CREATED, user);
});

export const updateUser = ErrorHandler.catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userService.updateUser(id, req.body);

  SuccessHandler.ok(res, MESSAGES.USER.UPDATED, user);
});

export const deleteUser = ErrorHandler.catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await userService.deleteUser(id);

  SuccessHandler.ok(res, MESSAGES.USER.DELETED);
});
