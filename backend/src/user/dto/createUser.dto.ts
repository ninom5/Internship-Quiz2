import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({ example: 'Ante' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'Anic' })
  surname: string;

  @IsEmail()
  @ApiProperty({ example: 'ante.antic@gmail.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: 'password' })
  password: string;

  @IsString()
  @ApiProperty({ example: 'password' })
  confirmPassword: string;
}
