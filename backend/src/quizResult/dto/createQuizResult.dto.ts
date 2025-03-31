import { IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuizResultDto {
  @IsString()
  @ApiProperty({ example: '8d03a841-4310-476a-af12-8a2d5b7664f8' })
  userId: string;

  @IsInt()
  @Type(() => Number)
  @ApiProperty({ example: '4' })
  score: number;

  @IsString()
  @ApiProperty({ example: '5875b244-4e81-4675-8c6e-18d6f918e264' })
  quizId: string;
}
