import {
  ArrayMinSize,
  IsArray,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateQuizDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  imgUrl: string;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsArray()
  @ArrayMinSize(5)
  @IsString({ each: true })
  questions: string[];
}
