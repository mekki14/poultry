ALTER TABLE "orders" ADD COLUMN "slaughter_with_delivery" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "slaughter_fee" text;