

-- USERs
-- name
create table users (
  id serial primary key,
  name text,
  username varchar(200) not NULL,
  pwhash varchar(60) not NULL
);

-- TODOs
-- name
-- completed
create table todos (
  id serial primary key,
  name text,
  completed boolean,
  user_id integer references users (id) on delete cascade
);

