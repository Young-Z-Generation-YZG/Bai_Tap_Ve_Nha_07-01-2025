import { BaseResponseType, MetaType } from "~/src/infrastructure/types/base-response.type";

export type ReviewPaginationType = {
  productId?: string;
  _page?: number;
  _limit?: number;
  _star?: number;
  _sortBy?: 'createAt' | 'star';
};


export type ReviewUserType = {
  _id: string,
  email: string,
}

export type ReviewItemType = {
  _id: string,
  review_user: ReviewUserType,
  review_product: string,
  review_invoice: string,
  review_rating: number,
  review_content: string,
};

export type ReviewPaginationResponseType<T> = {
  reviews: T;
  meta: MetaType;
};

export type ReviewResponseType = BaseResponseType<
  ReviewPaginationResponseType<ReviewItemType[]>
>;

export type CreateReviewItemType = {
  productId:string,
  content: string,
  review_rating: number,
}

export type CreateReviewResponseType = BaseResponseType<boolean>;