const router = require('express').Router();
const cors = require('cors');
const { userController } = require('../controllers/userControllers');
const authMiddleware = require('../middlewares/authMiddlewares/authMiddleware');
const MiddlewareUser1_1 = require('../middlewares/authMiddlewares/MiddlewareUser1_1');
const MiddlewareUser2_1 = require('../middlewares/authMiddlewares/MiddlewareUser2_1');
const MiddlewareUser1_2 = require('../middlewares/authMiddlewares/MiddlewareUser1_2');
const MiddlewareUser2_2 = require('../middlewares/authMiddlewares/MiddlewareUser2_2');
const MiddlewareUser1_3 = require('../middlewares/authMiddlewares/MiddlewareUser1_3');

// managing Cross-Oringin Policy
// router.use(
//   cors({
//     credentials: true, // allowing cookies and HTTP titles for auth
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200,
//   }),
// );

router.post('/registration', userController.postUser);
router.post('/login', userController.authUser);
router.get('/users', authMiddleware, MiddlewareUser1_1, userController.getUsers); // only for 1-1+

router.get(
  '/users/:id',
  authMiddleware,
  MiddlewareUser2_1,
  MiddlewareUser1_2,
  userController.getUserById,
); // only for current user or 1-2+

router.put(
  '/users/:id',
  authMiddleware,
  MiddlewareUser2_2,
  MiddlewareUser1_3,
  userController.updUserById,
); // for CU or 1-3

router.get(
  '/users/:id/balance',
  authMiddleware,
  MiddlewareUser2_1,
  MiddlewareUser1_2,
  userController.getBalanceByid,
); // for current or 1-2
module.exports = router;
