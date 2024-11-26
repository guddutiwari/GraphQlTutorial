const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const { USERS, TODO } = require("./data");

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
      type User {
        id: ID!
        name: String!
        username: String!
        email: String!
        phone: String!
      }
      type Todo {
        id: ID!
        title: String!
        completed: Boolean
        user: User
      }
      type Query {
        getTodos: [Todo]
        getAllUsers: [User]
        getUser(id: ID!): User
      }
    `,
    resolvers: {
      Todo: {
        user: async (todo) => USERS.find((e) => e.id === todo.id),
      },
      Query: {
        getTodos: async () => TODO,
        getAllUsers: async () => USERS,
        getUser: async (parent, { id }) => USERS.find((e) => e.id === id),
      },
    },
  });

  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  app.use(bodyParser.json());
  await server.start();
  app.use("/graphql", expressMiddleware(server));

  app.listen(8080, () => console.log(`Server started at port: 8080`));
}

startServer();
