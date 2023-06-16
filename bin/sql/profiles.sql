CREATE TABLE profile
(
    uuid       VARCHAR(64) UNIQUE  NOT NULL,
    username   VARCHAR(256)        NOT NULL,
    email      VARCHAR(256) UNIQUE NOT NULL,
    hobby      VARCHAR(512)        NOT NULL,
    created_on TIMESTAMP
);
