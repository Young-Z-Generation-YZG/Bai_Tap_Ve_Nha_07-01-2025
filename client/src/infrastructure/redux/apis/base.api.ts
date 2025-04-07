import { createApi, fetchBaseQuery, FetchArgs, BaseQueryFn, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { Mutex } from '../../utils/mutex';
import { logout, setAccessToken } from '../features/auth/auth.slice';
import { TRefreshTokenResponse } from '../../types/auth.type';
import config from '~/src/infrastructure/config/env';
const mutex = new Mutex();

// Base query with refresh token logic
export const baseQuery = fetchBaseQuery({
    baseUrl: config.api.url,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as RootState).auth.accessToken;

      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }

      headers.set('ngrok-skip-browser-warning', 'true');

      return headers;
    },
  });

export const baseQueryWithRefresh: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
  ) => {

    await mutex.waitForUnlock();

    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        console.log('[REFRESH_AT]::', "processing...");

        if (!mutex.isLocked()) {

          const release = await mutex.acquire();

          try {
            const refreshToken = (api.getState() as RootState).auth.refreshToken;

            if (!refreshToken) {
              api.dispatch(logout());
            }

            const refreshResponse = await fetch(config.api.url + '/api/v1/auth/refresh-token', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ refresh_token: refreshToken }),
            });

            if (refreshResponse.ok) {
              const { access_token, expired_in } = (await refreshResponse.json()) as TRefreshTokenResponse;

              api.dispatch(setAccessToken({
                accessToken: access_token,
                refreshToken: refreshToken ?? null,
                expiredIn: expired_in,
                isAuthenticated: true,
                user: null,
              }));

              result = await baseQuery(args, api, extraOptions);

            } else {
              api.dispatch(logout());
            }
          } finally {
            release();
          }
        } else {
          await mutex.waitForUnlock();
          
          result = await baseQuery(args, api, extraOptions);
        }
      }
      return result;
  }