import { CreateQuizResultDto } from './dto/createQuizResult.dto';
import { BadRequestException } from '@nestjs/common';

export function quizResultValidation(quizResult: CreateQuizResultDto) {
  if (!quizResult) throw new BadRequestException('Quiz result is null');

  const { userId, score, quizId } = quizResult;

  if (!userId || !score || !quizId)
    throw new BadRequestException('Missing quiz result fields');

  if (userId.trim() === '' || quizId.trim() === '')
    throw new BadRequestException('Quiz result fields can not be empty');

  if (isNaN(score) || score < 0)
    throw new BadRequestException('Score must be valida number greater than 0');
}
