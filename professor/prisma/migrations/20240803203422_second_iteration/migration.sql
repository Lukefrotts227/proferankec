/*
  Warnings:

  - Added the required column `Department` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "School" TEXT NOT NULL,
    "Department" TEXT NOT NULL
);
INSERT INTO "new_Course" ("School", "description", "id", "name") SELECT "School", "description", "id", "name" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
CREATE UNIQUE INDEX "Course_name_key" ON "Course"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
