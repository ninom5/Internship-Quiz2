import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/createQuiz.dto';

@Controller('quiz')
@ApiTags('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  @ApiOperation({ summary: 'Get all quizzes' })
  @ApiResponse({
    status: 200,
    description: 'Returns all quizzes',
  })
  async getAllQuizes() {
    const quizzes = await this.quizService.getAll();
    return quizzes;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get quiz by id' })
  @ApiResponse({ status: 200, description: 'Returns quiz by id if found' })
  @ApiResponse({ status: 404, description: 'Quiz not found' })
  async getQuizById(@Param('id') id: string) {
    const quiz = await this.quizService.getQuizById(id);
    return quiz;
  }

  @Post()
  @ApiOperation({ summary: 'Create new quiz' })
  @ApiCreatedResponse({
    description: 'Successfully created a quiz',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided',
  })
  async createNewQuiz(@Body() quiz: CreateQuizDto) {
    const response = await this.quizService.createQuiz(quiz);
    return response;
  }

  @Delete()
  @ApiOperation({ summary: 'Delete quiz ' })
  @ApiResponse({ status: 200, description: 'Successfully deleted quiz' })
  @ApiResponse({ status: 400, description: 'Quiz not found' })
  async deleteQuiz(@Param('id') id: string) {
    const response = await this.quizService.deleteQuiz(id);
    return response;
  }
}
