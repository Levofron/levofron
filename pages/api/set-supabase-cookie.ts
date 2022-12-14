import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseInstance } from '@infrastructure/config';
import {
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  withMiddleware,
} from '@infrastructure/utils/node';

const handler = (req: NextApiRequest, res: NextApiResponse) =>
  supabaseInstance.auth.api.setAuthCookie(req, res);

const middlewareToApply = [validateRequestMethodMiddleware('POST'), validateRouteSecretMiddleware];

export default withMiddleware(handler)(middlewareToApply);
