DROP DATABASE IF EXISTS burgers_db;
CREATE DATABASE burgers_db;
USE burgers_db;

CREATE TABLE burgers (
    id int not null AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    eaten BOOLEAN DEFAULT false,
    primary key (id)
)

