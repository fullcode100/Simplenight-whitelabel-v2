import crypto from 'crypto';
import { NextApiRequestWithSession, Session } from 'types/core/server';

export const getRequestHost = (req: NextApiRequestWithSession) =>
  req.headers.host;

const baseUrlPattern = '([https]+)(:\\/\\/)([a-z0-9.:-]+)+(\\/)';
export const getRequestReferer = (req: NextApiRequestWithSession) => {
  return req.headers.referer?.match(baseUrlPattern)?.[0];
};

export const decryptSession = (req: NextApiRequestWithSession): Session => {
  const sessionHeader = req.headers['x-session'] as string;
  const sessionParts = sessionHeader.split(':');
  const initVector = Buffer.from(sessionParts.shift() as string, 'hex');
  const encryptedSession = Buffer.from(sessionParts.join(':'), 'hex');

  const key = crypto
    .createHash('sha256')
    .update(process.env.NEXT_ENCRYPT_KEY as string);

  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    key.digest(),
    initVector,
  );

  let decrypted = decipher.update(encryptedSession);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return JSON.parse(decrypted.toString());
};

export const encryptSession = (data: Session) => {
  const initVector = crypto.randomBytes(16);

  console.log('encrypt session data', data);

  const key = crypto
    .createHash('sha256')
    .update(process.env.NEXT_ENCRYPT_KEY as string);

  const cipher = crypto.createCipheriv('aes-256-cbc', key.digest(), initVector);

  let encrypted = cipher.update(JSON.stringify(data));
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return initVector.toString('hex') + ':' + encrypted.toString('hex');
};
