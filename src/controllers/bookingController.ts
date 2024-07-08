import { Request, Response } from 'express';
import Booking, { IBooking } from '../models/Booking';
import User, { IUser } from '../models/User';
import Show, { IShow } from '../models/Show';

export async function bookShow(req: Request, res: Response) {
  const { userId, showId, seats } = req.body;

  try {
    const user: IUser | null = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }

    const show: IShow | null = await Show.findById(showId);
    if (!show) {
      return res.status(404).json({ error: '공연을 찾을 수 없습니다.' });
    }

    let totalAmount = 0;
    const seatDetails = show.seats.filter(seat => seats.includes(seat.seatNumber));

    if (seatDetails.length !== seats.length) {
      return res.status(400).json({ error: '잘못된 좌석 정보입니다.' });
    }

    seatDetails.forEach(seat => {
      if (seat.isReserved) {
        return res.status(400).json({ error: '이미 예약된 좌석입니다.' });
      }
      totalAmount += seat.price;
    });

    if (user.points < totalAmount) {
      return res.status(400).json({ error: '포인트가 부족합니다.' });
    }

    seatDetails.forEach(seat => {
      seat.isReserved = true;
    });

    user.points -= totalAmount;
    await user.save();
    await show.save();

    const newBooking: IBooking = new Booking({ userId, showId, seats: seatDetails, totalAmount });
    const savedBooking = await newBooking.save();

    res.status(201).json(savedBooking);
  } catch (err) {
    console.error('Error booking show:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getBookings(req: Request, res: Response) {
  try {
    const bookings: IBooking[] = await Booking.find();

    res.status(200).json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function cancelBooking(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const booking: IBooking | null = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ error: '예매를 찾을 수 없습니다.' });
    }

    const user: IUser | null = await User.findById(booking.userId);
    const show: IShow | null = await Show.findById(booking.showId);

    if (!user || !show) {
      return res.status(404).json({ error: '사용자 또는 공연을 찾을 수 없습니다.' });
    }

    booking.seats.forEach(seat => {
      const showSeat = show.seats.find(s => s.seatNumber === seat.seatNumber);
      if (showSeat) {
        showSeat.isReserved = false;
      }
    });

    user.points += booking.totalAmount;

    await user.save();
    await show.save();
    await booking.delete();

    res.status(200).json({ message: '예매가 취소되었습니다.' });
  } catch (err) {
    console.error('Error canceling booking:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
