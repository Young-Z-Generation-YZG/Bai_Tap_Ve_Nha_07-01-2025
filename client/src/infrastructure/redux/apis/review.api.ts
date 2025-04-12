import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateReviewItemType, CreateReviewResponseType, ReviewPaginationType, ReviewResponseType } from "~/src/infrastructure/types/review.type";
import { baseQuery } from './base.api';
import { createQueryEncodedUrl } from "~/src/infrastructure/utils/query-encoded-url";
import { BaseResponseType } from "~/src/infrastructure/types/base-response.type";

export const reviewsApi = createApi({
  reducerPath:'reviews-api',
  baseQuery: baseQuery,
  tagTypes: ['Reviews'],
  endpoints: (builder) => ({
    getReviewsByProductIdAsync: builder.query<ReviewResponseType, ReviewPaginationType>({
      query: (queries: ReviewPaginationType) => 
        createQueryEncodedUrl(`api/v1/reviews/${queries.productId}`, {
          _page: queries._page,
          _limit: queries._limit,
          _star: queries._star,
          _sortBy: queries._sortBy,
      }),
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
    postReviewAsync: builder.mutation<CreateReviewResponseType, CreateReviewItemType>({
      query: (queries: CreateReviewItemType) => ({
        url:`api/v1/reviews/${queries.productId}`,
        method:'POST',
        body: {
          content: queries.content,
          review_rating: queries.review_rating
        },
      }),
      transformResponse: (response: { data: CreateReviewResponseType }) => response.data,
      // providesTags: (result) =>
      //   result?.data
      //     ? [{ type: 'Reviews', id: 'LIST' }]
      //     : undefined,
    }),
  }),
})

export const {
  useGetReviewsByProductIdAsyncQuery,
  usePostReviewAsyncMutation,
} = reviewsApi;