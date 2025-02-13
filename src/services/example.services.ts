/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';
import { NotFoundError, BadRequestError } from '@/helpers/api-errors';

const prisma = new PrismaClient();

export class ExampleService {
  async create(data: { name: string; description: string }) {
    try {
      if (!data.name) {
        throw new BadRequestError('Name is required');
      }
      if (!data.description) {
        throw new BadRequestError('Description is required');
      }

      return prisma.example.create({ data });
    } catch (error: any) {
      console.error('Error in ExampleService create:', error);
      throw new BadRequestError(error.message);
    }
  }

  async getList(filters: any) {
    try {
      const { page = 1, limit = 10, name, description } = filters;
      const skip = (page - 1) * limit;

      const where: any = {};
      if (name) {
        where.name = { contains: name };
      }
      if (description) {
        where.description = { contains: description };
      }

      const [items, total] = await prisma.$transaction([
        prisma.example.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.example.count({ where }),
      ]);

      const pagination = {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
      };

      return { items, pagination };
    } catch (error: any) {
      console.error('Error in ExampleService getList:', error);
      throw new BadRequestError(error.message);
    }
  }

  async getOne(id: string) {
    try {
      if (!id) {
        throw new BadRequestError('ID is required');
      }

      const item = await prisma.example.findUnique({ where: { id } });
      if (!item) {
        throw new NotFoundError('Item not found');
      }

      return item;
    } catch (error: any) {
      console.error('Error in ExampleService getOne:', error);
      throw new BadRequestError(error.message);
    }
  }

  async update(id: string, data: { name?: string; description?: string }) {
    try {
      if (!id) {
        throw new BadRequestError('ID is required');
      }

      const existingItem = await prisma.example.findUnique({ where: { id } });
      if (!existingItem) {
        throw new NotFoundError('Item not found');
      }

      return prisma.example.update({
        where: { id },
        data,
      });
    } catch (error: any) {
      console.error('Error in ExampleService update:', error);
      throw new BadRequestError(error.message);
    }
  }

  async delete(id: string) {
    try {
      if (!id) {
        throw new BadRequestError('ID is required');
      }

      const existingItem = await prisma.example.findUnique({ where: { id } });
      if (!existingItem) {
        throw new NotFoundError('Item not found');
      }

      await prisma.example.delete({ where: { id } });
      return { message: 'Item deleted successfully' };
    } catch (error: any) {
      console.error('Error in ExampleService delete:', error);
      throw new BadRequestError(error.message);
    }
  }
}
