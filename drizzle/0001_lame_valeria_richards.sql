ALTER TABLE `users_table` RENAME TO `work_orders`;--> statement-breakpoint
ALTER TABLE `work_orders` RENAME COLUMN "name" TO "title";--> statement-breakpoint
ALTER TABLE `work_orders` RENAME COLUMN "age" TO "description";--> statement-breakpoint
DROP INDEX `users_table_email_unique`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_work_orders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_work_orders`("id", "title", "description") SELECT "id", "title", "description" FROM `work_orders`;--> statement-breakpoint
DROP TABLE `work_orders`;--> statement-breakpoint
ALTER TABLE `__new_work_orders` RENAME TO `work_orders`;--> statement-breakpoint
PRAGMA foreign_keys=ON;