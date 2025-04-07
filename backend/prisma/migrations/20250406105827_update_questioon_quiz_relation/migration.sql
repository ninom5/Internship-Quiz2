/*
  Warnings:

  - The values [MATCH,ORDER] on the enum `QuestionType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `quizId` on the `Question` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "QuestionType_new" AS ENUM ('SELECT', 'INPUT', 'SLIDER', 'CHECKBOX', 'RADIO');
ALTER TABLE "Question" ALTER COLUMN "type" TYPE "QuestionType_new" USING ("type"::text::"QuestionType_new");
ALTER TYPE "QuestionType" RENAME TO "QuestionType_old";
ALTER TYPE "QuestionType_new" RENAME TO "QuestionType";
DROP TYPE "QuestionType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_quizId_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "quizId",
ADD COLUMN     "maxValue" INTEGER,
ADD COLUMN     "minValue" INTEGER;

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "QuizQuestions" (
    "quizId" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,

    CONSTRAINT "QuizQuestions_pkey" PRIMARY KEY ("quizId","questionId")
);

-- AddForeignKey
ALTER TABLE "QuizQuestions" ADD CONSTRAINT "QuizQuestions_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizQuestions" ADD CONSTRAINT "QuizQuestions_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
