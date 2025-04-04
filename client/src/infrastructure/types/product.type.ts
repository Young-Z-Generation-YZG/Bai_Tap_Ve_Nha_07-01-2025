import {
   BaseResponseType,
   PaginationResponseType,
} from '~/src/infrastructure/types/base-response.type';

export type ProductImages = {
   public_id:string;
   secure_url:string;
}

export type ProductItemType = {
   _id: string;
   id: string;
   product_slug: string;
   product_name: string;
   product_colors: Array<string>;
   product_sizes: Array<string>;
   product_price: number;
   product_stocks: number;
   product_imgs: Array<ProductImages>;
   product_description:string;

};

export type ProductResponseType = BaseResponseType<
   PaginationResponseType<ProductItemType[]>
>;
