CREATE TABLE `schedules` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20),
	`device` varchar(255) NOT NULL,
	`problem` text NOT NULL,
	`preferredDate` varchar(10),
	`status` enum('pendente','confirmado','concluído') NOT NULL DEFAULT 'pendente',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `schedules_id` PRIMARY KEY(`id`)
);
