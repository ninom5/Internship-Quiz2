import {BadRequestException, Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/createQuestion.dto';

@Controller('question')
@ApiTags('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  @ApiOperation({ summary: 'Get all questions' })
  @ApiResponse({
    status: 200,
    description: 'Returns all questions in database',
  })
  async getAllQuestions() {
    const questions = await this.questionService.getAll();
    return questions;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get question by id' })
  @ApiResponse({
    status: 200,
    description: 'Returns the question if found',
  })
  @ApiResponse({ status: 404, description: 'Question not found ' })
  async getQuestionById(@Param('id') id: string) {
    const questionId = parseInt(id, 10);

    if (isNaN(questionId))
      throw new BadRequestException('Invalid question ID format');

    const question = await this.questionService.getById(questionId);
    return question;
  }

  @Post()
  @ApiOperation({ summary: 'Create new question' })
  @ApiCreatedResponse({
    // status: 200,
    description: 'Successfully created a question',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided',
  })
  async createNewQustion(@Body() question: CreateQuestionDto) {
    const response = await this.questionService.createQuestion(question);
    return response;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete question' })
  @ApiResponse({ status: 200, description: 'Successfully deleted question' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  async deleteQuestion(@Param('id') id: string) {
    const response = await this.questionService.deleteQuestion(Number(id));
    return response;
  }
}
