import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { QuestionModule } from './question/question.module';
import { QuizResultModule } from './quizResult/quizResult.module';
import { QuizModule } from './quiz/quiz.module';
import { CategoryModule } from './category/category.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'frontend', 'dist'),
    }),
    UserModule,
    QuestionModule,
    QuizResultModule,
    QuizModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
