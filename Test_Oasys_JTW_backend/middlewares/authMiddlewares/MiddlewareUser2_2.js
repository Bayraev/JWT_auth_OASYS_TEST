const ApiError = require('../../exception/apiError');

module.exports = async (req, res, next) => {
  const id = req.params.id; // id we searching
  const user = req.userData; // users who search
  // This 2-2+ middleware.
  const condition = user._id === id && user.lvl > 1 && user.lvl < 4;

  if (condition) {
    req.gotAccess = true; //* Marker that we got access
  }

  next();
};
