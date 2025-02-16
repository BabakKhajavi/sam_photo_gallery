import { IGallery } from '@packages/common';
import { Schema, model, Document } from 'mongoose';

const gallerySchema = new Schema<IGallery>({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
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
  media_thumb: {
    type: String,
    required: true,
  },
  is_main: {
    type: Boolean,
    required: true,
  },
});

const Gallery = model<IGallery>('Gallery', gallerySchema);

export { Gallery };
