import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PaginationType } from '~/src/infrastructure/types/base-response.type';
import { ProductResponseType } from '~/src/infrastructure/types/product.type';
import { createQueryEncodedUrl } from '~/src/infrastructure/utils/query-encoded-url';

export const productsApi = createApi({
   reducerPath: 'product-api',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://10.0.2.2:3000',
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
                    ...result.data.items.map(({ id, product_slug, product_name, product_colors, product_sizes, product_price, product_stocks, product_imgs, product_description }) => ({
                       type: 'Products' as const,
                       id,
                       product_slug,
                       product_name,
                       product_colors,
                       product_sizes,
                       product_price,
                       product_stocks,
                       product_imgs,
                       product_description,
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
} = productsApi;
