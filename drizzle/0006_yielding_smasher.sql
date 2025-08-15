CREATE TYPE "public"."userRoles" AS ENUM('student', 'manager');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "userRoles" DEFAULT 'student' NOT NULL;