create table "public"."characters" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone default now(),
    "name" text not null,
    "title" text not null,
    "franchise" text not null
);


alter table "public"."characters" enable row level security;

create table "public"."picks" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" date not null,
    "emoji_code" text not null
);


alter table "public"."picks" enable row level security;

create table "public"."quotes" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone not null default now(),
    "pick_id" uuid not null,
    "content" text not null,
    "character_id" uuid not null
);


alter table "public"."quotes" enable row level security;

CREATE UNIQUE INDEX characters_pkey ON public.characters USING btree (id);

CREATE UNIQUE INDEX picks_pkey ON public.picks USING btree (id);

CREATE UNIQUE INDEX quotes_pkey ON public.quotes USING btree (id);

alter table "public"."characters" add constraint "characters_pkey" PRIMARY KEY using index "characters_pkey";

alter table "public"."picks" add constraint "picks_pkey" PRIMARY KEY using index "picks_pkey";

alter table "public"."quotes" add constraint "quotes_pkey" PRIMARY KEY using index "quotes_pkey";

alter table "public"."picks" add constraint "picks_emoji_code_fkey" FOREIGN KEY (emoji_code) REFERENCES emojis(code) not valid;

alter table "public"."picks" validate constraint "picks_emoji_code_fkey";

alter table "public"."quotes" add constraint "quotes_character_id_fkey" FOREIGN KEY (character_id) REFERENCES characters(id) not valid;

alter table "public"."quotes" validate constraint "quotes_character_id_fkey";

alter table "public"."quotes" add constraint "quotes_pick_id_fkey" FOREIGN KEY (pick_id) REFERENCES picks(id) not valid;

alter table "public"."quotes" validate constraint "quotes_pick_id_fkey";

create policy "Enable READ access for everyone"
on "public"."characters"
as permissive
for select
to public
using (true);


create policy "Enable READ access for all"
on "public"."picks"
as permissive
for select
to public
using (true);


create policy "Enable READ access for everyone"
on "public"."quotes"
as permissive
for select
to public
using (true);



