import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateQuizDto } from './dto/createQuiz.dto';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const quizzes = await this.prisma.quiz.findMany();
    return quizzes;
  }

  async getQuizById(id: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
    });

    return quiz;
  }

  async getQuizByTitle(title: string) {
    const quiz = await this.prisma.quiz.findMany({
      where: {
        title: {
          contains: title,
          mode: 'insensitive',
        },
      },
    });

    return quiz;
  }

  async createQuiz(quiz: CreateQuizDto) {
    const response = await this.prisma.quiz.create({
      data: {
        title: quiz.title,
        imgUrl: quiz.imgUrl,
        description: quiz.description,
        category: {
          connect: { id: quiz.categoryId },
        },
        questions: {
          connect: quiz.questions.map((questionId) => ({
            id: Number(questionId),
          })),
        },
      },
    });
    return response;
  }

  async deleteQuiz(id: string) {
    const response = await this.prisma.quiz.delete({
      where: { id },
    });

    return response;
  }
}
