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
('Scrooge McDuck', 'World’s richest duck', 'Disney'),
('Spider-Man', 'Amazing Superhero', 'Marvel');

-- available content types to ask for advice on
INSERT INTO
public.content_types (id)
VALUES
('photo'),
('TikTok'),
('film'),
('video game');

-- sample emojis to get started even without any scrapes
INSERT INTO
public.emojis (code, character, name)
VALUES
('U+1F600','😀','grinning face'),
('U+1F603','😃','grinning face with big eyes'),
('U+1F604','😄','grinning face with smiling eyes');
