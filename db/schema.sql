DROP DATABASE IF EXISTS waitlist_db;
CREATE DATABASE waitlist_db;
USE waitlist_db;

CREATE TABLE guests (
    id int not null AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    guestCount int not null,
    sat int not null,
    waitTime timestamp DEFAULT CURRENT_TIMESTAMP,
    satTime timestamp,
    primary key (id)
)

