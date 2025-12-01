-- CreateTable
CREATE TABLE "Visitor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "idCardNumber" TEXT NOT NULL,
    "visitTime" DATETIME NOT NULL,
    "visitFloor" TEXT NOT NULL,
    "checkInStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "verificationStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "checkInTime" DATETIME,
    "receptionistId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "VisitorConfig" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Visitor_phoneNumber_key" ON "Visitor"("phoneNumber");
CREATE INDEX "Visitor_phoneNumber_idx" ON "Visitor"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Visitor_idCardNumber_key" ON "Visitor"("idCardNumber");
CREATE INDEX "Visitor_idCardNumber_idx" ON "Visitor"("idCardNumber");

-- CreateIndex
CREATE INDEX "Visitor_visitTime_idx" ON "Visitor"("visitTime");

-- CreateIndex
CREATE UNIQUE INDEX "VisitorConfig_key_key" ON "VisitorConfig"("key");

-- Insert default configuration
INSERT INTO "VisitorConfig" ("key", "value", "description", "updatedAt") VALUES 
('background_image', '', '待机页面背景图片URL', CURRENT_TIMESTAMP),
('company_logo', '', '企业LOGO图片URL', CURRENT_TIMESTAMP),
('welcome_text', '欢迎来访', '待机页面欢迎文字', CURRENT_TIMESTAMP),
('sub_text', '请按下方按钮开始签到', '待机页面副标题文字', CURRENT_TIMESTAMP);