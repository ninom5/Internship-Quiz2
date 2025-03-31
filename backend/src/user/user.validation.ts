import { CreateUserDto } from './dto/createUser.dto';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { isEmail } from 'class-validator';
import { PrismaService } from '../prisma.service';

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
