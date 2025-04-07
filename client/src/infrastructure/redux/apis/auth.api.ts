import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ILoginPayload } from '~/src/domain/interfaces/auth/ILoginPayload';
import { setAccessToken } from '~/src/infrastructure/redux/features/auth/auth.slice';
import { TLoginResponseData } from '../../types/auth.type';
import { baseQuery } from './base.api';


export const authApi = createApi({
   reducerPath: 'auth-api',
   tagTypes: ['auth'],
   baseQuery: baseQuery,
   endpoints: (builder) => ({
      loginAsync: builder.mutation({
         query: (payload: ILoginPayload) => ({
            url: '/api/v1/auth/login',
            method: 'POST',
            body: payload,
         }),
         async onQueryStarted(arg, { dispatch, queryFulfilled }) {
            try {
               const { data }: { data: TLoginResponseData } =
                  await queryFulfilled;

               dispatch(setAccessToken({
                  accessToken: data.data.access_token,
                  refreshToken: data.data.refresh_token,
                  expiredIn: data.data.expired_in,
                  isAuthenticated: true,
                  user: null,
               }));
            } catch (error) {
               console.error(error);
            }
         },
      }),
   }),
});

export const { useLoginAsyncMutation } = authApi;
