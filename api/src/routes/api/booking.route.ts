import express from 'express';
import validateResource from '../../middleware/validateResource';
import passport from 'passport';
import { addBooking, getBookings } from '../../controllers/booking.controller';
import { createBookingSchema } from '../../schema/booking.schema';

const router = express.Router();

// @route    /booking
// @desc     Get Booking index
// @access   Private
router.get('/booking', passport.authenticate('jwt', {session:false}), getBookings);

// @route    /booking
// @desc     Get Booking index
// @access   Private
router.post('/booking', passport.authenticate('jwt', {session:false}), validateResource(createBookingSchema), addBooking);

export default router;