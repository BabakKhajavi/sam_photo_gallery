import { IAdvertisement } from '@packages/common';
import { Schema, model, Document } from 'mongoose';

const advertisementSchema = new Schema<IAdvertisement>({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  html: {
    type: String,
    required: true,
  },
});

const Advertisement = model<IAdvertisement>(
  'Advertisement',
  advertisementSchema,
);

export { Advertisement };
