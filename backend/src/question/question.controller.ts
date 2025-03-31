import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/createQuestion.dto';
import { UpdateQuestionDto } from './dto/updateQuestion.dto';

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
    return await this.questionService.getAll();
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

    return await this.questionService.getById(questionId);
  }

  @Post()
  @ApiOperation({ summary: 'Create new question' })
  @ApiCreatedResponse({
    description: 'Successfully created a question',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided',
  })
  async createNewQustion(@Body() question: CreateQuestionDto) {
    return await this.questionService.createQuestion(question);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update question by ID' })
  @ApiResponse({ status: 200, description: 'Successfully updated question' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  async updateUser(
    @Param('id') id: string,
    @Body() updateDto: UpdateQuestionDto,
  ) {
    return await this.questionService.updateQuestion(Number(id), updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete question' })
  @ApiResponse({ status: 200, description: 'Successfully deleted question' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  async deleteQuestion(@Param('id') id: string) {
    return await this.questionService.deleteQuestion(Number(id));
  }
}
