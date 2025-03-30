import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { CreateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const categories = await this.prisma.category.findMany();
    return categories;
  }

  async getById(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    return category;
  }

  async createCategory(category: CreateCategoryDto) {
    const response = await this.prisma.category.create({
      data: {
        title: category.title,
        // quizzes: category.quizzes,
      },
    });
    return response;
  }

  async deleteCategory(id: string) {
    const response = await this.prisma.category.delete({
      where: { id },
    });
    return response;
  }
}
