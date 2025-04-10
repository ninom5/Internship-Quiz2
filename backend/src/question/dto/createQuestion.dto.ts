import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { QuestionType } from '@prisma/client';

export class CreateQuestionDto {
  @IsString()
  @ApiProperty({ example: 'How many planets are there in the Solar System?' })
  text: string;

  @IsEnum(QuestionType)
  @ApiProperty({ example: QuestionType.INPUT })
  type: QuestionType;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @ApiProperty({
    example: ['4', '5', '6', '8'],
    description:
      'Array of possible answers (optional, used for multiple-choice questions)',
  })
  options?: string[];

  @IsNumber()
  @IsOptional()
  minValue?: number;

  @IsNumber()
  @IsOptional()
  maxValue?: number;

  @IsNumber()
  @IsOptional()
  stepValue?: number;

  @IsString()
  @ApiProperty({ example: '8' })
  answer: string;
}
