import { IsArray, IsString, MinLength } from 'class-validator';
import { Quiz } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsString()
  @MinLength(4)
  @ApiProperty({ example: 'Sport' })
  title: string;

  @IsArray()
  quizzes: Quiz[];
}
