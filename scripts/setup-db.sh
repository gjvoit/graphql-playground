#!/bin/bash
# TODO: Dockerize the PG database for better environment isolation
PGPASSWORD=SkySpecs4078ExtraordinarilySecure psql -h localhost -U postgres -c "DROP DATABASE skyspecsgaret;"
PGPASSWORD=SkySpecs4078ExtraordinarilySecure psql -h localhost -U postgres -c "CREATE DATABASE skyspecsgaret;"
PGPASSWORD=SkySpecs4078ExtraordinarilySecure psql -h localhost -U postgres -d skyspecsgaret -c "
CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  gist_id VARCHAR (255)
);
";
PGPASSWORD=SkySpecs4078ExtraordinarilySecure psql -h localhost -U postgres -d skyspecsgaret -c "CREATE UNIQUE INDEX gist_id_idx ON favorites (gist_id);"