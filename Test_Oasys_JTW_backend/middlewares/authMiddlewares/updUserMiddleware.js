const ApiError = require('../../exception/apiError');

module.exports = (req, res, next) => {
  try {
    const id = req.params.id; // id we searching
    const user = req.userData; // users who search

    console.log(user, id);
    // if user is not user who search his own id OR user is not 1-2+
    const condition1 = user.type > 1 && user.lvl < 3; // bad if..
    const condition2 = user._id !== id && user.lvl < 2; // bad if he is lvl 2 or less

    if (condition2 && condition1) {
      next(ApiError.PermissionDenied());
    }

    next();
  } catch (error) {
    next(ApiError.BadRequest('Непредвиденная ошибка!'));
  }
};
