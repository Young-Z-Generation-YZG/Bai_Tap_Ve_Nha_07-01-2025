import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithRefresh } from './base.api';
import {
   UserAddressItemType,
   UserAddressResponseType,
   UserProfileItemType,
   UserProfileResponseType,
} from '~/src/infrastructure/types/user.type';

export const userApi = createApi({
   reducerPath: 'user-api',
   baseQuery: baseQueryWithRefresh,
   tagTypes: ['Users'],
   endpoints: (builder) => ({
      // getProfileAsync: builder.query<{ data: any }, void>({
      //    query: () => '/api/v1/users/profile',
      //    providesTags: (result) => {
      //       return [{ type: 'Users', id: 'LIST' }];
      //    },
      //    onQueryStarted: async (args, { queryFulfilled }) => {
      //       try {
      //          const result = await queryFulfilled;
      //          console.log(result);
      //       } catch (error) {
      //          console.log(error);
      //       }
      //    },
      // }),
      getProfileAsync: builder.query<UserProfileResponseType, void>({
         query: () => '/api/v1/users/profile',
         providesTags: (result) => {
            return [{ type: 'Users', id: 'LIST' }];
         },
      }),
      getAddressAsync: builder.query<UserAddressResponseType, void>({
         query: () => '/api/v1/users/addresses',
         providesTags: (result) => {
            return [{ type: 'Users', id: 'LIST' }];
         },
      }),
      putAddressAsync: builder.mutation<
         UserAddressResponseType,
         UserAddressItemType
      >({
         query: (queries: UserAddressItemType) => ({
            url: '/api/v1/users/addresses',
            method: 'PUT',
            body: {
               addressLine: queries.address_addressLine,
               province: queries.address_province,
               district: queries.address_district,
               country: queries.address_country,
            },
         }),
         transformResponse: (response: { data: UserAddressResponseType }) =>
            response.data,
      }),

      putProfileAsync: builder.mutation<
         UserProfileResponseType,
         UserProfileItemType
      >({
         query: (queries: UserProfileItemType) => ({
            url: '/api/v1/users/profile',
            method: 'PUT',
            body: {
               firstName: queries.profile_firstName,
               lastName: queries.profile_lastName,
               phoneNumber: queries.profile_phoneNumber,
            },
         }),
         transformResponse: (response: { data: UserProfileResponseType }) =>
            response.data,
      }),
   }),
});

export const {
   useGetProfileAsyncQuery,
   useGetAddressAsyncQuery,
   usePutAddressAsyncMutation,
   usePutProfileAsyncMutation,
} = userApi;
