import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { QuestionModule } from './question/question.module';
import { QuizResultModule } from './quizResult/quizResult.module';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [UserModule, QuestionModule, QuizResultModule, QuizModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
