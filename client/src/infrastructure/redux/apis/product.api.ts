import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductResponseType } from '~/src/infrastructure/types/product.type';

export const productsApi = createApi({
   reducerPath: 'product-api',
   baseQuery: fetchBaseQuery({
      baseUrl: 'https://cdd1-116-108-132-138.ngrok-free.app',
      prepareHeaders: (headers) => {
         headers.set('ngrok-skip-browser-warning', 'true');
         return headers;
      },
   }),
   tagTypes: ['Products'],
   endpoints: (builder) => ({
      getProductsAsync: builder.query<ProductResponseType, void>({
         query: () => '/api/v1/products',
         providesTags: (result) =>
            result?.data
               ? [
                    ...result.data.map(({ id }) => ({
                       type: 'Products' as const,
                       id,
                    })),
                    { type: 'Products', id: 'LIST' },
                 ]
               : [{ type: 'Products', id: 'LIST' }],
      }),
      getProductsPaginationAsync: builder.query<
         ProductResponseType,
         { page?: number; limit?: number }
      >({
         query: ({ page = 1, limit = 5 }) =>
            `/api/v1/products?_page=${page}&_limit=${limit}`, // Adjusted endpoint
         providesTags: (result) =>
            result?.data
               ? [
                    ...result.data.map(({ id }) => ({
                       type: 'Products' as const,
                       id,
                    })),
                    { type: 'Products', id: 'LIST' },
                 ]
               : [{ type: 'Products', id: 'LIST' }],
      }),
   }),
});

export const {
   useGetProductsAsyncQuery, // Use this when you want data to be fetched automatically as the component mounts or when the query parameters change.
   useLazyGetProductsAsyncQuery, // Use this when you need more control over when the query runs, such as in response to a user action (e.g., clicking a button), conditional fetching, or specific events.
   useGetProductsPaginationAsyncQuery,
} = productsApi;
