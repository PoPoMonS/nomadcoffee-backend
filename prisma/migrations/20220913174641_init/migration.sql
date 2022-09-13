-- CreateTable
CREATE TABLE "Coffee" (
    "id" SERIAL NOT NULL,
    "menuName" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "sugarLevel" INTEGER NOT NULL,
    "caffeine" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coffee_pkey" PRIMARY KEY ("id")
);
