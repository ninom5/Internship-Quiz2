import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateQuestionDto } from './dto/createQuestion.dto';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const questions = await this.prisma.question.findMany();

    return questions;
  }

  async getById(id: number) {
    const question = await this.prisma.question.findUnique({
      where: { id },
    });

    return question;
  }

  async createQuestion(question: CreateQuestionDto) {
    const response = await this.prisma.question.create({
      data: question,
    });

    return response;
  }

  async deleteQuestion(id: number) {
    const response = await this.prisma.question.delete({
      where: { id },
    });

    return response;
  }
}
