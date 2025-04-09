import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ReviewResponseType } from "~/src/infrastructure/types/review.type";

export const reviewsApi = createApi({
  reducerPath:'reviews-api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://10.0.2.2:3000',
    prepareHeaders: (headers) => {
      headers.set('ngrok-skip-browser-warning', 'true');
      return headers;
    },
  }),
  tagTypes: ['Reviews'],
  endpoints: (builder) => ({
    getReviewsByProductIdAsync: builder.query<ReviewResponseType, string>({
      query: (productId: string) => `api/v1/reviews/${productId}`,
      providesTags: (result) =>
        result?.data?.reviews
           ? [
                ...result.data.reviews.map(({ _id, review_user, review_product, review_invoice, review_content, review_rating}) => ({
                   type: 'Reviews' as const, 
                   _id,
                   review_user, 
                   review_product, 
                   review_invoice, 
                   review_content, 
                   review_rating
                })),
                { type: 'Reviews', _id: 'LIST' },
             ]
           : [{ type: 'Reviews', _id: 'LIST' }],
    }),
  }),
})

export const {
  useGetReviewsByProductIdAsyncQuery,
} = reviewsApi;