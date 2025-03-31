import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users in db' })
  async getAllUsers() {
    const users = await this.userService.getAll();
    return users;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: 200,
    description: 'Returns user with same id if it is in db',
  })
  async getById(@Param('id') id: string) {
    const user = await this.userService.getById(id);
    return user;
  }

  @Get('/email/:email')
  @ApiOperation({ summary: 'Get user by email' })
  @ApiResponse({ status: 200, description: 'Returns user with same email' })
  async getByEmail(@Param('email') email: string) {
    const user = await this.userService.getByEmail(email);
    return user;
  }

  @Post('register')
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({
    status: 200,
    description: 'Returns response',
  })
  async register(@Body() user: CreateUserDto) {
    const response = await this.userService.register(user);
    return response;
  }

  @Post('login')
  @ApiOperation({ summary: 'Login in' })
  @ApiResponse({
    status: 200,
    description: 'Successfully logs in and gets token',
  })
  async login(@Body() email: string, password: string) {
    const response = await this.userService.login(email, password);
    return response;
  }

  @Post()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, description: 'Returns response' })
  async deleteUser(@Param('id') id: string) {
    const response = await this.userService.deleteUser(id);
    return response;
  }
}
