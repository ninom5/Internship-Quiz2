import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateQuizDto } from './dto/createQuiz.dto';
import { validateQuizData } from './quiz.validation';
import { Prisma } from '@prisma/client';
import { UpdateQuizDto } from './dto/updateQuiz.dto';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    try {
      return await this.prisma.quiz.findMany();
    } catch (error: unknown) {
      throw error instanceof Error
        ? new Error(`Error getting all users: ${error.message}`)
        : new InternalServerErrorException(`Unknown error getting all users`);
    }
  }

  async getQuizById(id: string) {
    try {
      const quiz = await this.prisma.quiz.findUnique({
        where: { id },
      });

      if (!quiz) throw new NotFoundException('Quiz with that id not found');

      return quiz;
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException(
            `Unknown error getting quiz by id: ${error}`,
          );
    }
  }

  async getQuizByTitle(title: string) {
    try {
      const quizzes = await this.prisma.quiz.findMany({
        where: {
          title: {
            contains: title,
            mode: 'insensitive',
          },
        },
      });

      if (quizzes.length === 0)
        throw new NotFoundException('No quizzes found with the provided title');

      return quizzes;
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException(
            `Unknown error getting quiz by title: ${error}`,
          );
    }
  }

  async createQuiz(quiz: CreateQuizDto) {
    try {
      validateQuizData(quiz);

      const response = await this.prisma.quiz.create({
        data: {
          title: quiz.title,
          imgUrl: quiz.imgUrl,
          description: quiz.description,
          category: {
            connect: { id: quiz.categoryId },
          },
          // questions: {
          //   connect: quiz.questions.map((questionId) => ({
          //     id: Number(questionId),
          //   })),
          // },
        },
      });
      return response;
    } catch (error) {
      throw error instanceof BadRequestException
        ? error
        : new InternalServerErrorException(
            `Unknown error happened while creating new quiz: ${error}`,
          );
    }
  }

  async updateQuiz(id: string, updateDto: UpdateQuizDto) {
    try {
      const existingQuiz = await this.prisma.quiz.findUnique({ where: { id } });
      if (!existingQuiz)
        throw new NotFoundException('Quiz with provided id not found');

      const update = await this.prisma.quiz.update({
        where: { id },
        data: { ...updateDto, categoryId: updateDto.categoryId ?? undefined },
      });

      return update;
    } catch (error) {
      throw error instanceof BadRequestException || NotFoundException
        ? error
        : new InternalServerErrorException(
            `Unknown error happened while updating quiz: ${error}`,
          );
    }
  }

  async deleteQuiz(id: string) {
    try {
      return await this.prisma.quiz.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025')
          throw new NotFoundException(`Quiz with provided id not found`);
      }
      throw new InternalServerErrorException(
        `Something went wrong while deleting the quiz: ${error}`,
      );
    }
  }
}
