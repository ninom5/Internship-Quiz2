import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

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

  async register(user: CreateUserDto) {
    if (!user) throw new BadRequestException('Data is null');

    if (!user.name || !user.email || !user.password || !user.surname)
      return new BadRequestException('User data is missing');

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
  }

  async login(email: string, password: string) {
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
  }

  async deleteUser(id: string) {
    const response = await this.prisma.user.delete({
      where: { id },
    });

    return response;
  }
}
