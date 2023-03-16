import express from 'express';
import validateResource from '../../middleware/validateResource';
import passport from 'passport';
import { createPerksSchema } from '../../schema/place.schema';
import { getAllPerks, addPerks, destroyPerks } from '../../controllers/perks.controller';


const router = express.Router();

// @route    /perks
// @desc     Create Perks
// @access   Private
router.post('/perks',  passport.authenticate('jwt', {session:false}), validateResource(createPerksSchema), addPerks);


// @route    /perks
// @desc     Get Perks index
// @access   Private
router.get('/perks',  passport.authenticate('jwt', {session:false}),  getAllPerks);

// @route    /perks
// @desc     Deelete Perks 
// @access   Private
router.delete('/perks/:id',  passport.authenticate('jwt', {session:false}), destroyPerks);



export default router;
