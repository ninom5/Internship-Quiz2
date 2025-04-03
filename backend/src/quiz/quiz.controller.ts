import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/createQuiz.dto';
import { UpdateQuizDto } from './dto/updateQuiz.dto';
import { AdminAuthGuard } from '../user/admin-auth.guard';
import { UserAuthGuard } from '../user/user-auth.guard';

@Controller('quiz')
@ApiBearerAuth()
@ApiTags('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  // @UseGuards(UserAuthGuard)
  @ApiOperation({ summary: 'Get all quizzes' })
  @ApiResponse({
    status: 200,
    description: 'Returns all quizzes',
  })
  async getAllQuizzes(
    @Query('title') title?: string,
    @Query('category') category?: string,
  ) {
    const quizzes = await this.quizService.getAll({ title, category });
    return quizzes;
  }

  @Get(':id')
  @UseGuards(UserAuthGuard)
  @ApiOperation({ summary: 'Get quiz by id' })
  @ApiResponse({ status: 200, description: 'Returns quiz by id if found' })
  @ApiResponse({ status: 404, description: 'Quiz not found' })
  async getQuizById(@Param('id') id: string) {
    const quiz = await this.quizService.getQuizById(id);
    return quiz;
  }

  @Post()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'Create new quiz' })
  @ApiCreatedResponse({
    description: 'Successfully created a quiz',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided',
  })
  async createNewQuiz(@Body() quiz: CreateQuizDto) {
    return await this.quizService.createQuiz(quiz);
  }

  @Patch(':id')
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'Update quiz by ID' })
  @ApiResponse({ status: 200, description: 'Successfully updated quiz' })
  @ApiResponse({ status: 404, description: 'Quiz not found' })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  async updateUser(@Param('id') id: string, @Body() updateDto: UpdateQuizDto) {
    return await this.quizService.updateQuiz(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'Delete quiz ' })
  @ApiResponse({ status: 200, description: 'Successfully deleted quiz' })
  @ApiResponse({ status: 404, description: 'Quiz not found' })
  async deleteQuiz(@Param('id') id: string) {
    const response = await this.quizService.deleteQuiz(id);
    return response;
  }
}
