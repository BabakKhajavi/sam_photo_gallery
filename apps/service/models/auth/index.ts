import { IUser } from '@packages/common';
import { Schema, model, Document } from 'mongoose';

const userSchema = new Schema<IUser>({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
});

const User = model<IUser>('User', userSchema);

export { User };
