import bcrypt from 'bcryptjs';
import config from '@/config';


export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, config.auth.password.saltRounds);
};

export const comparePassword = async (candidate: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(candidate, hash);
};
