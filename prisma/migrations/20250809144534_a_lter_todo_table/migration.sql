/*
  Warnings:

  - Added the required column `desc` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Todo" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "desc" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
