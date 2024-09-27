CREATE TABLE `transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`description` text NOT NULL,
	`is_expense` integer NOT NULL,
	`amount` real DEFAULT 0 NOT NULL
);
