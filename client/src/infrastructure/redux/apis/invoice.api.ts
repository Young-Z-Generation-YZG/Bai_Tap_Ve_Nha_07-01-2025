import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '~/src/infrastructure/redux/apis/base.api';
import { PaginationType } from '~/src/infrastructure/types/base-response.type';
import {
   InvoicePaginationType,
   InvoiceResponseType,
   PlaceOrderItemType,
   PlaceOrderResponseType,
   PlaceOrderType,
} from '~/src/infrastructure/types/invoice.type';
import { createQueryEncodedUrl } from '~/src/infrastructure/utils/query-encoded-url';

export const invoicesApi = createApi({
   reducerPath: 'invoice-api',
   baseQuery: baseQuery,
   tagTypes: ['Invoices'],
   endpoints: (builder) => ({
      getInvoicesAsync: builder.query<
         InvoiceResponseType,
         InvoicePaginationType
      >({
         query: (queries: InvoicePaginationType) =>
            createQueryEncodedUrl('api/v1/invoices', queries),
         providesTags: (result) =>
            result?.data?.items
               ? [
                    ...result.data.items.map(
                       ({
                          _id,
                          invoice_user,
                          contact_name,
                          contact_phone_number,
                          invoice_products,
                          invoice_note,
                          shipping_address_line,
                          shipping_address_district,
                          shipping_address_province,
                          shipping_address_country,
                          payment_method,
                          invoice_status,
                          invoice_total,
                       }) => ({
                          type: 'Invoices' as const,
                          _id,
                          invoice_user,
                          contact_name,
                          contact_phone_number,
                          invoice_products,
                          invoice_note,
                          shipping_address_line,
                          shipping_address_district,
                          shipping_address_province,
                          shipping_address_country,
                          payment_method,
                          invoice_status,
                          invoice_total,
                       }),
                    ),
                    { type: 'Invoices', _id: 'LIST' },
                 ]
               : [{ type: 'Invoices', _id: 'LIST' }],
      }),
      postInvoicdeAsync: builder.mutation<
         PlaceOrderResponseType,
         PlaceOrderType
      >({
         query: (queries: PlaceOrderType) => ({
            url: 'api/v1/invoices',
            method: 'POST',
            body: {
               contact_name: queries.contact_name,
               contact_phone_number: queries.contact_phone_number,
               address_line: queries.address_line,
               address_district: queries.address_district,
               address_province: queries.address_province,
               address_country: queries.address_country,
               payment_method: queries.payment_method,
               bought_items: queries.bought_items,
               voucher_code: queries.voucher_code,
            },
         }),
         transformResponse: (response: { data: PlaceOrderResponseType }) =>
            response.data,
      }),
   }),
});

export const { useGetInvoicesAsyncQuery, usePostInvoicdeAsyncMutation } =
   invoicesApi;
