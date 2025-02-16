import { IContact } from '@packages/common';
import { Schema, model, Document } from 'mongoose';

const gallerySchema = new Schema<IContact>({
  id: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  facebook: {
    type: String,
    required: true,
  },
  instagram: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
    required: true,
  },
  youtube: {
    type: String,
    required: true,
  },
  is_main: {
    type: Boolean,
    required: true,
  },
});

const Contact = model<IContact>('Contact', gallerySchema);

export { Contact };
