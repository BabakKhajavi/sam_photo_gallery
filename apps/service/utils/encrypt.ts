const bcrypt = require('bcryptjs');

export function encrypt(password: string, length: number) {
  return bcrypt.hash(password, length);
}
export async function isMatch(password: string, originPassword: string) {
  try {
    return await bcrypt.compare(password, originPassword);
  } catch (error: any) {
    throw new Error(error.message);
  }
}
