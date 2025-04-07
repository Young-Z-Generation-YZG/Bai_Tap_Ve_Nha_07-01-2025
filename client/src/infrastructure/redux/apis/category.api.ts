import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CategoryResponseType } from '~/src/infrastructure/types/category.type';
import { baseQuery } from './base.api';

export const categoryApi = createApi({
   reducerPath: 'category-api',
   baseQuery: baseQuery,
   tagTypes: ['Categories'],
   endpoints: (builder) => ({
      getCategoriesAsync: builder.query<CategoryResponseType, void>({
         query: () => '/api/v1/categories',
         providesTags: (result) =>
            result?.data
               ? [
                    ...result.data.map(({ _id }) => ({
                       type: 'Categories' as const,
                       _id,
                    })),
                    { type: 'Categories', id: 'LIST' },
                 ]
               : [{ type: 'Categories', id: 'LIST' }],
      }),
   }),
});

export const { useGetCategoriesAsyncQuery } = categoryApi;
