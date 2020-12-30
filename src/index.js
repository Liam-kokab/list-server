require('dotenv').config();
const http = require('http');
const express = require('express');

const { server, sequelize } = require('./apollo-server');

const app = express();
server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const nukeDatabase = false;
const isDev = process.env.ENV === 'DEV';
const port = process.env.PORT || 4000;

sequelize.sync({ force: isDev && nukeDatabase })
  .then(() => {
    httpServer.listen(port, () => {
      console.log(`🚀 Apollo Server on http://localhost:${port}${server.graphqlPath}`);
      console.log(`🚀 Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`);
    });
});
