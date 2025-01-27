import jwt, { Secret } from 'jsonwebtoken';
export const generateToken = (data: any) => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY as Secret;
  const token = jwt.sign(data, jwtSecretKey, { expiresIn: '30d' });
  return token;
};
