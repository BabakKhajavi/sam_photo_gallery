import { ICategory } from '@packages/common';
import { Schema, model, Document } from 'mongoose';

const categorySchema = new Schema<ICategory>({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const Category = model<ICategory>('Category', categorySchema);

export { Category };
