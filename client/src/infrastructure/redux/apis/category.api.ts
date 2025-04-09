import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PaginationType } from '~/src/infrastructure/types/base-response.type';
import { CategoryResponseType } from '~/src/infrastructure/types/category.type';
import { ProductResponseType } from '~/src/infrastructure/types/product.type';
import { createQueryEncodedUrl } from '~/src/infrastructure/utils/query-encoded-url';

export const categoryApi = createApi({
   reducerPath: 'category-api',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://10.0.2.2:3000',
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
      getProductsByCategoryAsync: builder.query<ProductResponseType, { slug: string; queries: PaginationType }>({
         query: ( {slug, queries}) => 
            createQueryEncodedUrl(`/api/v1/categories/${slug}/products`,queries),
         providesTags: (result) =>
            result?.data?.items
               ? [
                     ...result.data.items.map(({ product_slug, product_name, product_colors, product_sizes, product_price, product_stocks, product_imgs, product_description }) => ({
                       type: 'Categories' as const,
                       product_slug,
                       product_name,
                       product_colors,
                       product_sizes,
                       product_price,
                       product_stocks,
                       product_imgs,
                       product_description,
                    })),
                    { type: 'Categories', id: 'LIST' },
                 ]
               : [{ type: 'Categories', id: 'LIST' }],
      }),
   }),
});

export const { useGetCategoriesAsyncQuery, useGetProductsByCategoryAsyncQuery } = categoryApi;