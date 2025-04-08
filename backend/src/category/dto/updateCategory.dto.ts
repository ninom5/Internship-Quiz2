import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @IsString()
  @MinLength(4)
  @ApiProperty({ example: 'Sport' })
  title?: string;

  @IsString()
  imgUrl: string;
}
