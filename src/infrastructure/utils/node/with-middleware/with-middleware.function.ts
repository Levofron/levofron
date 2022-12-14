import { NextApiRequest, NextApiResponse } from 'next';

type TFunctionToCheck = (req: NextApiRequest, res: NextApiResponse) => boolean | Promise<boolean>;

export const withMiddleware =
  <THandlerResponse>(handler: (req: NextApiRequest, res: NextApiResponse) => THandlerResponse) =>
  (functionsToCheck: TFunctionToCheck[]) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    for (const functionToCheck of functionsToCheck) {
      // eslint-disable-next-line no-await-in-loop
      const result = await functionToCheck(req, res);

      if (!result) {
        return;
      }
    }

    return handler(req, res);
  };
