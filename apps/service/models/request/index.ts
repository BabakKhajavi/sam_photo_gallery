import { IRequest } from '@packages/common';
import { Schema, model, Document } from 'mongoose';

const requestSchema = new Schema<IRequest>({
  id: {
    type: String,
    required: true,
  },
  datetime: {
    type: String,
    required: true,
  },
  customer_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  city_id: {
    type: Number,
    required: true,
  },
  seen: {
    type: Boolean,
    required: true,
  },
  is_online: {
    type: Boolean,
    required: true,
  },
});

const PhotoRequest = model<IRequest>('Request', requestSchema);

export { PhotoRequest };
