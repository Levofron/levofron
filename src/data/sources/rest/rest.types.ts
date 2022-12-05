import { AxiosResponse } from 'axios';

import { IHash, INotionWord, IUser } from '@domain/rest/rest.models';
import { TSession } from '@domain/supabase/supabase.types';

export interface IRestSource {
  getAvailableNotionPages: () => Promise<AxiosResponse<void>>;
  getLoggedUser: () => Promise<AxiosResponse<IUser>>;
  getRandomNotionWords: () => Promise<AxiosResponse<INotionWord>>;
  healthCheck: () => Promise<AxiosResponse<string>>;
  setNotionApiToken: (token: string) => Promise<AxiosResponse<IHash>>;
  setNotionPageId: (pageId: string) => Promise<AxiosResponse<void>>;
  setSupabaseCookie: (supabaseSession: TSession | null) => Promise<void>;
}
