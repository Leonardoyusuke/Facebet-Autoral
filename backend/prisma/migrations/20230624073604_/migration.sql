/*
  Warnings:

  - You are about to alter the column `odds` on the `bet` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(4,2)`.

*/
-- AlterTable
ALTER TABLE "bet" ALTER COLUMN "odds" SET DATA TYPE DECIMAL(4,2);
