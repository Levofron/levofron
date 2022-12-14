import cookie from 'cookie';
import { NextApiRequest } from 'next';

import { supabaseInstance } from '@infrastructure/config';

import { getUserFromRequest } from '..';

export const assignRequestTokenToSupabaseSessionMiddleware = async (req: NextApiRequest) => {
  const user = await getUserFromRequest(req);

  const token = cookie.parse(req.headers.cookie || '')['sb:token'];

  supabaseInstance.auth.session = () => ({
    user,
    token_type: '',
    access_token: token,
  });

  return true;
};
