/* eslint-disable no-console */
import { HTTP_STATUS_CODE } from '@/constants/common';
import { SUCCESS_RESPONSE } from '@/helpers/custom-handler';
import { ExampleService } from '@/services/example.services';
import { NextFunction, Response } from 'express';

const exampleService = new ExampleService();

export class ExampleController {
  /**
   * Create operation template.
   */
  async create(
    req: { body: { name: string; description: string } },
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const data = req.body;
      const result = await exampleService.create({
        name: data.name,
        description: data.description,
      });

      return SUCCESS_RESPONSE(
        res,
        true,
        HTTP_STATUS_CODE.SUCCESS_RESPONSE_CODE,
        result,
        'Created successfully',
      );
    } catch (error: any) {
      console.log('Error : create example', error);
      next(error);
    }
  }

  /**
   * Get list operation template with filters and pagination.
   */
  async getList(
    req: { query: { name?: string; description?: string; page?: string; limit?: string } },
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const filters = {
        name: req.query.name as string,
        description: req.query.description as string,
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
      };

      const { items, pagination } = await exampleService.getList(filters);

      return SUCCESS_RESPONSE(
        res,
        true,
        HTTP_STATUS_CODE.SUCCESS_RESPONSE_CODE,
        { items, pagination },
        'Retrieved successfully',
      );
    } catch (error: any) {
      console.log('Error : example get list', error.message);
      next(error);
    }
  }

  /**
   * Get single item operation template.
   */
  async getOne(req: { params: { id: string } }, res: Response, next: NextFunction): Promise<any> {
    try {
      const { id } = req.params;
      const item = await exampleService.getOne(id);

      return SUCCESS_RESPONSE(
        res,
        true,
        HTTP_STATUS_CODE.SUCCESS_RESPONSE_CODE,
        item,
        'Retrieved successfully',
      );
    } catch (error: any) {
      console.log('Error : example get one', error.message);
      next(error);
    }
  }

  /**
   * Update operation template.
   */
  async update(
    req: { params: { id: string }; body: { name?: string; description?: string } },
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const { id } = req.params;
      const data = req.body;
      const updated = await exampleService.update(id, data);

      return SUCCESS_RESPONSE(
        res,
        true,
        HTTP_STATUS_CODE.SUCCESS_RESPONSE_CODE,
        updated,
        'Updated successfully',
      );
    } catch (error: any) {
      console.log('Error : example update', error.message);
      next(error);
    }
  }

  /**
   * Delete operation template.
   */
  async delete(req: { params: { id: string } }, res: Response, next: NextFunction): Promise<any> {
    try {
      const { id } = req.params;
      const item = await exampleService.delete(id);

      return SUCCESS_RESPONSE(
        res,
        true,
        HTTP_STATUS_CODE.SUCCESS_RESPONSE_CODE,
        item,
        'Deleted successfully',
      );
    } catch (error: any) {
      console.log('Error : example delete', error.message);
      next(error);
    }
  }
}
