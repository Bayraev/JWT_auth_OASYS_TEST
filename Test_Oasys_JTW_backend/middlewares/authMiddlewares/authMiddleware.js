const ApiError = require('../../exception/apiError');
const { jwtService } = require('../../services/tokenService');

module.exports = async (req, _, next) => {
  try {
    // it must accept user id to get
    const { authorization } = req.headers;
    console.log(1);
    if (!authorization) {
      return next(ApiError.UnauthorizedError());
    }

    const token = authorization.split(' ')[1]; // separate token from Bearer
    if (!token) {
      return next(ApiError.UnauthorizedError());
    }

    // validate token sign and isnt it expired etc, return userData
    // const userData = await jwtService.validateToken(token);
    const userData = jwtService.validateToken(token);

    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }
    req.userData = userData;
    next();
  } catch (error) {
    return next(ApiError.UnauthorizedError());
  }
};
