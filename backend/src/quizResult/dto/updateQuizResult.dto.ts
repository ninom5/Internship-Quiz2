import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateQuizResultDto {
  @ApiProperty({
    example: 'uuid',
    description: 'User of the participant',
    required: false,
  })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiProperty({
    example: 10,
    description: 'Score obtained by the participant',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  score?: number;

  @ApiProperty({
    example: 'uuid',
    description: 'ID of the related quiz',
    required: false,
  })
  @IsString()
  @IsOptional()
  quizId?: string;
}
