const ApiError = require('../../exception/apiError');

module.exports = async (req, res, next) => {
  try {
    // validate is userLvl okay to do this
    if (req.userData.type !== 1) {
      return next(res.json({ user: req.userData }));
    }
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};
