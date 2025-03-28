import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [UserModule, QuestionModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
