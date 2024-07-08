import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  delete(): unknown;
  userId: string;
  showId: string;
  seats: { seatNumber: string; price: number }[];
  totalAmount: number;
}

const bookingSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  showId: { type: Schema.Types.ObjectId, ref: 'Show', required: true },
  seats: { type: [{ seatNumber: String, price: Number }], required: true },
  totalAmount: { type: Number, required: true },
});

export default mongoose.model<IBooking>('Booking', bookingSchema);
