import { Document } from 'mongoose';

export interface IContactModel extends Document {
  customer: string
  phone: number
  car_type: string
}
