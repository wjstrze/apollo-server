import express from "express";
import { connect } from "mongoose";
import { ApolloServer } from "apollo-server-express";
import { config } from "dotenv";

import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

config();

const startServer = async () => {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });
  server.applyMiddleware({ app });

  await connect(process.env.CONNECTION_STRING, {
    dbName: "test-12",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app.listen({ port: 4000 }, () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );
  });
};

startServer();
