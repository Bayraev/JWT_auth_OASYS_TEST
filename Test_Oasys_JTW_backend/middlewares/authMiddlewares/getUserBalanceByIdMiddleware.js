const ApiError = require('../../exception/apiError');

module.exports = (req, res, next) => {
  try {
    const id = req.params.id; // search by this id
    const user = req.userData; // dude who search

    // conditions
    const condition1 = user.type > 1 && user.lvl < 3; // min 1-3
    const condition2 = user._id !== id;

    if (condition1 && condition2) {
      next(ApiError.PermissionDenied());
    }

    next();
  } catch (error) {
    next(ApiError.BadRequest);
  }
};
