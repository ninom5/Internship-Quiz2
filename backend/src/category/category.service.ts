import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { CreateCategoryDto } from './dto/category.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    try {
      return await this.prisma.category.findMany();
    } catch (error: unknown) {
      throw error instanceof Error
        ? new Error(`Error getting all categories: ${error.message}`)
        : new InternalServerErrorException(
            `Unknown error getting all categories`,
          );
    }
  }

  async getById(id: string) {
    try {
      const category = await this.prisma.category.findUnique({
        where: { id },
      });

      if (!category)
        throw new BadRequestException('Category with provided id not found');

      return category;
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException(
            `Unknown error getting category by id: ${error}`,
          );
    }
  }

  async createCategory(category: CreateCategoryDto) {
    try {
      if (!category.title || category.title.trim() === '')
        throw new BadRequestException('Category title field missing');

      const response = await this.prisma.category.create({
        data: {
          title: category.title,
          // quizzes: category.quizzes,
        },
      });
      return response;
    } catch (error) {
      throw error instanceof BadRequestException ||
        error instanceof ForbiddenException
        ? error
        : new InternalServerErrorException(
            `Unknown error happened while creatin category ${error}`,
          );
    }
  }

  async deleteCategory(id: string) {
    try {
      return await this.prisma.category.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025')
          throw new NotFoundException(`Category with provided id not found`);
      }
      throw new InternalServerErrorException(
        `Something went wrong while deleting the category: ${error}`,
      );
    }
  }
}
