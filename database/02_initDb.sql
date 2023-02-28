BEGIN;

DROP TABLE IF EXISTS "sport","activity","photo","comment","user","location","user_has_sport";

CREATE TABLE "sport"
(
	"id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	"name" TEXT NOT NULL UNIQUE
);

CREATE TABLE "location" (
  "id" integer GENERATED ALWAYS AS IDENTITY,
  "name" VARCHAR(255) NOT NULL,
  "postcode" VARCHAR(255) NOT NULL,
  "department" VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
		UNIQUE(name,department)
);


CREATE TABLE "user"
(
    "id" integer GENERATED ALWAYS AS IDENTITY,
    "firstname" text NOT NULL,
    "lastname" text NOT NULL,
    "login" text NOT NULL UNIQUE,
    "password" text NOT NULL,
    "age" DATE,
    "bio" text,
	"email" text NOT NULL UNIQUE,
    "location_id" integer,
    PRIMARY KEY (id),
    CONSTRAINT "Location_ID" FOREIGN KEY (location_id)
        REFERENCES location (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

CREATE TABLE "activity"
(
    "id" integer GENERATED ALWAYS AS IDENTITY,
    "title" text NOT NULL UNIQUE,
    "note" integer,
    "description" text,
    "family_tag" boolean DEFAULT false,
    "sport_id" integer NOT NULL,
    "user_id" integer NOT NULL,
    "location_id" integer,
    "photo" text,
    PRIMARY KEY (id),
    CONSTRAINT sport_id FOREIGN KEY (sport_id)
        REFERENCES "sport" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES "user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "location_id" FOREIGN KEY (location_id)
        REFERENCES "location" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

CREATE TABLE "photo"
(
    "id" integer GENERATED ALWAYS AS IDENTITY,
    "name" text NOT NULL,
    "user_id" integer ,
    "activity_id" integer ,
    PRIMARY KEY (id),
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES "user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "activity_id" FOREIGN KEY (activity_id)
        REFERENCES "activity" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

CREATE TABLE "comment"
(
    "id" integer GENERATED ALWAYS AS IDENTITY,
    "content" text NOT NULL,
    "activity_note" integer,
    "user_id" integer NOT NULL,
    "activity_id" integer NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES "user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "activity_id" FOREIGN KEY (activity_id)
        REFERENCES "activity" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID
);

CREATE TABLE "user_has_sport"
(
    "id" integer GENERATED ALWAYS AS IDENTITY,
    "user_id" integer NOT NULL,
    "sport_id" integer NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT "user_id" FOREIGN KEY (user_id)
        REFERENCES "user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "sport_id" FOREIGN KEY (sport_id)
        REFERENCES "sport" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

COMMIT;