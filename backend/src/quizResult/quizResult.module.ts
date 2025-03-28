import { QuizResultController } from './quizResult.controller';
import { QuizResultService } from './quizResult.service';
import { PrismaService } from '../prisma.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [QuizResultController],
  providers: [QuizResultService, PrismaService],
  exports: [QuizResultService],
})
export class QuizResultModule {}
