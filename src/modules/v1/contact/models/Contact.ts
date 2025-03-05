import { model, Schema } from 'mongoose';
import { IContactModel } from '../../../../domain/interfaces';

const ContactSchema = new Schema<IContactModel>({
  customer: {
    type: String,
    required: false,
  },
  phone: {
    type: Number,
    required: [true, 'phone is required'],
  },
  car_type: {
    type: String
  },
}, { timestamps: true });

// Compile the comment model
export const Contact = model<IContactModel>('Contact', ContactSchema);
