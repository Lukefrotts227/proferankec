/*
  Warnings:

  - You are about to drop the column `Difficulty` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `Learning` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `Lecture` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `Overallrating` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `Workload` on the `Review` table. All the data in the column will be lost.
  - Added the required column `difficulty` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `learning` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lecture` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overallRating` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workload` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Course_name_key";

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "courseId" INTEGER NOT NULL,
    "professorId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "overallRating" INTEGER NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "workload" INTEGER NOT NULL,
    "lecture" INTEGER NOT NULL,
    "learning" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    CONSTRAINT "Review_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("comment", "courseId", "id", "professorId", "userId") SELECT "comment", "courseId", "id", "professorId", "userId" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
