"use strict";

var _cors = _interopRequireDefault(require("cors"));

var _http = _interopRequireDefault(require("http"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _express = _interopRequireDefault(require("express"));

var _apolloServerExpress = require("apollo-server-express");

var _index = _interopRequireDefault(require("./models/index.js"));

var _schema = _interopRequireDefault(require("./graphql/schema"));

var _resolvers = _interopRequireDefault(require("./graphql/resolvers"));

var _graphqlUpload = require("graphql-upload");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv/config');

const cookieParser = require('cookie-parser');

const app = (0, _express.default)();
app.use(cookieParser());

_index.default.sequelize.sync({
  force: process.env.SSLON === 'true' ? true : false
});

const server = new _apolloServerExpress.ApolloServer({
  introspection: true,
  typeDefs: _schema.default,
  resolvers: _resolvers.default,
  context: async ({
    req
  }) => {
    const authUser = await getUser(req);
    return {
      authUser
    };
  }
});
app.use(_express.default.urlencoded({
  extended: false
}));

const getUser = async req => {
  const token = req.headers['x-token'];

  if (token) {
    try {
      return await _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      throw new _apolloServerExpress.AuthenticationError('¡Debes iniciar sesión para continuar!');
    }
  }
};

server.applyMiddleware({
  app,
  path: '/graphql'
});

const httpServer = _http.default.createServer(app);

server.installSubscriptionHandlers(httpServer);
app.use((0, _cors.default)());
app.use((0, _graphqlUpload.graphqlUploadExpress)());

if (process.env.NODE_ENV === 'production') {
  app.use(_express.default.static('frontend/dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

const port = process.env.PORT || 3000;
httpServer.listen({
  port
}, () => {
  console.log(`Apollo Server on ${process.env.URL}:${port}/graphql`);
});