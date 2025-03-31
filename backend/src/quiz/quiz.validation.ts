import { CreateQuizDto } from './dto/createQuiz.dto';
import { BadRequestException } from '@nestjs/common';

export function validateQuizData(quiz: CreateQuizDto) {
  const { title, imgUrl, description, categoryId } = quiz;

  if (!title || !imgUrl || !description || !categoryId)
    throw new BadRequestException('Quiz fields missing');

  if (
    title.trim() === '' ||
    imgUrl.trim() === '' ||
    description.trim() === '' ||
    categoryId.trim() === ''
  )
    throw new BadRequestException('Quiz fields can not be empty');
}
