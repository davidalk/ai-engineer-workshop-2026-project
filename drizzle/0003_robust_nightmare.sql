CREATE TABLE `points_history` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`points` integer NOT NULL,
	`reason` text NOT NULL,
	`related_entity_type` text,
	`related_entity_id` integer,
	`created_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_gamification` (
	`user_id` integer PRIMARY KEY NOT NULL,
	`total_points` integer DEFAULT 0 NOT NULL,
	`last_activity_date` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
