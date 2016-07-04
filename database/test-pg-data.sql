drop view total_votes_by_name;
drop table if exists votes;
drop table if exists names;
drop table if exists contests;
drop table if exists users;

create table users (
  id serial primary key,
  email varchar(128) not null,
  first_name varchar(128),
  last_name varchar(128),
  api_key varchar(128) not null unique,
  created_at timestamp not null default current_timestamp
);

create table contests (
  id serial primary key,
  code varchar(255) not null unique,
  title varchar(255) not null,
  description text,
  status varchar(10) not null default 'draft'
    check (status in ('draft', 'published', 'archived')),
  created_at timestamp not null default current_timestamp,
  created_by integer references users not null
);

create table names (
  id serial primary key,
  contest_id integer references contests not null,
  label varchar(255) not null,
  normalized_label varchar(255) not null,
  description text,
  created_at timestamp not null default current_timestamp,
  created_by integer references users not null,
  constraint unique_contest_label
    unique(contest_id, normalized_label)
);

create table votes (
  id serial primary key,
  name_id integer references names not null,
  up boolean not null,
  created_at timestamp not null default current_timestamp,
  created_by integer references users not null,
  constraint user_can_vote_once_on_a_name
    unique(name_id, created_by)
);

INSERT INTO "users" ("email","first_name","last_name","api_key")
VALUES
(E'samer@agilelabs.com',E'Samer',E'Buna',E'4242'),
(E'creative@mind.com',E'Creative',E'Mind',E'0000');

INSERT INTO "contests" ("code","title","description","status","created_by")
VALUES
(E'free-programming-books-site',E'Free Programming Books Site',E'A list of free online programming books, categorized by languages/topics',E'draft',1),
(E'visualize-most-popular-tweets',E'Visualize Most Popular Tweets',E'A site to constantly visualize the most popular tweets in your stream',E'published',1),
(E'entrepreneurs-looknig-for-partnership',E'Interview Entrepreneurs Looking For Partnership',NULL,E'archived',1);

INSERT INTO "names" ("contest_id","label","normalized_label","description","created_by")
VALUES
(1,E'RootLib',E'rootlib',E'The Root Library',2),
(1,E'The Free List',E'thefreelist',NULL,2),
(2,E'PopTweet',E'poptweet',NULL,2),
(2,E'TwitterScope',E'twitterscope',NULL,2);

INSERT INTO "votes" ("name_id","up","created_by")
VALUES
(1,TRUE,1),
(1,TRUE,2),
(2,TRUE,1),
(2,FALSE,2),
(3,FALSE,1),
(3,FALSE,2),
(4,TRUE,1),
(4,TRUE,2);

create view total_votes_by_name as
select id as name_id,
  (select count(up) from votes v where v.name_id = n.id and up = true) as up,
  (select count(up) from votes v where v.name_id = n.id and up = false) as down
from names n;
