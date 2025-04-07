import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CategoryResponseType } from '~/src/infrastructure/types/category.type';

export const categoryApi = createApi({
   reducerPath: 'category-api',
   baseQuery: fetchBaseQuery({
      baseUrl: 'https://f637-116-108-46-152.ngrok-free.app/',
      prepareHeaders: (headers) => {
         headers.set('ngrok-skip-browser-warning', 'true');
         return headers;
      },
   }),
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
