DROP TABLE IF EXISTS `enemies`;
--> statement-breakpoint
CREATE TABLE `enemies` (
	`id` text(16) PRIMARY KEY NOT NULL,
	`name` text(32) NOT NULL,
	`values` text,
	`handbook` text
);
