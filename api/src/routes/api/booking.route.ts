import express from 'express';
import validateResource from '../../middleware/validateResource';
import passport from 'passport';
import { createBooking } from '../../controllers/booking.controller';
import { createBookingSchema } from '../../schema/booking.schema';


const router = express.Router();


// @route    /booking
// @desc     Get Booking index
// @access   Private
// router.get('/booking', passport.authenticate('jwt', {session:false}), booking);

// @route    /booking
// @desc     Get Booking index
// @access   Private
router.post('/booking', validateResource(createBookingSchema), passport.authenticate('jwt', {session:false}), createBooking);

export default router;