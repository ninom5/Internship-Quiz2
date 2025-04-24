import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateQuizDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({ example: 'Football' })
  title?: string;

  @IsString()
  @ApiProperty({ example: 'basic football knowledge quiz' })
  description?: string;

  @IsString()
  @ApiProperty({ example: 'a4f16b72-bcd3-488e-ba47-2e146946fb15' })
  categoryId?: string;
}
