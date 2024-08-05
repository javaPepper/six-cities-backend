import { createHmac } from 'node:crypto';

export const createSHA256 = (password: string, salt: string): string => {
  const shaHasher = createHmac('sha256', salt);
  return shaHasher.update(password).digest('hex');
};
