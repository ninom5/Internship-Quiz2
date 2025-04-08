import {
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuizDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({ example: 'Waterpolo' })
  title: string;

  @IsString()
  @ApiProperty({ example: 'basic knowledge waterpolo quiz' })
  description: string;

  @IsString()
  @ApiProperty({ example: 'de18536a-6238-42f2-88e9-e9533603e538' })
  categoryId: string;

  @IsArray()
  @ArrayMinSize(5)
  @IsString({ each: true })
  @ApiProperty({ example: '["2"]' })
  questions: string[];
}
