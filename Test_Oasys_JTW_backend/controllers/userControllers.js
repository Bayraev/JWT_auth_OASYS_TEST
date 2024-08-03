const ApiError = require('../exception/apiError');
const UserModel = require('../models/UserModel');
const { authServices } = require('../services/authService');
const { jwtService } = require('../services/tokenService');

module.exports.userController = {
  postUser: async (req, res, next) => {
    try {
      const { nickname, password, lvl, type } = req.body;

      //* some validation
      // nickname validation
      const isNicknameOkay = authServices.isNicknameOkay(nickname);
      if (!isNicknameOkay) {
        return next(ApiError.BadRequest('Необходимо ввести никнейм!'));
      }
      const isNickameTaken = await authServices.isNickameFree(nickname);
      if (!isNickameTaken) {
        return next(ApiError.BadRequest('Необходимо ввести никнейм!'));
      }
      // type and lvl validation
      const isTypeOkay = authServices.isTypeOkay(type);
      if (!isTypeOkay) {
        return next(ApiError.BadRequest('Необходимо ввести никнейм!'));
      }
      const isLvlOkay = authServices.isLvlOkay(lvl, type);
      if (!isLvlOkay) {
        return next(ApiError.BadRequest('Необходимо ввести никнейм!'));
      }
      // password validation then hashing
      const isPasswordOkay = authServices.isPasswordOkay(password);
      if (!isPasswordOkay) {
        return next(ApiError.BadRequest('Необходимо ввести никнейм!'));
      }
      const passwordHash = await authServices.hashData(password);

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
      const { nickname, password } = req.body;

      // some validation
      // nickname validation
      const isNicknameOkay = authServices.isNicknameOkay(nickname);
      if (!isNicknameOkay) {
        return next(ApiError.BadRequest('Необходимо ввести никнейм!'));
      }
      // password validation then hashing
      const isPasswordOkay = authServices.isPasswordOkay(password);
      if (!isPasswordOkay) {
        return next(ApiError.BadRequest('Пароль должен быть хотя-бы 6 символов в длину!'));
      }

      // find user and validate
      const user = await UserModel.findOne({ nickname });
      if (!user) {
        return next(ApiError.BadRequest('Пользователь не обнаружен!'));
      }

      // compare pass and pass-hash. Sign jwt
      const match = await authServices.compareHash(password, user.password);
      if (!match) {
        return next(ApiError.BadRequest('Неправильный пароль!'));
      }
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
      const user = await UserModel.find({ _id: id });
      const userBalance = user[0].balance;

      return res.status(200).json(userBalance);
    } catch (error) {
      res.json(ApiError.BadRequest('Непредвиденная ошибка!'));
    }
  },
  updUserById: async (req, res) => {
    try {
      const id = req.params.id; // search by id
      const { nickname, balance, type, lvl } = req.body; // body dude

      const payload = {}; // describing payload according data
      nickname ? (payload.nickname = nickname) : null;
      balance ? (payload.balance = balance) : null;
      type ? (payload.type = type) : null;
      lvl ? (payload.lvl = lvl) : null;

      const user = await UserModel.findByIdAndUpdate(
        id,
        payload,
        { new: true }, //return updated user in this variable
      );

      res.status(200).json({ user, changedField: payload });
    } catch (error) {
      res.json(ApiError.BadRequest('Непредвиденная ошибка!'));
    }
  },
};
