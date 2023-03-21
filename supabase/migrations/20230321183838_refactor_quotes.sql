drop policy "Enable READ access for everyone" on "public"."quotes";

alter table "public"."quotes" drop constraint "quotes_pick_id_fkey";

alter table "public"."quotes" drop column "pick_id";

alter table "public"."quotes" add column "emoji_code" text not null;

alter table "public"."quotes" add constraint "quotes_emoji_code_fkey" FOREIGN KEY (emoji_code) REFERENCES emojis(code) not valid;

alter table "public"."quotes" validate constraint "quotes_emoji_code_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.random_character()
 RETURNS SETOF characters
 LANGUAGE sql
AS $function$
  select * from characters ORDER BY random() LIMIT 1;
$function$
;

CREATE OR REPLACE FUNCTION public.random_emoji()
 RETURNS SETOF emojis
 LANGUAGE sql
AS $function$
  select * from emojis WHERE hidden = false ORDER BY random() LIMIT 1;
$function$
;


