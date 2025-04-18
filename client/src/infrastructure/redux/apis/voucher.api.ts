import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './base.api';
import { VoucherResponseType } from '~/src/infrastructure/types/voucher.type';

export const voucherApi = createApi({
   reducerPath: 'voucher-api',
   baseQuery: baseQuery,
   tagTypes: ['Vouchers'],
   endpoints: (builder) => ({
      getVouchersByUserIdAsync: builder.query<VoucherResponseType, void>({
         query: () => '/api/v1/vouchers/',
         providesTags: (result) =>
            result?.data
               ? [
                    ...result.data.map(({ id }) => ({
                       type: 'Vouchers' as const,
                       id,
                    })),
                    { type: 'Vouchers', id: 'LIST' },
                 ]
               : [{ type: 'Vouchers', id: 'LIST' }],
      }),
   }),
});

export const { useGetVouchersByUserIdAsyncQuery } = voucherApi;
