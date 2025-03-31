import { CreateQuestionDto } from './dto/createQuestion.dto';
import { BadRequestException } from '@nestjs/common';

export function validateQuestionData(question: CreateQuestionDto) {
  const { text, type, quizId, answer } = question;
  if (!text || !type || !quizId || !answer)
    throw new BadRequestException('Missing question data');

  if (
    text.trim() === '' ||
    type.trim() === '' ||
    quizId.trim() === '' ||
    answer.trim() === ''
  )
    throw new BadRequestException("Question fields can't be empty");
}
