const bcrypt = require('bcrypt');
const UserModel = require('../models/UserModel');

module.exports.authServices = {
  isNicknameOkay: (nickname) => {
    if (!nickname) {
      return false;
    }
    return true;
  },
  isPasswordOkay: (password) => {
    if (!password || password.length < 6) {
      return false;
    }
    return true;
  },
  isNickameFree: async (nickname) => {
    const taken = await UserModel.findOne({ nickname });
    if (taken) {
      return false;
    }
    return true;
  },
  isTypeOkay: (type) => {
    if (type > 2 || type < 1) return false;
    return true;
  },
  isLvlOkay: (lvl, type) => {
    if (type === 1) {
      if (lvl > 3 || lvl < 1) return false;
      return true;
    }
    if (type === 2) {
      if (lvl > 2 || lvl < 1) return false;
      return true;
    }
  },
  hashData: async (data) => {
    const hashedData = await bcrypt.hash(data, 3);
    return hashedData;
  },
  compareHash: async (data1, data2) => {
    return await bcrypt.compare(data1, data2);
  },
};
