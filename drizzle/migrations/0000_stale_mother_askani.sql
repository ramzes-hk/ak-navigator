CREATE TABLE `activities` (
	`id` text(64),
	`entry_type` text(32),
	`act_type` text(32)
);
--> statement-breakpoint
CREATE TABLE `enemies` (
	`id` text(16) PRIMARY KEY NOT NULL,
	`name` text(32) NOT NULL,
	`values` text,
	`handbook` text
);
--> statement-breakpoint
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
	`description` text(256),
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
CREATE TABLE `stages` (
	`id` text(32) PRIMARY KEY NOT NULL,
	`name` text(64),
	`stage_type` text(16),
	`difficulty` text(16),
	`diff_group` text(16),
	`level_id` text(64),
	`zone_id` text(16),
	`code` text(8),
	`description` text,
	`danger_level` text(8),
	`ap_cost` integer,
	`boss_mark` integer,
	`stage` text
);
--> statement-breakpoint
CREATE TABLE `story` (
	`id` text(64) PRIMARY KEY NOT NULL,
	`trigger_type` text(32),
	`story` text
);
--> statement-breakpoint
CREATE TABLE `story_review` (
	`id` text(64) PRIMARY KEY NOT NULL,
	`story_review_data` text,
	`act_id` text(32),
	FOREIGN KEY (`act_id`) REFERENCES `activities`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` integer PRIMARY KEY NOT NULL,
	`tag` text(256)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `activities_id_unique` ON `activities` (`id`);