CREATE TABLE `quota_daily` (
	`day` text NOT NULL,
	`actor_hash` text NOT NULL,
	`attempts` integer DEFAULT 0 NOT NULL,
	`successes` integer DEFAULT 0 NOT NULL,
	`blocked` integer DEFAULT 0 NOT NULL,
	`updated_at` text NOT NULL,
	PRIMARY KEY(`day`, `actor_hash`)
);
--> statement-breakpoint
CREATE TABLE `run_receipts` (
	`id` text PRIMARY KEY NOT NULL,
	`day` text NOT NULL,
	`actor_hash` text NOT NULL,
	`input_hash` text NOT NULL,
	`model` text NOT NULL,
	`status` text NOT NULL,
	`latency_ms` integer NOT NULL,
	`created_at` text NOT NULL
);
