/*
  Warnings:

  - The values [ABC] on the enum `QuestionType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Answer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `answer` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "QuizCategory" AS ENUM ('History', 'Geo', 'Language');

-- AlterEnum
BEGIN;
CREATE TYPE "QuestionType_new" AS ENUM ('SELECT', 'INPUT', 'MATCH', 'ORDER', 'SLIDER');
ALTER TABLE "Question" ALTER COLUMN "type" TYPE "QuestionType_new" USING ("type"::text::"QuestionType_new");
ALTER TYPE "QuestionType" RENAME TO "QuestionType_old";
ALTER TYPE "QuestionType_new" RENAME TO "QuestionType";
DROP TYPE "QuestionType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_categoryId_fkey";

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "answer" TEXT NOT NULL,
ADD COLUMN     "options" TEXT[];

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "category" "QuizCategory" NOT NULL;

-- DropTable
DROP TABLE "Answer";

-- DropTable
DROP TABLE "Category";
