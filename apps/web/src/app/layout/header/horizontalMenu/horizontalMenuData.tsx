import axios from 'axios';
const rootURL: string | null | undefined = process.env.NEXT_PUBLIC_BASE_URL;
export const getCategories = async () => {
  try {
    const res = await axios.get(rootURL + '/category/find');
    return res.data.data;
  } catch (error: any) {
    console.log('error=>', error.message);
    // throw new Error(errsor);
  }
};
