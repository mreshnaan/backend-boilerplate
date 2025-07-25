/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';
import { NotFoundError, BadRequestError } from '@/helpers/api-errors';

const prisma = new PrismaClient();

interface CreateData {
  name: string;
  description: string;
}

interface UpdateData {
  name?: string;
  description?: string;
}

interface ListFilters {
  page?: number;
  limit?: number;
  name?: string;
  description?: string;
}

interface WhereClause {
  name?: {
    contains: string;
  };
  description?: {
    contains: string;
  };
}

export class ExampleService {
  async create(data: CreateData) {
    try {
      if (!data.name) {
        throw new BadRequestError('Name is required');
      }
      if (!data.description) {
        throw new BadRequestError('Description is required');
      }

      return prisma.example.create({ data });
    } catch (error: unknown) {
      console.error('Error in ExampleService create:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new BadRequestError(errorMessage);
    }
  }

  async getList(filters: ListFilters) {
    try {
      const { page = 1, limit = 10, name, description } = filters;
      const skip = (page - 1) * limit;

      const where: WhereClause = {};
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
    } catch (error: unknown) {
      console.error('Error in ExampleService getList:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new BadRequestError(errorMessage);
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
    } catch (error: unknown) {
      console.error('Error in ExampleService getOne:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new BadRequestError(errorMessage);
    }
  }

  async update(id: string, data: UpdateData) {
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
    } catch (error: unknown) {
      console.error('Error in ExampleService update:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new BadRequestError(errorMessage);
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
    } catch (error: unknown) {
      console.error('Error in ExampleService delete:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new BadRequestError(errorMessage);
    }
  }
}
