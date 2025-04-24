import { PrismaService } from '../prisma.service';
import { CreateQuizResultDto } from './dto/createQuizResult.dto';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { UpdateQuizResultDto } from './dto/updateQuizResult.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class QuizResultService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    try {
      return await this.prisma.quizResult.findMany({
        include: {
          user: true,
          Quiz: {
            include: {
              questions: true,
            },
          },
        },
      });
    } catch (error) {
      throw error instanceof Error
        ? new Error(`Error getting all users: ${error.message}`)
        : new InternalServerErrorException(
            `Unknown error getting all quiz results: ${error}`,
          );
    }
  }

  async getById(id: string) {
    try {
      const result = await this.prisma.quizResult.findUnique({
        where: { id },
      });

      if (!result)
        throw new NotFoundException('Quiz result with provided id not found');

      return result;
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException(
            `Unknown error getting quiz result by id: ${error}`,
          );
    }
  }

  async getResultsByUser(id: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user)
        throw new NotFoundException('User with provided id does not exist');
      return await this.prisma.quizResult.findMany({
        where: {
          userId: { contains: id },
        },
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException(
            'Unknown error getting results by user',
          );
    }
  }

  async getResultsByQuiz(id: string) {
    try {
      return await this.prisma.quizResult.findMany({
        where: {
          quizId: { contains: id },
        },
        include: {
          user: true,
          Quiz: true,
        },
      });
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException(
            'Unknown error getting results by user',
          );
    }
  }

  async createQuizResult(quizResult: CreateQuizResultDto) {
    try {
      return await this.prisma.quizResult.create({
        data: quizResult,
      });
    } catch (error) {
      throw error instanceof BadRequestException
        ? error
        : new InternalServerErrorException(
            `Unknown error happened while creating quiz result ${error}`,
          );
    }
  }

  async updateQuizResult(id: string, updateDto: UpdateQuizResultDto) {
    try {
      const existingResult = await this.prisma.quizResult.findUnique({
        where: { id },
      });
      if (!existingResult)
        throw new NotFoundException(
          'Quiz result with provided id does not exist',
        );

      return await this.prisma.quizResult.update({
        where: { id },
        data: { ...updateDto },
      });
    } catch (error) {
      throw error instanceof NotFoundException || BadRequestException
        ? error
        : new InternalServerErrorException(
            `Unknown error happened while updating quiz result ${error}`,
          );
    }
  }

  async deleteQuizResult(id: string) {
    try {
      return await this.prisma.quizResult.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Quiz result with provided id not found`);
        }
      }
      throw new InternalServerErrorException(
        `Something went wrong while deleting the user: ${error}`,
      );
    }
  }
}
