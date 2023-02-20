import express from 'express';
import validateResource from '../../middleware/validateResource';
import passport from 'passport';
import { createPlaceSchema } from '../../schema/place.schema';
import {
    addPlace, destroyPlace, getPlace, getPlaces, getUserPlaces, updatePlace
} from '../../controllers/place.controller';

const router = express.Router();

// @route    /place
// @desc     Get Place index
// @access   Public
router.get('/place',  getPlaces);

// @route    /place/:id
// @desc     Get Place id
// @access   Public
router.get('/place/:id',  getPlace);

// @route    /place
// @desc     Create Place
// @access   Private
router.post('/place', passport.authenticate('jwt', {session:false}), validateResource(createPlaceSchema), addPlace);

// @route    /user-places
// @desc     Get Place index
// @access   Private
router.get('/user-place', passport.authenticate('jwt', {session:false}), getUserPlaces);

// @route    /user-places
// @desc     Get Place index
// @access   Private
router.put('/place/:id', passport.authenticate('jwt', {session:false}), updatePlace)

// @route    /place/:id
// @desc     Delete place by id
// @access   Private
router.delete('/place/:id', passport.authenticate('jwt', {session:false}), destroyPlace)


export default router;

