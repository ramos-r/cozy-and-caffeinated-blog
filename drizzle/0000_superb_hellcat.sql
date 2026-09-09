CREATE TABLE "gallery_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"caption" varchar(200) NOT NULL,
	"category" varchar(20) NOT NULL,
	"image_url" text,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(200) NOT NULL,
	"title" varchar(200) NOT NULL,
	"excerpt" text NOT NULL,
	"category" varchar(20) NOT NULL,
	"content" text NOT NULL,
	"cover_url" text,
	"tags" text[],
	"published" boolean DEFAULT true NOT NULL,
	"date" date NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "site_settings" (
	"id" integer PRIMARY KEY DEFAULT 1 NOT NULL,
	"reading_title" varchar(200) NOT NULL,
	"reading_detail" varchar(200) NOT NULL,
	"drinking_detail" varchar(200) NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
