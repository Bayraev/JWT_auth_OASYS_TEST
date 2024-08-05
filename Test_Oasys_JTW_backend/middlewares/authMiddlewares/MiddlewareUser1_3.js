const ApiError = require('../../exception/apiError');

module.exports = async (req, res, next) => {
  if (req.gotAccess === true) {
    return next();
  } // if we have access no need to read this middleware

  const user = req.userData;

  const condition = user.type === 1 && user.lvl === 3 && user.lvl < 4; // min 1-2+

  // if here we dont get access, there is no permission
  if (condition) {
    req.gotAccess = true; //* Marker that we got access
  }
  if (!req.gotAccess) {
    next(ApiError.PermissionDenied());
  }

  next();
};
