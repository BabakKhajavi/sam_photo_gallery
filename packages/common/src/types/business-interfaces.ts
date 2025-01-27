export interface IAdvertisement {
  id?: number;
  type: string;
  htmlContent: string;
  styles: string;
}

export interface IApproach {
  id?: number;
  step: number;
  title: string;
  summary: string;
  description: string;
  media: string;
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

export interface ICategory {
  id?: number;
  title: string;
}

export interface ISubcategory {
  id?: number;
  title: string;
  description: string;
  category_id: number;
}

export interface IGallery {
  id?: number;
  title: string;
  subtitle: string;
  description: string;
  media: string;
  media_thumb: string;
  is_main: boolean;
  subcategory_id: number;
}

export interface IJumbotron {
  id?: number;
  title: string;
  subtitle: string;
  is_main_jumbotron: boolean;
  subcategory_id: number;
  media: string;
}

export interface IWelcome {
  id?: number;
  title: string;
  subtitle: string;
  description: string;
  sub_description: string;
  media: string;
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

export interface IUser {
  id?: number;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  role: string;
}

export interface IRequest {
  id?: number;
  datetime: string;
  customer_name: string;
  email: string;
  phone: string;
  phone_alt?: string;
  schedule?: string;
  note?: string;
  media1?: string;
  media2?: string;
  media3?: string;
  subcategories: string;
  city_id: number;
  seen: boolean;
  is_online: boolean;
}

export interface IHome {
  id?: number;
  title: string;
  subtitle: string;
  description: string;
  media: string;
}

export interface IAddress {
  id?: number;
  line1: string;
  line2: string;
  province: string;
  zip: string;
  request_id: number;
  city_id: number;
}
