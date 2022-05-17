BEGIN;

CREATE EXTENSION "uuid-ossp";

CREATE TABLE "public"."users" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4 (),
    "user_name" varchar NOT NULL,
    "email" varchar NOT NULL,
    "password" varchar NOT NULL,
    "createdAt" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id")
);

COMMIT;
