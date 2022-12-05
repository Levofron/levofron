import {
  ILogoutResponse,
  IOAuthResponse,
  TProvider,
  TSession,
  TUser,
} from '@domain/supabase/supabase.types';

export interface ISupabaseSource {
  getSession: () => Promise<TSession | null>;
  getUser: () => Promise<TUser | null>;
  logout: () => Promise<ILogoutResponse>;
  signIn: (provider: TProvider) => Promise<IOAuthResponse>;
}
