create table "public"."advice" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone default now(),
    "emoji_code" text not null,
    "character_id" uuid not null,
    "type" text not null,
    "content" text not null
);


alter table "public"."advice" enable row level security;

create table "public"."content_types" (
    "id" text not null,
    "created_at" timestamp with time zone default now()
);


alter table "public"."content_types" enable row level security;

CREATE UNIQUE INDEX advice_pkey ON public.advice USING btree (id);

CREATE UNIQUE INDEX content_types_pkey ON public.content_types USING btree (id);

alter table "public"."advice" add constraint "advice_pkey" PRIMARY KEY using index "advice_pkey";

alter table "public"."content_types" add constraint "content_types_pkey" PRIMARY KEY using index "content_types_pkey";

alter table "public"."advice" add constraint "advice_character_id_fkey" FOREIGN KEY (character_id) REFERENCES characters(id) not valid;

alter table "public"."advice" validate constraint "advice_character_id_fkey";

alter table "public"."advice" add constraint "advice_emoji_code_fkey" FOREIGN KEY (emoji_code) REFERENCES emojis(code) not valid;

alter table "public"."advice" validate constraint "advice_emoji_code_fkey";

alter table "public"."advice" add constraint "advice_type_fkey" FOREIGN KEY (type) REFERENCES content_types(id) not valid;

alter table "public"."advice" validate constraint "advice_type_fkey";

create policy "Enable READ access for all"
on "public"."advice"
as permissive
for select
to public
using (true);


create policy "Enable READ access for all"
on "public"."content_types"
as permissive
for select
to public
using (true);



