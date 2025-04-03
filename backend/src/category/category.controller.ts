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
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
import { AdminAuthGuard } from '../user/admin-auth.guard';
import { UserAuthGuard } from '../user/user-auth.guard';

@Controller('category')
@ApiBearerAuth()
@ApiTags('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all categories ' })
  @ApiResponse({ status: 200, description: 'returns all categories' })
  async getAll() {
    const categories = await this.categoryService.getAll();
    return categories;
  }

  @Get(':id')
  @UseGuards(UserAuthGuard)
  @ApiOperation({ summary: 'Get category by id' })
  @ApiResponse({ status: 200, description: 'Returns category by id if found' })
  @ApiResponse({ status: 404, description: 'category not found' })
  async getCategoryById(@Param('id') id: string) {
    const category = await this.categoryService.getById(id);
    return category;
  }

  @Post()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'Create category' })
  @ApiResponse({ status: 200, description: 'Successfully created category' })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  async createCategory(@Body() quiz: CreateCategoryDto) {
    const response = await this.categoryService.createCategory(quiz);
    return response;
  }

  @Patch(':id')
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'Update category by ID' })
  @ApiResponse({ status: 200, description: 'Successfully updated category' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  async updateUser(
    @Param('id') id: string,
    @Body() updateDto: UpdateCategoryDto,
  ) {
    return await this.categoryService.updateCategory(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'Delete category' })
  @ApiResponse({ status: 200, description: 'Successfully deleted category' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async deleteCategory(@Param('id') id: string) {
    return await this.categoryService.deleteCategory(id);
  }
}
