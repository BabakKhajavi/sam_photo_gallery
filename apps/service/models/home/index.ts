import { IHome } from '@packages/common';
import { Schema, model, Document } from 'mongoose';

const homeSchema = new Schema<IHome>({
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
  sub_description: {
    type: String,
    required: true,
  },
  media: {
    type: String,
    required: true,
  },
});

const Home = model<IHome>('Home', homeSchema);

export { Home };
