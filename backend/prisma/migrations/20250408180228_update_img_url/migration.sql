/*
  Warnings:

  - You are about to drop the column `imgUrl` on the `Quiz` table. All the data in the column will be lost.
  - Added the required column `imgUrl` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "imgUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "imgUrl";
