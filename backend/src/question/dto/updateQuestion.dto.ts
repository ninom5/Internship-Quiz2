import { IsArray, IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { QuestionType } from '@prisma/client';

export class UpdateQuestionDto {
  @IsString()
  @ApiProperty({ example: 'How many planets are there in the Solar System?' })
  text?: string;

  @IsEnum(QuestionType)
  @ApiProperty({ example: QuestionType.INPUT })
  type?: QuestionType;

  @IsString()
  @ApiProperty({ example: 'quiz-id' })
  quizId?: string;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    example: ['4', '5', '6', '8'],
    description:
      'Array of possible answers (optional, used for multiple-choice questions)',
  })
  options?: string[];

  @IsString()
  @ApiProperty({ example: '8' })
  answer?: string;
}
