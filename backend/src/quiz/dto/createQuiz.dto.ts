import { ArrayMinSize, IsArray, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuizDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({ example: 'Waterpolo' })
  title: string;

  @IsString()
  @ApiProperty({ example: 'imgurl' })
  imgUrl: string;

  @IsString()
  @ApiProperty({ example: 'basic knowledge waterpolo quiz' })
  description: string;

  @IsString()
  @ApiProperty({ example: 'a4f16b72-bcd3-488e-ba47-2e146946fb15' })
  categoryId: string;

  @IsArray()
  @ArrayMinSize(5)
  @IsString({ each: true })
  questions: string[];
}
