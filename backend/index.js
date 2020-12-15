import express from 'express';
import expressGraphql from 'express-graphql';
import graphql from 'graphql';
import pg from 'pg';
import cors from 'cors';

// Hardcoded credentials as a shortcut for proof of concept
// In a production environment, establish this connection using a hashed environment variable or flag
// Also do not use a superuser in a production environment.
const client = new pg.Client({
  host: "localhost",
  user: "postgres",
  password: "SkySpecs4078ExtraordinarilySecure",
  database: "skyspecsgaret"
})
client.connect()
 
// Construct a schema, using GraphQL schema language
var schema = graphql.buildSchema(`
  type Favorite {
    id: String!
    gist_id: String!
  }
 
  type Query {
    getFavorites: [String!]
    hello(myVar: String): String
  }
 
  type Mutation {
    createFavorite(gist_id: String): String!
    deleteFavorite(gist_id: String): String
  }
`);

const app = express();
app.use(cors()); // This is not safe for production use, but is used as a workaround for the purposes of enabling the frontend to make calls to our API

// Resolvers
const getFavorites = () => {
  console.log("Get my favorites!")
  return client.query(`SELECT * FROM favorites`)
    .then(resp => {
      if (resp.rows.length) {
        return resp.rows.map(favorite => {
          console.log(favorite);
          return favorite.gist_id;
        });
      } else {
        return [];
      }
    });
}
const createFavorite = ({ gist_id }) => {
  return client.query(`INSERT INTO favorites (gist_id) VALUES (\'${gist_id}\') RETURNING gist_id`)
    .then(resp => {
      return resp.rows[0].gist_id;
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};
// TODO: Sanitize inputs with a better GraphQL<-->Postgres library
const deleteFavorite = ({ gist_id }) => {
  return client.query(`DELETE FROM favorites WHERE gist_id='${gist_id}' RETURNING gist_id`)
    .then(resp => {
      if (resp.rows.length) {
        console.log(resp.rows[0]);
        return resp.rows[0].gist_id;
      }
      console.warn(`gist_id ${gist_id} does not exist`);
      // Unlikely, but we could receive a gist_id that doesn't exist.
      // Ideally we would handle this with a custom error that the client recognizes gracefully.
      // For now, just return null
      return null;
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
}

const hello = (myVar) => {
  console.log("Hello World Console Log");
  return "Hello World";
}

const resolvers = {
  getFavorites,
  createFavorite,
  deleteFavorite,
  hello
};

app.use('/graphql', expressGraphql.graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}));
app.listen(3001);
console.log('Running a GraphQL API server at http://localhost:3001/graphql');
