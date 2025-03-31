import { CreateUserDto } from './dto/createUser.dto';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { isEmail } from 'class-validator';
import { PrismaService } from '../prisma.service';
import { UpdateUserDataDto } from './dto/updateUserData.dto';

export async function validateUserRegisterData(
  user: CreateUserDto,
  prismaService: PrismaService,
) {
  if (!user) throw new BadRequestException('Data is null');

  const { name, surname, email, password, confirmPassword } = user;

  if (!name || !email || !password || !surname)
    throw new BadRequestException('User data is missing');

  if (password !== confirmPassword)
    throw new BadRequestException('Passwords do not match');

  if (!isEmail(email)) throw new BadRequestException(`Email is not valid`);

  const emailExist = await prismaService.user.findFirst({ where: { email } });

  if (emailExist)
    throw new ForbiddenException(`User with that email is already registred`);
}

export function validateUpdateUserData(user: UpdateUserDataDto) {
  if (!user) throw new BadRequestException('Data is null');

  const { name, surname, email, password, confirmPassword } = user;

  if (
    name === undefined &&
    surname === undefined &&
    email === undefined &&
    password === undefined
  ) {
    throw new BadRequestException(
      'At least one field must be provided for update',
    );
  }

  if (name !== undefined && name.trim() === '')
    throw new BadRequestException("Name field can't be empty");

  if (surname !== undefined && surname.trim() === '')
    throw new BadRequestException("Surname field can't be empty");

  if (email !== undefined && !isEmail(email))
    throw new BadRequestException('Email is not valid');

  if (password !== undefined && password.trim() === '')
    throw new BadRequestException("Password field can't be empty");

  if (
    password !== undefined &&
    confirmPassword !== undefined &&
    password !== confirmPassword
  ) {
    throw new BadRequestException('Passwords do not match');
  }
}
