import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateQuestionDto } from './dto/createQuestion.dto';
import {
  validateQuestionData,
  validateUpdateQuestionData,
} from './question.validation';
import { Prisma } from '@prisma/client';
import { UpdateQuestionDto } from './dto/updateQuestion.dto';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    try {
      return await this.prisma.question.findMany();
    } catch (error: unknown) {
      throw error instanceof Error
        ? new Error(`Error getting all questions: ${error.message}`)
        : new InternalServerErrorException(
            `Unknown error getting all questions`,
          );
    }
  }

  async getById(id: number) {
    try {
      const question = await this.prisma.question.findUnique({
        where: { id },
      });

      if (!question)
        throw new NotFoundException(`Question with that id does not exist`);

      return question;
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException(
            `Unknown error getting question by id: ${error}`,
          );
    }
  }

  async createQuestion(question: CreateQuestionDto) {
    try {
      validateQuestionData(question);

      return await this.prisma.question.create({
        data: question,
      });
    } catch (error) {
      throw error instanceof BadRequestException
        ? error
        : new InternalServerErrorException(
            `Unknown error creating question: ${error}`,
          );
    }
  }

  async updateQuestion(id: number, updateDto: UpdateQuestionDto) {
    try {
      const existingQuestion = await this.prisma.question.findUnique({
        where: { id },
      });
      if (!existingQuestion)
        throw new NotFoundException('Question with provided id not found');

      validateUpdateQuestionData(updateDto);

      return await this.prisma.question.update({
        where: { id },
        data: { ...updateDto },
      });
    } catch (error) {
      throw error instanceof BadRequestException || NotFoundException
        ? error
        : new InternalServerErrorException('Unknown error creating question');
    }
  }

  async deleteQuestion(id: number) {
    try {
      return await this.prisma.question.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025')
          throw new NotFoundException(`Question with provided id not found`);
      }
      throw new InternalServerErrorException(
        `Something went wrong while deleting the question: ${error} `,
      );
    }
  }
}
