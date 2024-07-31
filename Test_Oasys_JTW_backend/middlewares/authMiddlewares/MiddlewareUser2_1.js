module.exports = async (req, res, next) => {
  const id = req.params.id; // id we searching
  const user = req.userData; // users who search
  // This 2-1+ middleware. Lowest rang
  const condition = user._id === id;

  if (condition) {
    req.gotAccess = true; //* Marker that we got access
  }

  next();
};
