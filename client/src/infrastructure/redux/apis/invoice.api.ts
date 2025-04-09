import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PaginationType } from "~/src/infrastructure/types/base-response.type";
import { InvoiceResponseType } from "~/src/infrastructure/types/invoice.type";
import { createQueryEncodedUrl } from "~/src/infrastructure/utils/query-encoded-url";

export const invoicesApi = createApi({
  reducerPath:'invoice-api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://10.0.2.2:3000',
    prepareHeaders: (headers) => {
      headers.set('ngrok-skip-browser-warning', 'true');
      return headers;
    },
  }),
  tagTypes: ['Invoices'],
  endpoints: (builder) => ({
    getInvoicesAsync: builder.query<InvoiceResponseType, PaginationType>({
      query: (queries: PaginationType) => 
        createQueryEncodedUrl('api/v1/invoices',queries),
      providesTags: (result) =>
        result?.data?.items
           ? [
                ...result.data.items.map(({ _id, invoice_user, contact_name, contact_phone_number, invoice_products, invoice_note, shipping_address_line, shipping_address_district, shipping_address_province, shipping_address_country, payment_method, invoice_status, invoice_total, }) => ({
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
                })),
                { type: 'Invoices', _id: 'LIST' },
             ]
           : [{ type: 'Invoices', _id: 'LIST' }],
    }),
  }),
})

export const {
  useGetInvoicesAsyncQuery,
} = invoicesApi;