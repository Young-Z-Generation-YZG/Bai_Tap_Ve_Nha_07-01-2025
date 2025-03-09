import {
   BaseResponseType,
   PaginationResponseType,
} from '~/src/infrastructure/types/base-response.type';
import { CategoryItemType } from '~/src/infrastructure/types/category.type';
import { ImageType } from '~/src/infrastructure/types/common/img.type';
import { SkuType } from '~/src/infrastructure/types/common/sku.type';

export type ProductItemType = {
   _id: string;
   product_name: string;
   product_code: string;
   product_price: number;
   product_stocks: number;
   product_sizes: string[];
   product_colors: string[];
   product_gender: string;
   product_brand: string;
   product_type: string;
   product_description: string;
   product_category: CategoryItemType;
   product_imgs: ImageType[];
   product_promotion: null;
   product_status: string[];
   product_slug: string;
   __v: 0;
   updatedAt: string;
};

export type ProductResponseType = BaseResponseType<
   PaginationResponseType<ProductItemType[]>
>;

export type ProductDetailsResponseType = BaseResponseType<ProductItemType>;
