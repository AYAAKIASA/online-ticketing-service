import express from 'express';
import { bookShow, getBookings, cancelBooking } from '../controllers/bookingController';

const router = express.Router();

router.post('/', bookShow);
router.get('/', getBookings);
router.delete('/:id', cancelBooking);

export default router;
