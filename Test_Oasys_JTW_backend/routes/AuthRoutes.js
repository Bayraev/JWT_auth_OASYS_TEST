const router = require('express').Router();
const cors = require('cors');
const { userController } = require('../controllers/userControllers');
const getUsersMiddleware = require('../middlewares/authMiddlewares/getUsersMiddleware');
const authMiddleware = require('../middlewares/authMiddlewares/authMiddleware');
const getUserByIdMiddleware = require('../middlewares/authMiddlewares/getUserByIdMiddleware');
const getUserBalanceByIdMiddleware = require('../middlewares/authMiddlewares/getUserBalanceByIdMiddleware');
const updUserMiddleware = require('../middlewares/authMiddlewares/updUserMiddleware');

// managing Cross-Oringin Policy
router.use(
  cors({
    credentials: true, // allowing cookies and HTTP titles for auth
    origin: '*', //! EVERYONE CAN SEND REQS YET
  }),
);

router.post('/registration', userController.postUser);
router.post('/login', userController.authUser);
router.get('/users', authMiddleware, getUsersMiddleware, userController.getUsers); // only for 1-1+
router.get('/users/:id', authMiddleware, getUserByIdMiddleware, userController.getUserById); // only for current user or 1-2+
router.put('/users/:id', authMiddleware, updUserMiddleware, userController.updUserById); // for CU or 1-3
router.get(
  '/users/:id/balance',
  authMiddleware,
  getUserBalanceByIdMiddleware,
  userController.getBalanceByid,
); // for current or 1-3
module.exports = router;
