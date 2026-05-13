ALTER TABLE "orders" RENAME COLUMN "farmer_id" TO "seller_id";
--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "orders_farmer_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_seller_id_user_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
