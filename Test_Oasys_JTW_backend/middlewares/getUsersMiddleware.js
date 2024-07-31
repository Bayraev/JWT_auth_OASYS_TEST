const ApiError = require('../exception/apiError');
const { jwtService } = require('../services/tokenService');

module.exports = async (req, res, next) => {
  try {
    console.log('asas', req.userData);
    if (req.userData.type !== 1) {
      return next(res.json({ user: req.userData }));
    }
    console.log(5);

    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};
