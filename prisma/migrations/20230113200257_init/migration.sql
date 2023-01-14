-- CreateTable
CREATE TABLE "Charge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "governmentId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "debtAmount" DECIMAL NOT NULL,
    "debtDueDate" DATETIME NOT NULL,
    "debtId" INTEGER NOT NULL,
    "paidAt" DATETIME,
    "paidAmount" DECIMAL,
    "paidBy" TEXT
);
