import { ICity } from '@packages/common';
import { Schema, model, Document } from 'mongoose';

const citySchema = new Schema<ICity>({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const City = model<ICity>('City', citySchema);

export { City };
