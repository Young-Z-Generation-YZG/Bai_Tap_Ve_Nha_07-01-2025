import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PaginationType } from '~/src/infrastructure/types/base-response.type';
import {
   ProductDetailsResponseType,
   ProductResponseType,
} from '~/src/infrastructure/types/product.type';
import { createQueryEncodedUrl } from '~/src/infrastructure/utils/query-encoded-url';
import { baseQuery } from './base.api';


export const productsApi = createApi({
   reducerPath: 'product-api',
   baseQuery: baseQuery,
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
   useGetProductsAsyncQuery,
   useLazyGetProductsAsyncQuery,
   useGetProductBySlugAsyncQuery,
   useGetProductByIdAsyncQuery,
} = productsApi;
