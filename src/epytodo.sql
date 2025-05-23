CREATE DATABASE IF NOT EXISTS epytodo;

use epytodo;

CREATE TABLE IF NOT EXISTS user
(
 id bigint NOT NULL AUTO_INCREMENT,
 email varchar(255) UNIQUE NOT NULL,
 password varchar(255) UNIQUE NOT NULL,
 name varchar(255) NOT NULL,
 firstname varchar(255) NOT NULL,
 created_at datetime NOT NULL DEFAULT NOW(),
 CONSTRAINT t_id PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS todo
(
 id bigint NOT NULL AUTO_INCREMENT,
 title varchar(255) NOT NULL,
 description text NOT NULL,
 created_at datetime NOT NULL DEFAULT NOW(),
 due_time datetime NOT NULL,
 status varchar(255) NOT NULL,
 user_id bigint unsigned NOT NULL,
 CONSTRAINT t_id PRIMARY KEY (id)
);
