import { useCallback, useState } from 'react';

import { isString } from '@infrastructure/utils';

import { DEFAULT_ERROR_MESSAGE } from '@constants';

type TCallback<TParam, TResponse> = (...params: TParam[]) => Promise<TResponse>;

export const useAxiosAction = <TParam, TResponse>(callback: TCallback<TParam, TResponse>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TResponse | null>(null);

  const executeCallbackPromiseWrapper = async (...params: TParam[]) =>
    new Promise<TResponse>((resolve, reject) => {
      callback(...params)
        .then(resolve)
        .catch((_error) => {
          if (isString(_error)) {
            reject(_error);
          }

          if (_error instanceof Error) {
            reject(_error.message);
          }

          reject(DEFAULT_ERROR_MESSAGE);
        });
    });

  const mutate = (...params: TParam[]) => {
    setLoading(true);

    executeCallbackPromiseWrapper(...params)
      .then(setData)
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  };

  const mutateAsync = async (...params: TParam[]) =>
    new Promise<TResponse>((resolve, reject) => {
      setLoading(true);

      executeCallbackPromiseWrapper(...params)
        .then((_response) => {
          setData(_response);
          resolve(_response);
        })
        .catch((_error) => {
          setError(_error);
          reject(_error);
        })
        .finally(() => {
          setLoading(false);
        });
    });

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return { data, loading, error, mutate, mutateAsync, reset };
};
