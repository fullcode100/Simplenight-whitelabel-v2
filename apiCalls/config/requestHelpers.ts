import { NextApiRequest } from 'next';

export const getRequestHost = (req: NextApiRequest) => req.headers.host;
