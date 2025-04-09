import {
   BaseResponseType,
   PaginationResponseType,
} from '~/src/infrastructure/types/base-response.type';

export type ProductItem = {
  product_id:string,
  product_name:string, 
  product_size:string,
  product_color:string,
  product_image:string,
  product_price:number,
  quantity:number,
}

export type InvoiceItemType = {
  _id: string,
  invoice_user: string,
  contact_name: string,
  contact_phone_number: string,
  invoice_products: Array<ProductItem>,
  invoice_note: string,
  shipping_address_line: string,
  shipping_address_district: string,
  shipping_address_province: string,
  shipping_address_country: string,
  payment_method: string,
  invoice_status: string,
  invoice_total: number,
};

export type InvoiceResponseType = BaseResponseType<
   PaginationResponseType<InvoiceItemType[]>
>;
