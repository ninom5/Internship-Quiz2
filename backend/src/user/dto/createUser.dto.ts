import {IsEmail, IsEnum, IsString, MinLength} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({ example: 'John' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'Doe' })
  surname: string;

  @IsEmail()
  @ApiProperty({ example: 'john.doe@gmail.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: 'password' })
  password: string;

  @IsEnum(Role)
  @ApiProperty({ example: Role.User, enum: Role })
  role: Role;
}
