import { IsArray, IsString, MinLength } from 'class-validator';
import { Quiz } from '@prisma/client';

export class CreateCategoryDto {
  @IsString()
  @MinLength(4)
  title: string;

  @IsArray()
  quizzes: Quiz[];
}
