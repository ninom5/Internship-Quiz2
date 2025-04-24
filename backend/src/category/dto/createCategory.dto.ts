import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsString()
  @MinLength(4)
  @ApiProperty({ example: 'Sport' })
  title: string;

  @IsString()
  @ApiProperty({
    example:
      'https://th.bing.com/th/id/OIP.oHTxzNp0xQEJAXitEwnIIgHaDD?w=350&h=144&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2',
  })
  imgUrl: string;
}
