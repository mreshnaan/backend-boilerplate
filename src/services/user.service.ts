import prisma from '@/config/database';
import { NotFoundError, ConflictError } from '@/errors';
import { MESSAGES } from '@/constants/messages.constant';

/**
 * User Service
 * Business logic for user operations using Prisma
 */

export class UserService {
  /**
   * Get all users with pagination
   */
  async getAllUsers(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.user.count(),
    ]);

    return { users, total, page, limit };
  }

  /**
   * Get user by ID
   */
  async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundError(MESSAGES.USER.NOT_FOUND);
    }

    return user;
  }

  /**
   * Create a new user
   */
  async createUser(data: { email: string; name?: string; password: string; role?: string }) {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictError(MESSAGES.USER.ALREADY_EXISTS);
    }

    // In production, hash the password before storing
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password, // TODO: Hash password
        role: data.role || 'user',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  /**
   * Update user
   */
  async updateUser(
    id: string,
    data: { email?: string; name?: string; role?: string; isActive?: boolean }
  ) {
    // Check if user exists
    await this.getUserById(id);

    // If email is being updated, check if it's already taken
    if (data.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser && existingUser.id !== id) {
        throw new ConflictError(MESSAGES.USER.ALREADY_EXISTS);
      }
    }

    const user = await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  /**
   * Delete user
   */
  async deleteUser(id: string) {
    // Check if user exists
    await this.getUserById(id);

    await prisma.user.delete({
      where: { id },
    });

    return { id };
  }
}

export default new UserService();
