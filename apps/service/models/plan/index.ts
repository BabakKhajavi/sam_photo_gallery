import { IPlan } from '@packages/common';
import { Schema, model, Document } from 'mongoose';

const planSchema = new Schema<IPlan>({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  media: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Plan = model<IPlan>('Plan', planSchema);

export { Plan };
