#!/bin/zsh
db="frindr";
echo "Configuring database: $db";
dropdb -U postgres $db;
createdb -U postgres $db;
psql -U postgres -d $db -f ./bin/sql/profiles.sql;
echo "Database configured: $db";
