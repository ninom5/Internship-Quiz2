import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async getAll() {
    const users = await this.prisma.user.findMany();

    return users;
  }

  async getById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

  async getByEmail(email: string) {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    return user;
  }

  async createUser(user: CreateUserDto) {
    const response = await this.prisma.user.create({
      data: user,
    });
    return response;
  }

  async deleteUser(id: string) {
    const response = await this.prisma.user.delete({
      where: { id },
    });

    return response;
  }
}
