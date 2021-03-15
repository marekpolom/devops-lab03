CREATE TABLE IF NOT EXISTS band (
   id serial PRIMARY KEY,
   name VARCHAR UNIQUE NOT NULL,
   creationDate DATE not NULL
);

insert into band (name, creationdate) values ('Pink Floyd', '01/09/1964')
insert into band (name, creationdate) values ('Genesis', '01/06/1967')
insert into band (name, creationdate) values ('Portishead', '01/10/1991')