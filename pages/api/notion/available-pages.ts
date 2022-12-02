import { NextApiRequest, NextApiResponse } from 'next';

import {
  withMiddleware,
  getUserFromRequest,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedIn,
  assignRequestTokenToSupabaseSessionMiddleware,
  decrypt,
  createNotionClient,
} from '../utils';

import { supabaseInstance } from '@infrastructure';
import { DatabaseObjectResponse } from '@notionhq/client/build/src/api-endpoints';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getUserFromRequest(req);

  const { data: profilesData, error: profilesError } = await supabaseInstance
    .from('profiles')
    .select('notion_api_key')
    .eq('id', user?.id)
    .single();

  if (profilesError) {
    return res.status(500).send(profilesError);
  }

  try {
    const hash = JSON.parse(profilesData.notion_api_key);
    const notionApiKey = decrypt(hash);

    const notionClient = createNotionClient(notionApiKey);

    const availablePages = await notionClient.search({
      filter: { value: 'database', property: 'object' },
    });

    const parsedAvailablePages = (availablePages.results as DatabaseObjectResponse[]).map(
      (_page) => ({
        id: _page.id,
        url: _page.url,
        createdTime: _page.created_time,
        title: _page.title[0].plain_text,
        lastEditedTime: _page.last_edited_time,
      }),
    );

    return res.status(200).json(parsedAvailablePages);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const middlewareToApply = [
  validateRequestMethodMiddleware('GET'),
  validateRouteSecretMiddleware,
  validateIfUserIsLoggedIn,
  assignRequestTokenToSupabaseSessionMiddleware,
];

export default withMiddleware(handler)(middlewareToApply);
