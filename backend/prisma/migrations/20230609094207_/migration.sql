/*
  Warnings:

  - Added the required column `userId` to the `bet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bet" ADD COLUMN     "userId" INTEGER NOT NULL;
