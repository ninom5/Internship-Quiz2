import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'node:process';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtStrategy],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  exports: [UserService],
})
export class UserModule {}
