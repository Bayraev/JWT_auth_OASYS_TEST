const ApiError = require('../../exception/apiError');
const { authServices } = require('../../services/authService');

module.exports = async (req, res, next) => {
  const { nickname, password, lvl, type } = req.body;

  //* some validation
  // nickname validation
  const isNicknameOkay = authServices.isNicknameOkay(nickname);
  if (!isNicknameOkay) {
    return next(ApiError.BadRequest('Необходимо ввести никнейм!'));
  }
  const isNickameTaken = await authServices.isNickameFree(nickname);
  if (!isNickameTaken) {
    return next(ApiError.BadRequest('Никнейм занят!'));
  }
  // type and lvl validation
  const isTypeOkay = authServices.isTypeOkay(type);
  if (!isTypeOkay) {
    return next(ApiError.BadRequest('Проблемы с выбранным рангом!'));
  }
  const isLvlOkay = authServices.isLvlOkay(lvl, type);
  if (!isLvlOkay) {
    return next(ApiError.BadRequest('Проблемы с выбранным лвл!'));
  }
  // password validation then hashing if we have it (if we dont, we dont update pass)
  const isPasswordOkay = authServices.isPasswordOkay(password);
  let passwordHash = null;
  if (isPasswordOkay) {
    passwordHash = await authServices.hashData(password);
    req.body.passwordHash = passwordHash;
  }

  next();
};
