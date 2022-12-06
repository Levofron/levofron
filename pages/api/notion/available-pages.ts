import { DatabaseObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseInstance } from '@infrastructure';

import {
  assignRequestTokenToSupabaseSessionMiddleware,
  createNotionClient,
  decrypt,
  getUserFromRequest,
  isValidNotionPageSchema,
  validateIfUserIsLoggedIn,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  withMiddleware,
} from '../utils';

const getProfileDetails = (userId: string) =>
  supabaseInstance.from('profiles').select('notion_api_key').eq('id', userId).single();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getUserFromRequest(req);

  const { data: profileData, error: profileError } = await getProfileDetails(user?.id!);

  if (profileError) {
    return res.status(500).send(profileError);
  }

  try {
    const hash = JSON.parse(profileData.notion_api_key);
    const notionApiKey = decrypt(hash);

    const notionClient = createNotionClient(notionApiKey);

    const { results: availablePages } = await notionClient.search({
      filter: { value: 'database', property: 'object' },
    });

    const filteredAvailablePages = (availablePages as DatabaseObjectResponse[]).filter(
      (_availablePage) => isValidNotionPageSchema(_availablePage.properties),
    );

    const parsedAvailablePages = filteredAvailablePages.map((_page) => ({
      id: _page.id,
      url: _page.url,
      createdTime: _page.created_time,
      title: _page.title[0].plain_text,
      lastEditedTime: _page.last_edited_time,
    }));

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
