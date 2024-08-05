const ApiError = require('../../exception/apiError');
const { authServices } = require('../../services/authService');

module.exports = async (req, res, next) => {
  //* some validation
  const { nickname, balance, type, lvl, password } = req.body; // body dude
  // nickname validation
  const isNicknameOkay = authServices.isNicknameOkay(nickname);
  if (!isNicknameOkay) {
    return next(ApiError.BadRequest('Необходимо ввести никнейм!'));
  }
  // type and lvl validation
  const isTypeOkay = authServices.isTypeOkay(type);
  if (!isTypeOkay) {
    return next(ApiError.BadRequest('Подозрительный ранг у вас!'));
  }
  const isLvlOkay = authServices.isLvlOkay(lvl, type);
  if (!isLvlOkay) {
    return next(ApiError.BadRequest('Подозрительный лвл у вас!'));
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
