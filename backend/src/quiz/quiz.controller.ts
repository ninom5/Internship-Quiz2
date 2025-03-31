import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
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
  async getAllQuizzes() {
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

  @Get('by-title/:title')
  @ApiOperation({ summary: 'Get quiz by title ' })
  @ApiResponse({ status: 200, description: 'Returns quiz by title if found' })
  @ApiResponse({
    status: 404,
    description: 'No quizzes found with provided title',
  })
  async getQuizzesByTitle(@Param(':title') title: string) {
    const quizzes = await this.quizService.getQuizByTitle(title);

    if (quizzes.length === 0)
      throw new NotFoundException('No quizzes found with the provided title');

    return quizzes;
  }

  // async getQuizzesByTitle(@Query('title') title: string) {
  //   const quizzes = await this.quizService.getQuizByTitle(title);
  //   return quizzes;
  // }

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

  @Delete(':id')
  @ApiOperation({ summary: 'Delete quiz ' })
  @ApiResponse({ status: 200, description: 'Successfully deleted quiz' })
  @ApiResponse({ status: 404, description: 'Quiz not found' })
  async deleteQuiz(@Param('id') id: string) {
    const response = await this.quizService.deleteQuiz(id);
    return response;
  }
}
