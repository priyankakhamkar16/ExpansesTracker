const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config/db');
const typeDefs = require('./schemas/expenseSchema');
const resolvers = require('./resolvers/expenseResolvers');

const startServer = async () => {
  const app = express();

  // Connect to MongoDB
  await connectDB();

  // Initialize Apollo Server
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`);
  });
};

// Start the server
startServer().catch(err => {
  console.error("Error starting the server:", err);
});
