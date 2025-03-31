import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { validateUserRegisterData } from './user.validation';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async getAll() {
    try {
      return this.prisma.user.findMany();
    } catch (error: unknown) {
      throw error instanceof Error
        ? new Error(`Error getting all users: ${error.message}`)
        : new InternalServerErrorException(`Unknown error getting all users`);
    }
  }

  async getById(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!user) throw new NotFoundException('User with provided id not found');

      return user;
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException(
            `Unknown error getting user by id: ${error}`,
          );
    }
  }

  async getByEmail(email: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { email },
      });

      if (!user)
        throw new NotFoundException(`User with provided email not found`);

      return user;
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException(
            `Unknown error getting user by id: ${error}`,
          );
    }
  }

  async register(user: CreateUserDto) {
    try {
      await validateUserRegisterData(user, this.prisma);

      const hashedPassword = await hash(user.password, 10);

      const newUser = await this.prisma.user.create({
        data: {
          email: user.email,
          password: hashedPassword,
          name: user.name,
          surname: user.surname,
        },
      });

      const payload = {
        id: newUser.id,
        email: newUser.email,
        role: 'user',
      };

      return {
        token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw error instanceof BadRequestException ||
        error instanceof ForbiddenException
        ? error
        : new InternalServerErrorException(
            `Unknown error happened while registering ${error}`,
          );
    }
  }

  async login(email: string, password: string) {
    try {
      if (!email) throw new BadRequestException('Email field is missing');
      if (!password) throw new BadRequestException('Password field is missing');

      const user = await this.prisma.user.findFirst({
        where: { email },
      });

      if (!user)
        throw new NotFoundException('User with provided email not found');

      const isValidPassword = await compare(password, user.password);
      if (!isValidPassword)
        throw new ForbiddenException('Invalid password or email');

      const payload = {
        id: user.id,
        email: user.email,
        role: user.isAdmin ? 'admin' : 'user',
      };

      return {
        token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw error instanceof BadRequestException ||
        NotFoundException ||
        ForbiddenException
        ? error
        : new InternalServerErrorException(
            `Unknown error while trying to log in: ${error}`,
          );
    }
  }

  async deleteUser(id: string) {
    try {
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025')
          throw new NotFoundException(`User with provided id not found`);
      }
      throw new InternalServerErrorException(
        'Something went wrong while deleting the user',
      );
    }
  }
}
