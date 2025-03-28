import { IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateQuizResultDto {
  @IsString()
  userId: string;

  @IsInt()
  @Type(() => Number)
  score: number;

  @IsString()
  quizId: string;
}
