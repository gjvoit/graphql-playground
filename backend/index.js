import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import endpoints from './api';
 
// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: endpoints,
  graphiql: true,
}));
app.listen(3001);
console.log('Running a GraphQL API server at http://localhost:3001/graphql');
