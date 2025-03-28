import { PrismaService } from '../prisma.service';
import { CreateQuizResultDto } from './dto/createQuizResult.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QuizResultService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const results = await this.prisma.quizResult.findMany();
    return results;
  }

  async getById(id: string) {
    const result = await this.prisma.quizResult.findUnique({
      where: { id },
    });
    return result;
  }

  async createQuizResult(quizResult: CreateQuizResultDto) {
    const response = await this.prisma.quizResult.create({
      data: quizResult,
    });
    return response;
  }

  async deleteQuizResult(id: string) {
    const response = await this.prisma.quizResult.delete({
      where: { id },
    });

    return response;
  }
}
