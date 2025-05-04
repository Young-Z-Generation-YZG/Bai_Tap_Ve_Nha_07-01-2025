import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ILoginPayload } from '~/src/domain/interfaces/auth/ILoginPayload';
import { setAccessToken } from '~/src/infrastructure/redux/features/auth/auth.slice';
import { TLoginResponseData, TRegisterResponse, TRegisterResponseData, TParams, TSendEmailResponseData, TVerifyOtpResponseData } from '../../types/auth.type';
import { baseQuery } from './base.api';
import { IRegisterPayload } from '~/src/domain/interfaces/auth/IRegisterPayload';
import { createQueryEncodedUrl } from '~/src/infrastructure/utils/query-encoded-url';
import { IVerifyPayload } from '~/src/domain/interfaces/auth/IVerifyPayload';


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

               if (data.data.verify_type === 'CREDENTIALS_VERIFICATION') {
                  dispatch(setAccessToken({
                     userId: data.data.user_id,
                     email: data.data.email,
                     accessToken: data.data.access_token,
                     refreshToken: data.data.refresh_token,
                     expiredIn: data.data.expired_in,
                     isAuthenticated: true,
                  }));
               }
            } catch (error) {
               console.error(error);
            }
         },
      }),
      registerAsync: builder.mutation({
         query: (payload: IRegisterPayload) => ({
            url: '/api/v1/auth/register',
            method: 'POST',
            body: {
               firstName: payload.first_name,
               lastName: payload.last_name,
               email: payload.email,
               password: payload.password,
            },
         }),
         transformResponse: (response: TRegisterResponseData ) =>
            response.data,
      }),
      sendmailOtpAsync: builder.query<TSendEmailResponseData, TParams>({
         query: (queries: TParams) =>
            createQueryEncodedUrl('api/v1/auth/send-mail-otp', queries),
         providesTags: (result) =>
            result?.data?.message
               ?  [
                     { type: 'auth', _id: result.data.message },
                     { type: 'auth', _id: 'LIST' },
                  ]
               : [{ type: 'auth', _id: 'LIST' }],
      }),
      verifiyEmailAsync: builder.mutation({
         query: (payload: IVerifyPayload) => ({
            url: '/api/v1/auth/verify-email',
            method: 'POST',
            body: payload,
         }),
         transformResponse: (response: TVerifyOtpResponseData ) => response
      }),
   }),
});

export const { 
   useLoginAsyncMutation, 
   useRegisterAsyncMutation, 
   useSendmailOtpAsyncQuery,
   useVerifiyEmailAsyncMutation
} = authApi;
