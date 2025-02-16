export interface IAdvertisement {
  id?: number;
  type: string;
  html: string;
}

export interface ICategory {
  id?: number;
  title: string;
}

export interface IPlan {
  id?: number;
  title: string;
  summary: string;
  description: string;
  media: string;
  price: number;
}

export interface IFindUs {
  id?: number;
  type: string;
}

export interface ICity {
  id?: number;
  name: string;
}

export interface IContact {
  id?: number;
  phone: string;
  email: string;
  address: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  is_main: boolean;
}

export interface IGallery {
  id?: number;
  title: string;
  subtitle: string;
  description: string;
  media: string;
  media_thumb: string;
  is_main: boolean;
}

export interface IHome {
  id?: number;
  title: string;
  subtitle: string;
  description: string;
  sub_description: string;
  media: string;
}

export interface IUser {
  id?: number;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface IRequest {
  id?: number;
  datetime: string;
  customer_name: string;
  email: string;
  phone: string;
  schedule?: string;
  note?: string;
  city_id: number;
  seen: boolean;
  is_online: boolean;
}

export interface IReview {
  id?: number;
  stars: number;
  source: string;
  description: string;
  link: string;
  owner: string;
  is_approved: boolean;
}
