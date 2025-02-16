import { IReview } from '@packages/common';
import { Schema, model, Document } from 'mongoose';

const reviewSchema = new Schema<IReview>({
  id: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  is_approved: {
    type: Boolean,
    required: true,
  },
});

const Review = model<IReview>('Review', reviewSchema);

export { Review };
