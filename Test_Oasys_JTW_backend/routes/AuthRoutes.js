const router = require('express').Router();
const cors = require('cors');
const { userController } = require('../controllers/userControllers');

// managing Cross-Oringin Policy
router.use(
  cors({
    credentials: true, // allowing cookies and HTTP titles for auth
    origin: '*', //! EVERYONE CAN SEND REQS YET
  }),
);

router.post('/registration', userController.postUser);
router.post('/login', userController.authUser);
module.exports = router;
