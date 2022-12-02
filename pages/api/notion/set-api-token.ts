import { supabaseInstance } from '@infrastructure';
import { NextApiRequest, NextApiResponse } from 'next';

import {
  encrypt,
  withMiddleware,
  createNotionClient,
  validateIfUserIsLoggedIn,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  validateIfParametersExists,
  assignRequestTokenToSupabaseSessionMiddleware,
} from '../utils';

const getUserFromRequest = async (req: NextApiRequest) => {
  const { user } = await supabaseInstance.auth.api.getUserByCookie(req);

  return user;
};

const updateProfileNotionApiKey = async (userId: string, newNotionApiKey: string) =>
  supabaseInstance
    .from('profiles')
    .update({
      notion_api_key: newNotionApiKey,
    })
    .eq('id', userId);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.body;

  const notionClient = createNotionClient(token);

  try {
    await notionClient.search({
      query: '84ff1e57-2170-486b-8d31-e163c9069538',
    });

    const hash = encrypt(token);
    const hashAsString = JSON.stringify(hash);

    const user = await getUserFromRequest(req);
    const { error: updateProfileError } = await updateProfileNotionApiKey(user?.id!, hashAsString);

    if (updateProfileError) {
      return res.status(500).send(updateProfileError);
    }

    return res.status(200).json(hash);
  } catch {
    return res.status(400).json({ message: 'Invalid API token' });
  }
};

const middlewareToApply = [
  validateRequestMethodMiddleware('POST'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedIn,
  validateIfParametersExists('body', ['token']),
  assignRequestTokenToSupabaseSessionMiddleware,
];

export default withMiddleware(handler)(middlewareToApply);
