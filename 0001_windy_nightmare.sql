CREATE TABLE `announcements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(220) NOT NULL,
	`body` text NOT NULL,
	`priority` enum('normal','important') NOT NULL DEFAULT 'normal',
	`publishedAt` timestamp NOT NULL DEFAULT (now()),
	`publishedBy` int,
	CONSTRAINT `announcements_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `attendance` (
	`id` int AUTO_INCREMENT NOT NULL,
	`employeeId` int NOT NULL,
	`workDate` date NOT NULL,
	`checkIn` timestamp,
	`checkOut` timestamp,
	`status` enum('present','late','absent','leave') NOT NULL DEFAULT 'present',
	CONSTRAINT `attendance_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `employees` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fullName` varchar(180) NOT NULL,
	`employeeNumber` varchar(40) NOT NULL,
	`nationalId` varchar(40) NOT NULL,
	`department` varchar(120) NOT NULL,
	`jobTitle` varchar(120) NOT NULL,
	`phone` varchar(40),
	`status` enum('active','inactive') NOT NULL DEFAULT 'active',
	`joinedAt` date,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `employees_id` PRIMARY KEY(`id`),
	CONSTRAINT `employees_employeeNumber_unique` UNIQUE(`employeeNumber`),
	CONSTRAINT `employees_nationalId_unique` UNIQUE(`nationalId`)
);
--> statement-breakpoint
CREATE TABLE `knowledgeEntries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(220) NOT NULL,
	`content` text NOT NULL,
	`fileKey` varchar(400),
	`fileUrl` varchar(600),
	`createdBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `knowledgeEntries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `leaveRequests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`employeeId` int NOT NULL,
	`leaveType` varchar(80) NOT NULL,
	`startDate` date NOT NULL,
	`endDate` date NOT NULL,
	`days` int NOT NULL,
	`reason` text,
	`status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
	`managerNote` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`decidedAt` timestamp,
	CONSTRAINT `leaveRequests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`employeeId` int NOT NULL,
	`title` varchar(220) NOT NULL,
	`body` text NOT NULL,
	`isRead` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
