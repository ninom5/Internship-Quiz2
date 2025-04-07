import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDataDto } from './dto/updateUserData.dto';
import { AdminAuthGuard } from './admin-auth.guard';
import { UserAuthGuard } from './user-auth.guard';

@Controller('user')
@ApiBearerAuth()
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users in db' })
  @ApiResponse({
    status: 401,
    description: 'You are not logged in or you are not admin',
  })
  async getAllUsers() {
    try {
      return await this.userService.getAll();
    } catch (error) {
      throw new Error(`Error fetching all users: ${error}`);
    }
  }

  @Get(':id')
  @UseGuards(UserAuthGuard)
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: 200,
    description: 'Returns user with same id if it is in db',
  })
  @ApiResponse({
    status: 401,
    description: 'You are not logged in or you are not admin',
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
    status: 401,
    description: 'You are not logged in or you are not admin',
  })
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
  @ApiCreatedResponse({
    description: 'Data is valid, returns token',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'john.doe@example.com' },
        password: { type: 'string', example: 'hashed_password' },
      },
      required: ['email', 'password'],
    },
  })
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    return await this.userService.login(email, password);
  }

  @Patch(':id')
  @UseGuards(UserAuthGuard)
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiResponse({ status: 200, description: 'Successfully updated user' })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  @ApiResponse({
    status: 401,
    description: 'You are not logged in or you are not admin',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async updateUser(
    @Param('id') id: string,
    @Body() updateDto: UpdateUserDataDto,
  ) {
    return await this.userService.updateUser(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, description: 'Returns response body' })
  @ApiResponse({
    status: 401,
    description: 'You are not logged in or you are not admin',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
