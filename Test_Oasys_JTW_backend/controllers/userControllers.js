const ApiError = require('../exception/apiError');
const UserModel = require('../models/UserModel');
const { authServices } = require('../services/authService');
const { jwtService } = require('../services/tokenService');

module.exports.userController = {
  postUser: async (req, res, next) => {
    try {
      const { nickname, lvl, type, passwordHash } = req.body;

      console.log(passwordHash);
      const userDataPrepared = {
        nickname,
        password: passwordHash,
        type,
        lvl,
      };
      if (lvl) {
        userDataPrepared.lvl = lvl; // if we describe user lvl at the begin for yes.
      }
      const user = await UserModel.create(userDataPrepared);
      user.balance = null; // hide balance as default
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },

  authUser: async (req, res, next) => {
    try {
      const { user, match } = req.body;

      // some validation
      if (match) {
        // DTO of user
        const userDto = {
          nickname: user.nickname,
          _id: user._id,
          type: user.type,
          lvl: user.lvl,
        };

        const token = jwtService.generateToken(userDto);

        user.balance = null; // hide balance as default
        res.cookie('token', token).json(user);
      }
    } catch (error) {
      next(error);
    }
  },

  getUsers: async (_, res) => {
    try {
      const users = await UserModel.find();
      users.map((user) => {
        return (user.balance = null); // hide balance
      });
      return res.status(200).json(users);
    } catch (error) {
      res.json(ApiError.BadRequest('Непредвиденная ошибка!'));
    }
  },
  getUserById: async (req, res) => {
    try {
      console.log('marker');
      const id = req.params.id; // get id
      console.log('marker');

      const user = await UserModel.findOne({ _id: id }); // get user by id lol
      user.balance = null; // hide balance as default
      return res.status(200).json(user);
    } catch (error) {
      res.json(ApiError.BadRequest('Непредвиденная ошибка!'));
    }
  },
  getBalanceByid: async (req, res) => {
    try {
      const id = req.params.id; // get id for search user and his balance
      const user = await UserModel.findOne({ _id: id });

      return res.status(200).json({ _id: user._id, balance: user.balance });
    } catch (error) {
      res.json(ApiError.BadRequest('Непредвиденная ошибка!'));
    }
  },
  updUserById: async (req, res, next) => {
    try {
      const id = req.params.id; // search by id
      const { nickname, balance, type, lvl, passwordHash } = req.body; // body dude

      const payload = {}; // describing payload according data
      nickname ? (payload.nickname = nickname) : null;
      balance ? (payload.balance = balance) : null;
      type ? (payload.type = type) : null;
      lvl ? (payload.lvl = lvl) : null;
      passwordHash ? (payload.password = passwordHash) : null;

      const user = await UserModel.findByIdAndUpdate(
        id,
        payload,
        { new: true }, //return updated user in this variable
      );

      return res.status(200).json(user);
    } catch (error) {
      res.json(ApiError.BadRequest('Непредвиденная ошибка!'));
    }
  },
};
