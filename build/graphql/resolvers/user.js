'use strict';

var _apolloServerExpress = require("apollo-server-express");

var _models = _interopRequireDefault(require("../../models"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

module.exports = {
  Query: {
    async allUsers() {
      return await _models.default.User.findAll();
    },

    async fetchUser(_, __, {
      authUser
    }) {
      if (!authUser) throw new Error('Error de autenticacion');
      const user = await _models.default.User.findOne({
        where: {
          uid: authUser.uid
        }
      });
      return user;
    }

  },
  Mutation: {
    async signIn(_, {
      email,
      password
    }) {
      const user = await _models.default.User.findOne({
        where: {
          email
        }
      });

      if (!user) {
        throw new Error('Usuario o contraseña incorrecto');
      }

      const valid = await _bcrypt.default.compare(password, user.password);

      if (!valid) {
        throw new Error('Usuario o contraseña incorrecto');
      }

      const token = _jsonwebtoken.default.sign({
        uid: user.uid,
        email: user.email
      }, process.env.JWT_SECRET, {
        expiresIn: '24h'
      });

      const result = user.toJSON();
      result.photo = result.photo ? result.photo : '';
      return { ...result,
        token
      };
    },

    register: async (_, args) => {
      let {
        username,
        email,
        password
      } = args;
      if (!username || !email || !password) throw new Error('Revisa la información, faltan datos');
      const userByEmail = await _models.default.User.findOne({
        where: {
          email
        }
      });
      if (userByEmail) throw new Error('El correo ya se encuentra registrado.');
      const user = await _models.default.User.create({
        username,
        email,
        password: await _bcrypt.default.hash(password, 10)
      });
      return user;
    },

    async updateUser(_, args, {
      authUser
    }) {
      let {
        username,
        photo
      } = args;
      let data = {};

      if (!authUser) {
        throw new Error('¡Debes iniciar sesión para continuar!');
      }

      try {
        const user = await _models.default.User.findOne({
          where: {
            email: authUser.email
          }
        });

        if (!user) {
          throw new Error('¡Debes iniciar sesión para continuar!');
        }

        if (username) data.username = username;
        if (photo) data.photo = photo;
        await user.update(data);
        return user;
      } catch (err) {
        throw new _apolloServerExpress.ApolloError('¡Debes iniciar sesión para continuar!');
      }
    }

  }
};