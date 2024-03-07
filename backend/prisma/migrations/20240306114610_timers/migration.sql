-- CreateEnum
CREATE TYPE "TimerType" AS ENUM ('ONE_MINUTE', 'THREE_MINUTES', 'FIVE_MINUTES');

-- CreateTable
CREATE TABLE "Timer" (
    "id" TEXT NOT NULL,
    "type" "TimerType" NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Timer_pkey" PRIMARY KEY ("id")
);
