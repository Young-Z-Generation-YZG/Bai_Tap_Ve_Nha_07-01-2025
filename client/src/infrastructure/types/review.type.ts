import { BaseResponseType } from "~/src/infrastructure/types/base-response.type";

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

export type ReviewMetaDataType = {
  total: number,
  averageRating: number,
};

export type ResponseType<T> = {
  reviews: T;
  metadata: ReviewMetaDataType;
};

export type ReviewResponseType = BaseResponseType<
  ResponseType<ReviewItemType[]>
>;