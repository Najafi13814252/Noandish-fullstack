-- AlterTable
ALTER TABLE `Course` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- Backfill: ردیف‌های موجود همگی با DEFAULT یکسان ساخته می‌شوند؛
-- به ترتیب شناسه (که برای رکوردهای فعلی ULID و زمان‌محور است) یکی در میان روز پخش می‌شوند
-- تا مرتب‌سازی «جدیدترین» از همین حالا معنی داشته باشد.
SET @rn := 0;
UPDATE `Course` SET `createdAt` = NOW(3) - INTERVAL (@rn := @rn + 1) DAY ORDER BY `id`;
