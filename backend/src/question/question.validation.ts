import { CreateQuestionDto } from './dto/createQuestion.dto';
import { BadRequestException } from '@nestjs/common';
import { UpdateQuestionDto } from './dto/updateQuestion.dto';

export function validateQuestionData(question: CreateQuestionDto) {
  const { text, type, answer } = question;
  if (!text || !type || !answer)
    throw new BadRequestException('Missing question data');

  if (text.trim() === '' || type.trim() === '' || answer.trim() === '')
    throw new BadRequestException("Question fields can't be empty");
}

export function validateUpdateQuestionData(question: UpdateQuestionDto) {
  const { text, type, answer } = question;

  if (!text && !type && !answer)
    throw new BadRequestException(
      'At least one field must be provided for update',
    );

  if (text !== undefined && text.trim() === '')
    throw new BadRequestException("Text field can't be empty");

  if (type !== undefined && type.trim() === '')
    throw new BadRequestException("Type field can't be empty");

  if (answer !== undefined && answer.trim() === '')
    throw new BadRequestException("Answer field can't be empty");
}
