/*
  Warnings:

  - Added the required column `description` to the `Candidate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "description" TEXT NOT NULL;
