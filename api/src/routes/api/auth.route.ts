import express from 'express';
import { signUp, login, logout, profile } from '../../controllers/auth.controller';
import validateResource from '../../middleware/validateResource';
import passport from 'passport';
import {
    createUserSchema,
    loginUserSchema
} from '../../schema/user.schema'
const router = express.Router();


// @route    /login
// @desc     Login user
// @access   Public
router.post('/login', validateResource(loginUserSchema), login);

// @route    /signin
// @desc     signin user
// @access   Public
router.post('/signup', validateResource(createUserSchema), signUp);

// @route    /logout
// @desc     logout user
// @access   Private
router.post('/logout', passport.authenticate('jwt', {session:false}), logout);

// @route    /profile
// @desc     profile user
// @access   Private
router.get('/profile', passport.authenticate('jwt', {session:false}), profile);


export default router;