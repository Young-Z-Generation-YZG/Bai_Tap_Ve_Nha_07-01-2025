import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithRefresh } from './base.api';

export const userApi = createApi({
    reducerPath: 'user-api',
    baseQuery: baseQueryWithRefresh,
    tagTypes: ['Users'],
    endpoints: (builder) => ({
       getProfileAsync: builder.query<{ data: any }, void>({
        query: () => '/api/v1/users/profile',
        providesTags: (result) => {
            return [{ type: 'Users', id: 'LIST' }];
        },
        onQueryStarted: async (args, { queryFulfilled }) => {
            try {
                const result = await queryFulfilled;
                console.log(result);
            } catch (error) {
                console.log(error);
            }
        },
    }),
    }),
 });

export const { useGetProfileAsyncQuery } = userApi;