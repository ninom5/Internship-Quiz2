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
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { QuizResultService } from './quizResult.service';
import { CreateQuizResultDto } from './dto/createQuizResult.dto';
import { UpdateQuizResultDto } from './dto/updateQuizResult.dto';
import { AdminAuthGuard } from '../user/admin-auth.guard';
import { UserAuthGuard } from '../user/user-auth.guard';

@Controller('quizResult')
@ApiBearerAuth()
@ApiTags('quizResult')
export class QuizResultController {
  constructor(private readonly quizResultService: QuizResultService) {}

  @Get()
  @UseGuards(UserAuthGuard)
  @ApiOperation({ summary: 'Get all quiz results' })
  @ApiResponse({
    status: 200,
    description: 'Returns all quiz results',
  })
  async getAllResults() {
    const results = await this.quizResultService.getAll();
    return results;
  }

  @Get(':id')
  @UseGuards(UserAuthGuard)
  @ApiOperation({ summary: 'Get quiz result by id' })
  @ApiResponse({ status: 200, description: 'Get quiz result by id if found' })
  @ApiResponse({ status: 400, description: 'Result not found' })
  async getResultById(@Param('id') id: string) {
    return await this.quizResultService.getById(id);
  }

  @Get('/user/:id')
  @UseGuards(UserAuthGuard)
  @ApiOperation({ summary: 'Get quiz results by user' })
  @ApiResponse({
    status: 200,
    description: 'Returns all quizzes for chosen user',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getResultsByUser(@Param('id') id: string) {
    return await this.quizResultService.getResultsByUser(id);
  }

  @Get('/quiz/:id')
  @ApiOperation({ summary: 'Get results for quiz' })
  @ApiResponse({
    status: 200,
    description: 'Returns all results for provided quiz',
  })
  async geResultsByQuiz(@Param('id') id: string) {
    return await this.quizResultService.getResultsByQuiz(id);
  }

  @Post()
  @UseGuards(UserAuthGuard)
  @ApiOperation({ summary: 'Create new result' })
  @ApiCreatedResponse({
    description: 'Successfully created new quiz result',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided',
  })
  async createQuizResult(@Body() quizResult: CreateQuizResultDto) {
    const response = await this.quizResultService.createQuizResult(quizResult);
    return response;
  }

  @Patch(':id')
  @UseGuards(UserAuthGuard)
  @ApiOperation({ summary: 'Update quiz result' })
  @ApiResponse({ status: 200, description: 'Successfully updated quiz result' })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided or quiz result not found',
  })
  async updateQuizResult(
    @Param('id') id: string,
    @Body() quizResult: UpdateQuizResultDto,
  ) {
    return await this.quizResultService.updateQuizResult(id, quizResult);
  }

  @Delete()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'Delete quiz result' })
  @ApiResponse({ status: 200, description: 'Successfully deleted question' })
  @ApiResponse({ status: 400, description: 'Quiz result not found' })
  async deleteQuizResult(@Param('id') id: string) {
    const response = await this.quizResultService.deleteQuizResult(id);
    return response;
  }
}
