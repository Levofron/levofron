import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseInstance } from '@infrastructure';

import {
  assignRequestTokenToSupabaseSessionMiddleware,
  getUserFromRequest,
  validateIfUserIsLoggedIn,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  withMiddleware,
} from '../utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getUserFromRequest(req);

  const { data: profilesData, error: profilesError } = await supabaseInstance
    .from('profiles')
    .select('id,email,created_at,updated_at')
    .eq('id', user?.id)
    .single();

  if (profilesError) {
    return res.status(500).send(profilesError);
  }

  const userData = {
    id: profilesData.id,
    email: profilesData.email,
    createdAt: profilesData.created_at,
    updatedAt: profilesData.updated_at,
    fullName: user?.user_metadata.full_name,
    avatarUrl: user?.user_metadata.avatar_url,
  };

  res.status(200).json(userData);
};

const middlewareToApply = [
  validateRequestMethodMiddleware('GET'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedIn,
  assignRequestTokenToSupabaseSessionMiddleware,
];

export default withMiddleware(handler)(middlewareToApply);
