CREATE TABLE `operator_tags` (
	`operator_id` text,
	`tag_id` integer,
	FOREIGN KEY (`operator_id`) REFERENCES `operators`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `operators` (
	`id` text(32) PRIMARY KEY NOT NULL,
	`name` text(256) NOT NULL,
	`description` text(256) NOT NULL,
	`position` text NOT NULL,
	`rarity` text NOT NULL,
	`profession` text(32) NOT NULL,
	`sub_profession_id` text(32) NOT NULL,
	`trait` text,
	`phases` text,
	`talents` text,
	`potential_ranks` text,
	`favor_key_frames` text
);
--> statement-breakpoint
CREATE TABLE `skills` (
	`skill_id` text(32) PRIMARY KEY NOT NULL,
	`operator_id` text,
	`levels` text,
	FOREIGN KEY (`operator_id`) REFERENCES `operators`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` integer PRIMARY KEY NOT NULL,
	`tag` text(256)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `operators_name_unique` ON `operators` (`name`);
