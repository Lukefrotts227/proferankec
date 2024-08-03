/*
  Warnings:

  - You are about to drop the column `name` on the `Professor` table. All the data in the column will be lost.
  - Added the required column `School` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Firstname` to the `Professor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Lastname` to the `Professor` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "School" TEXT NOT NULL
);
INSERT INTO "new_Course" ("description", "id", "name") SELECT "description", "id", "name" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
CREATE UNIQUE INDEX "Course_name_key" ON "Course"("name");
CREATE TABLE "new_Professor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Firstname" TEXT NOT NULL,
    "Lastname" TEXT NOT NULL,
    "Prefix" TEXT,
    "Verified" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Professor" ("Verified", "id") SELECT "Verified", "id" FROM "Professor";
DROP TABLE "Professor";
ALTER TABLE "new_Professor" RENAME TO "Professor";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
