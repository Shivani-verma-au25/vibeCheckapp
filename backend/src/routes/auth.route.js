import {Router} from 'express'
import { signInUser, signOutUser, signupUser , getMe } from '../controller/auth.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router.route('/sign-up').post(upload.single('image'),signupUser);
router.route('/sign-in').post(signInUser);

// protected route for sign out user
router.route('/sign-out').post(isAuthenticated, signOutUser);

// protected route for get user profile
router.route('/me').get(isAuthenticated , getMe)




export default router;