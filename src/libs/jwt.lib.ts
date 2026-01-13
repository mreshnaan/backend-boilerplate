import config from '@/config';
import jwt, { SignOptions } from 'jsonwebtoken';


export interface TokenPayload {
  userId: string;
  systemRole: 'SUPER_ADMIN' | 'USER';
}

export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, config.auth.jwt.secret, {
    expiresIn: config.auth.jwt.expiresIn as SignOptions['expiresIn'],
  });
};

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, config.auth.jwt.secret) as TokenPayload;
};
