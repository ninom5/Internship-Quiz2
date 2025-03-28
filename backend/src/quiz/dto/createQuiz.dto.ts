import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsString,
  MinLength,
} from 'class-validator';
import {Question, QuizCategory} from '@prisma/client';

export class CreateQuizDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  imgUrl: string;

  @IsString()
  description: string;

  @IsEnum(QuizCategory)
  category: QuizCategory;

  @IsArray()
  @ArrayMinSize(5)
  @IsString({ each: true })
  questions: string[];
}
