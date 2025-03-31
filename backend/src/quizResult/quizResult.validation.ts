import { CreateQuizResultDto } from './dto/createQuizResult.dto';
import { BadRequestException } from '@nestjs/common';
import { UpdateQuizResultDto } from './dto/updateQuizResult.dto';

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

export function validateUpdateQuizResult(quizResult: UpdateQuizResultDto) {
  if (!quizResult) throw new BadRequestException('Quiz result is null');

  const { userId, score, quizId } = quizResult;

  if (userId === undefined && score === undefined && quizId === undefined) {
    throw new BadRequestException(
      'At least one field must be provided for update',
    );
  }

  if (userId !== undefined && userId.trim() === '')
    throw new BadRequestException("User ID field can't be empty");

  if (quizId !== undefined && quizId.trim() === '')
    throw new BadRequestException("Quiz ID field can't be empty");

  if (score !== undefined && (isNaN(score) || score < 0))
    throw new BadRequestException(
      'Score must be a valid number greater than or equal to 0',
    );
}
