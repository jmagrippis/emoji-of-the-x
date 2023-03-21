create policy "Enable READ access for ALL"
on "public"."quotes"
as permissive
for select
to public
using (true);



