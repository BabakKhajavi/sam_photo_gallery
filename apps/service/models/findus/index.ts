import { IFindUs } from '@packages/common';
import { Schema, model, Document } from 'mongoose';

const categorySchema = new Schema<IFindUs>({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const FindUs = model<IFindUs>('FindUs', categorySchema);

export { FindUs };
