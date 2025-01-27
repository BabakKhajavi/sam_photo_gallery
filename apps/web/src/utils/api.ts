type NextOptions = {
  revalidate: false | 0 | number;
};
type Options = {
  method?: string;
  cache?: 'force-cache' | 'no-store';
  body?: BodyInit | null;
  next?: NextOptions;
};
// { next: { revalidate: 3600 } }
export class API {
  private baseURL: String;
  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_BASE_URL || '';
  }
  async get(endpint: String, options: Options) {
    try {
      const res = await fetch(`${this.baseURL}/${endpint}`, options);
      const data = await res.json();
      return data.data;
    } catch (error) {
      throw error;
    }
  }
}
