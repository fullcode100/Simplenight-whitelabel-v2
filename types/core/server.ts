import { NextApiRequest } from 'next/types';

export interface Session {
  token_type: string;
  token: string;
  api_url: string;
}

export interface NextApiRequestWithSession extends NextApiRequest {
  session: Session;
}
