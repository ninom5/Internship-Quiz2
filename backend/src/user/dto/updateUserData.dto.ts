import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDataDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({ example: 'Mate' })
  name?: string;

  @IsString()
  @ApiProperty({ example: 'Matic' })
  surname?: string;

  @IsEmail()
  @ApiProperty({ example: 'mate.matic@gmail.com' })
  email?: string;

  @IsString()
  @ApiProperty({ example: 'password' })
  password?: string;
}
