import {Router} from 'express'
import { signInUser, signOutUser, signupUser } from '../controller/auth.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/sign-up').post(signupUser);
router.route('/sign-in').post(signInUser);
router.route('/sign-out').post(isAuthenticated, signOutUser);




export default router;