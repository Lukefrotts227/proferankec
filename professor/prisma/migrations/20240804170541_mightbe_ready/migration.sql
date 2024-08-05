/*
  Warnings:

  - You are about to drop the column `rating` on the `Review` table. All the data in the column will be lost.
  - Added the required column `Difficulty` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Learning` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Lecture` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Overallrating` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Workload` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "courseId" INTEGER NOT NULL,
    "professorId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "Overallrating" INTEGER NOT NULL,
    "Difficulty" INTEGER NOT NULL,
    "Workload" INTEGER NOT NULL,
    "Lecture" INTEGER NOT NULL,
    "Learning" INTEGER NOT NULL,
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
