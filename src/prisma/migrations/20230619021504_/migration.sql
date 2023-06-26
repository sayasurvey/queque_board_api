/*
  Warnings:

  - You are about to drop the column `body` on the `Board` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Board" DROP COLUMN "body",
ADD COLUMN     "content" TEXT;
