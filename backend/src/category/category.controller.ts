import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/category.dto';

@Controller('category')
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
  @ApiOperation({ summary: 'Get category by id' })
  @ApiResponse({ status: 200, description: 'Returns category by id if found' })
  @ApiResponse({ status: 404, description: 'category not found' })
  async getCategoryById(@Param() id: string) {
    const category = await this.categoryService.getById(id);
    return category;
  }

  @Post()
  @ApiOperation({ summary: 'Create category' })
  @ApiResponse({ status: 200, description: 'Successfully created category' })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  async createCategory(@Body() quiz: CreateCategoryDto) {
    const response = await this.categoryService.createCategory(quiz);
    return response;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete category' })
  @ApiResponse({ status: 200, description: 'Successfully deleted category' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async deleteCategory(@Param('id') id: string) {
    const response = await this.categoryService.deleteCategory(id);
    return response;
  }
}
