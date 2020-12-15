#!/bin/bash
# TODO: Dockerize the PG database for better environment isolation
PGPASSWORD=GraphQLPlayground4078ExtraordinarilySecure psql -h localhost -U garetuser -d postgres -c "DROP DATABASE graphqlgaret;"
PGPASSWORD=GraphQLPlayground4078ExtraordinarilySecure psql -h localhost -U garetuser -d postgres -c "CREATE DATABASE graphqlgaret;"
PGPASSWORD=GraphQLPlayground4078ExtraordinarilySecure psql -h localhost -U garetuser -d graphqlgaret -c "
CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  gist_id VARCHAR (255)
);
";
PGPASSWORD=GraphQLPlayground4078ExtraordinarilySecure psql -h localhost -U garetuser -d graphqlgaret -c "CREATE UNIQUE INDEX gist_id_idx ON favorites (gist_id);"
