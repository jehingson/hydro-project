"use strict";

var _apolloServerExpress = require("apollo-server-express");

module.exports = (0, _apolloServerExpress.gql)`
  type File {
    url: String!
  }
  extend type Query {
    hello: String!
  }
  extend type Mutation {
    uploadFile(file: Upload!):File!
  }
  `;