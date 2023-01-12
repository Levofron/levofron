import axios, { AxiosError, AxiosRequestConfig, isAxiosError } from 'axios';

import { hasOwnProperty } from '@infrastructure/utils';

import { API_ROUTE_SECRET, DEFAULT_ERROR_MESSAGE } from '@constants';

export const axiosConfiguration: AxiosRequestConfig = {
  baseURL: '/api',
  timeout: 15_000,
  timeoutErrorMessage: 'Request timeout',
  headers: {
    authorization: API_ROUTE_SECRET,
    'Content-Type': 'application/json;charset=utf-8',
  },
};

export const axiosInstance = axios.create(axiosConfiguration);

const getErrorMessageFromAxiosRequest = (error: AxiosError) => error.message;

const getErrorMessageFromAxiosResponse = (error: AxiosError) => {
  const { data } = error.response!;

  if (data && hasOwnProperty(data, 'message')) {
    return data.message as string;
  }

  if (data && hasOwnProperty(data, 'body')) {
    const parsedBody = JSON.parse(data.body as string);

    return parsedBody.message;
  }
};

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error) {
      return Promise.reject(DEFAULT_ERROR_MESSAGE);
    }

    if (isAxiosError(error)) {
      const errorMessage = error?.response
        ? getErrorMessageFromAxiosResponse(error)
        : getErrorMessageFromAxiosRequest(error);

      return Promise.reject(errorMessage || DEFAULT_ERROR_MESSAGE);
    }

    return Promise.reject(DEFAULT_ERROR_MESSAGE);
  },
);
