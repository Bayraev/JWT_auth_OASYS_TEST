const UserModel = require('../models/UserModel');
const { authServices } = require('../services/authService');

module.exports.userController = {
  postUser: async (req, res) => {
    try {
      const { nickname, password, lvl } = req.body;

      // some validation
      // nickname validation
      const isNicknameOkay = authServices.isNicknameOkay(nickname);
      if (!isNicknameOkay) {
        return res.status(400).json({ error: 'nickname required!' });
      }
      const isNickameTaken = await authServices.isNickameFree(nickname);
      if (!isNickameTaken) {
        return res.status(400).json({ error: 'This nickname already taken!' });
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

    // compare pass and pass-hash
    const match = await authServices.compareHash(password, user.password);
    if (!match) {
      return res.status(400).json({ error: 'Wrong password!' });
    }
    return res.status(200).json({ match });
  },
};
