create or replace function random_emoji() returns setof emojis as $$
  select * from emojis WHERE hidden = false ORDER BY random() LIMIT 1;
$$ language sql;

create or replace function random_character() returns setof characters as $$
  select * from characters ORDER BY random() LIMIT 1;
$$ language sql;

INSERT INTO
public.characters (name, title, franchise)
VALUES
('Garrus', 'Spectre, Squadmate', 'Mass Effect'),
('Tali', 'Technician, Squadmate', 'Mass Effect'),
('Joker', 'Clown Prince of Crime', 'Batman'),
('Morgana', 'Phantom Thief of Hearts', 'Persona 5'),
('Scrooge McDuck', 'World’s richest duck', 'Disney')
('Spider-Man', 'Amazing Superhero', 'Marvel')
;
