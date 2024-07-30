const UserModel = require('../models/UserModel');
const { authServices } = require('../services/authService');
const jwt = require('jsonwebtoken');

module.exports.userController = {
  postUser: async (req, res) => {
    try {
      const { nickname, password, lvl, type } = req.body;

      //* some validation
      // nickname validation
      const isNicknameOkay = authServices.isNicknameOkay(nickname);
      if (!isNicknameOkay) {
        return res.status(400).json({ error: 'nickname required!' });
      }
      const isNickameTaken = await authServices.isNickameFree(nickname);
      if (!isNickameTaken) {
        return res.status(400).json({ error: 'This nickname already taken!' });
      }
      // type and lvl validation
      const isTypeOkay = authServices.isTypeOkay(type);
      if (!isTypeOkay) {
        return res.status(400).json({ error: 'You must have type admin(1) or user(2)!' });
      }
      const isLvlOkay = authServices.isLvlOkay(lvl, type);
      if (!isLvlOkay) {
        return res.status(400).json({ error: 'Yu have some lvl issues!' });
      }
      // password validation then hashing
      const isPasswordOkay = authServices.isPasswordOkay(password);
      if (!isPasswordOkay) {
        return res.status(400).json({ error: 'Password should be at least 6 characters!' });
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

      res.status(200).json(user);
    } catch (error) {}
  },

  authUser: async (req, res) => {
    const { nickname, password } = req.body;

    // some validation
    // nickname validation
    const isNicknameOkay = authServices.isNicknameOkay(nickname);
    if (!isNicknameOkay) {
      return res.status(400).json({ error: 'nickname required!' });
    }
    // password validation then hashing
    const isPasswordOkay = authServices.isPasswordOkay(password);
    if (!isPasswordOkay) {
      return res.status(400).json({ error: 'Password should be at least 6 characters!' });
    }

    // find user and validate
    const user = await UserModel.findOne({ nickname });
    if (!user) {
      return res.status(400).json({ error: 'User not found!' });
    }

    // compare pass and pass-hash. Sign jwt
    const match = await authServices.compareHash(password, user.password);
    if (!match) {
      return res.status(400).json({ error: 'Wrong password!' });
    }
    if (match) {
      jwt.sign(
        { nickname: user.nickname, _id: user._id },
        process.env.JWT_SECRET,
        {},
        (error, token) => {
          if (error) throw error;
          res.cookie('token', token).json(user);
        },
      );
    }
  },
};
