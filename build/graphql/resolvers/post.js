"use strict";

var _models = _interopRequireDefault(require("../../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

module.exports = {
  Query: {
    allPost: async (_, __, {
      authUser
    }) => {
      if (!authUser) throw new Error('¡Debes iniciar sesión para continuar!');
      const post = await _models.default.Post.findAll({
        include: _models.default.User,
        order: [['id', 'DESC']]
      });
      return post;
    },

    async fetchPost(_, {
      id
    }, {
      authUser
    }) {
      if (!authUser) throw new Error('¡Debes iniciar sesión para continuar!');
      return await _models.default.Post.findOne(id);
    }

  },
  Mutation: {
    async addPost(_, args, {
      authUser
    }) {
      if (!authUser) throw new Error('¡Debes iniciar sesión para continuar!');
      const user = await _models.default.User.findOne({
        where: {
          email: authUser.email
        }
      });

      if (!user) {
        throw new Error('¡Debes iniciar sesión para continuar!');
      }

      let {
        title,
        description,
        image
      } = args;
      const post = await _models.default.Post.create({
        title,
        description,
        image,
        UserUid: user.dataValues.uid,
        status: true
      });
      return post;
    },

    async updatePost(_, {
      id,
      title,
      description
    }, {
      authUser
    }) {
      if (!authUser) throw new Error('¡Debes iniciar sesión para continuar!');
      const post = await _models.default.Post.findOne({
        where: {
          id: id
        },
        include: _models.default.User
      });
      if (!post) throw new Error('¡La publicacion no existe!');
      let {
        User
      } = post;
      if (User.toJSON().email !== authUser.email) throw new Error('¡Tus credenciales no pertenecen a esta publicacion!');
      let updatePost = {};
      if (title) updatePost.title = title;
      if (description) updatePost.description = description;
      await post.update(updatePost);
      return post;
    },

    async deletePost(_, {
      id
    }, {
      authUser
    }) {
      if (!authUser) throw new Error('¡Debes iniciar sesión para continuar!');
      const post = await _models.default.Post.findOne({
        where: {
          id: id
        },
        include: _models.default.User
      });
      if (!post) throw new Error('¡La publicacion no existe!');
      let {
        User
      } = post;
      if (User.toJSON().email !== authUser.email) throw new Error('¡Tus credenciales no pertenecen a esta publicacion!');
      return await post.destroy();
    }

  },
  Post: {
    user: ({
      User
    }) => {
      let user = User.toJSON();
      user.photo = user.photo ? user.photo : '';
      return user;
    }
  }
};