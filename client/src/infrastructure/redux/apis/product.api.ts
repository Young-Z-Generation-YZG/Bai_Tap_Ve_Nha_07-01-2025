import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PaginationType } from '~/src/infrastructure/types/base-response.type';
import {
   ProductDetailsResponseType,
   ProductResponseType,
} from '~/src/infrastructure/types/product.type';
import { createQueryEncodedUrl } from '~/src/infrastructure/utils/query-encoded-url';

export const productsApi = createApi({
   reducerPath: 'product-api',
   baseQuery: fetchBaseQuery({
      baseUrl: 'https://4f65-116-108-20-111.ngrok-free.app/',
      prepareHeaders: (headers) => {
         headers.set('ngrok-skip-browser-warning', 'true');
         return headers;
      },
   }),
   tagTypes: ['Products'],
   endpoints: (builder) => ({
      getProductsAsync: builder.query<ProductResponseType, PaginationType>({
         query: (queries: PaginationType) =>
            createQueryEncodedUrl('/api/v1/products', queries),
         providesTags: (result) =>
            result?.data?.items
               ? [
                    ...result.data.items.map(({ _id }) => ({
                       type: 'Products' as const,
                       _id,
                    })),
                    { type: 'Products', id: 'LIST' },
                 ]
               : [{ type: 'Products', id: 'LIST' }],
      }),
      getProductBySlugAsync: builder.query<ProductDetailsResponseType, string>({
         query: (slug: string) => `/api/v1/products/${slug}`,
         providesTags: (result) =>
            result?.data ? [{ type: 'Products', id: result.data._id }] : [],
      }),
      getProductByIdAsync: builder.query<ProductDetailsResponseType, string>({
         query: (id: string) => `/api/v1/${id}/products`,
         providesTags: (result) =>
            result?.data ? [{ type: 'Products', id: result.data._id }] : [],
      }),
   }),
});

export const {
   useGetProductsAsyncQuery, // Use this when you want data to be fetched automatically as the component mounts or when the query parameters change.
   useLazyGetProductsAsyncQuery, // Use this when you need more control over when the query runs, such as in response to a user action (e.g., clicking a button), conditional fetching, or specific events.
   useGetProductBySlugAsyncQuery,
   useGetProductByIdAsyncQuery,
} = productsApi;
