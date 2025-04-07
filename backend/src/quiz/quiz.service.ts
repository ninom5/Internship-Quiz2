import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateQuizDto } from './dto/createQuiz.dto';
import { validateQuizData, validateUpdateQuizData } from './quiz.validation';
import { Prisma, Quiz } from '@prisma/client';
import { UpdateQuizDto } from './dto/updateQuiz.dto';
import {CreateQuestionDto} from "../question/dto/createQuestion.dto";

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll({
    title,
    category,
  }: {
    title?: string;
    category?: string;
  }): Promise<Quiz[]> {
    try {
      const whereClause: any = {};

      if (title) whereClause.title = { contains: title, mode: 'insensitive' };

      if (category) {
        whereClause.category = {
          title: { contains: category, mode: 'insensitive' },
        };
      }

      return await this.prisma.quiz.findMany({
        where: whereClause,
      });
    } catch (error: unknown) {
      throw error instanceof Error
        ? new InternalServerErrorException(
            `Error getting quizzes: ${error.message}`,
          )
        : new InternalServerErrorException(`Unknown error getting quizzes`);
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

  async createQuiz(quiz: CreateQuizDto) {
    try {
      validateQuizData(quiz);

      const response = await this.prisma.quiz.create({
        data: {
          title: quiz.title,
          description: quiz.description,
          imgUrl: quiz.imgUrl ?? "",
          category: {
            connect: { id: quiz.categoryId },
          },
          questions: {
            create: quiz.questions.map((questionId) => ({
              questions: {
                connect: { id: parseInt(questionId) },
              },
            })),
          },
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

      validateUpdateQuizData(updateDto);

      return await this.prisma.quiz.update({
        where: { id },
        data: { ...updateDto, categoryId: updateDto.categoryId ?? undefined },
      });
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
