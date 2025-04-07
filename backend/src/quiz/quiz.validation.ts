import { CreateQuizDto } from './dto/createQuiz.dto';
import { BadRequestException } from '@nestjs/common';
import { UpdateQuizDto } from './dto/updateQuiz.dto';

export function validateQuizData(quiz: CreateQuizDto) {
  const { title, description, categoryId } = quiz;

  if (!title || !description || !categoryId)
    throw new BadRequestException('Quiz fields missing');

  if (
    title.trim() === '' ||
    // imgUrl.trim() === '' ||
    description.trim() === '' ||
    categoryId.trim() === ''
  )
    throw new BadRequestException('Quiz fields can not be empty');
}

export function validateUpdateQuizData(quiz: UpdateQuizDto) {
  const { title, description, categoryId } = quiz;

  if (!title && !description && !categoryId)
    throw new BadRequestException(
      'At least one field must be provided for update',
    );

  if (title !== undefined && title.trim() === '')
    throw new BadRequestException("Title field can't be empty");

  // if (imgUrl !== undefined && imgUrl.trim() === '')
  //   throw new BadRequestException("Image URL field can't be empty");

  if (description !== undefined && description.trim() === '')
    throw new BadRequestException("Description field can't be empty");

  if (categoryId !== undefined && categoryId.trim() === '')
    throw new BadRequestException("Category ID can't be empty");
}
