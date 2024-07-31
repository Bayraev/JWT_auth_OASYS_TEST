const ApiError = require('../../exception/apiError');

module.exports = async (req, res, next) => {
  const id = req.params.id; // id we searching
  const user = req.userData; // users who search

  console.log(user, id);
  // if user is not user who search his own id OR user is not 1-2+
  const condition1 = user.type > 1 && user.lvl < 2;
  const condition2 = user._id !== id;
  console.log('ADADADDA', condition1);

  if (condition2 && condition1) {
    next(ApiError.PermissionDenied());
  }

  next();
};
