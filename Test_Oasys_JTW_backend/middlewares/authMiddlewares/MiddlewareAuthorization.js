const ApiError = require('../../exception/apiError');
const UserModel = require('../../models/UserModel');
const { authServices } = require('../../services/authService');

module.exports = async (req, res, next) => {
  const { nickname, password } = req.body;

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

  req.match = match;
  req.user = user;

  next();
};
