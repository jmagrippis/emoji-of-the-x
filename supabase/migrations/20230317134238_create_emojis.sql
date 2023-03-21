create table "public"."emojis" (
    "code" text not null,
    "created_at" timestamp with time zone default now(),
    "character" text not null,
    "name" text not null,
    "hidden" boolean not null default false
);


alter table "public"."emojis" enable row level security;

CREATE UNIQUE INDEX emojis_character_key ON public.emojis USING btree ("character");

CREATE UNIQUE INDEX emojis_pkey ON public.emojis USING btree (code);

alter table "public"."emojis" add constraint "emojis_pkey" PRIMARY KEY using index "emojis_pkey";

alter table "public"."emojis" add constraint "emojis_character_key" UNIQUE using index "emojis_character_key";

create policy "Enable READ access for all"
on "public"."emojis"
as permissive
for select
to public
using (true);



