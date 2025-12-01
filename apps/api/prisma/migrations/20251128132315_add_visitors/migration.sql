/*
  Warnings:

  - You are about to drop the column `createdAt` on the `VisitorConfig` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Visitor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "idCardNumber" TEXT NOT NULL,
    "visitTime" DATETIME NOT NULL,
    "visitFloor" TEXT NOT NULL,
    "isRegistered" BOOLEAN NOT NULL DEFAULT false,
    "receptionistId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checkInTime" DATETIME,
    "checkInStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "verificationStatus" TEXT NOT NULL DEFAULT 'PENDING'
);
INSERT INTO "new_Visitor" ("checkInStatus", "checkInTime", "createdAt", "id", "idCardNumber", "name", "phoneNumber", "receptionistId", "updatedAt", "verificationStatus", "visitFloor", "visitTime") SELECT "checkInStatus", "checkInTime", "createdAt", "id", "idCardNumber", "name", "phoneNumber", "receptionistId", "updatedAt", "verificationStatus", "visitFloor", "visitTime" FROM "Visitor";
DROP TABLE "Visitor";
ALTER TABLE "new_Visitor" RENAME TO "Visitor";
CREATE INDEX "Visitor_phoneNumber_idx" ON "Visitor"("phoneNumber");
CREATE INDEX "Visitor_idCardNumber_idx" ON "Visitor"("idCardNumber");
CREATE INDEX "Visitor_visitTime_idx" ON "Visitor"("visitTime");
CREATE TABLE "new_VisitorConfig" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_VisitorConfig" ("description", "id", "key", "updatedAt", "value") SELECT "description", "id", "key", "updatedAt", "value" FROM "VisitorConfig";
DROP TABLE "VisitorConfig";
ALTER TABLE "new_VisitorConfig" RENAME TO "VisitorConfig";
CREATE UNIQUE INDEX "VisitorConfig_key_key" ON "VisitorConfig"("key");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
