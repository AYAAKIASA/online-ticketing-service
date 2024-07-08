import mongoose, { Schema, Document } from 'mongoose';

export interface IShow extends Document {
  showName: string;
  showDescription: string;
  showCategory: string;
  showLocation: string;
  showPrice: number;
  showImage: string;
  showDateTime: Date[];
  seats: { seatNumber: string; price: number; isReserved: boolean }[];
}

const showSchema: Schema = new Schema({
  showName: { type: String, required: true },
  showDescription: { type: String, required: true },
  showCategory: { type: String, required: true },
  showLocation: { type: String, required: true },
  showPrice: { type: Number, required: true },
  showImage: { type: String, required: true },
  showDateTime: { type: [Date], required: true },
  seats: { type: [{ seatNumber: String, price: Number, isReserved: Boolean }], required: true },
});

export default mongoose.model<IShow>('Show', showSchema);
