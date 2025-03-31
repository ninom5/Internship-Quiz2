import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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
    try {
      return await this.userService.getAll();
    } catch (error) {
      throw new Error(`Error fetching all users: ${error}`);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: 200,
    description: 'Returns user with same id if it is in db',
  })
  @ApiResponse({
    status: 404,
    description: 'User with that id not found',
  })
  async getById(@Param('id') id: string) {
    return await this.userService.getById(id);
  }

  @Get('/email/:email')
  @ApiOperation({ summary: 'Get user by email' })
  @ApiResponse({ status: 200, description: 'Returns user with same email' })
  @ApiResponse({
    status: 404,
    description: 'User with that email not found',
  })
  async getByEmail(@Param('email') email: string) {
    return await this.userService.getByEmail(email);
  }

  @Post('register')
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({
    status: 200,
    description: 'Returns token',
  })
  @ApiResponse({
    status: 400,
    description: 'Some data field is missing or is invalid',
  })
  async register(@Body() user: CreateUserDto) {
    return await this.userService.register(user);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login in' })
  @ApiResponse({
    status: 200,
    description: 'Successfully logs in and gets token',
  })
  async login(@Body() email: string, password: string) {
    return await this.userService.login(email, password);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, description: 'Returns response body' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
