import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PaginationType } from '~/src/infrastructure/types/base-response.type';
import {
   ProductDetailsResponseType,
   ProductResponseType,
} from '~/src/infrastructure/types/product.type';
import { createQueryEncodedUrl } from '~/src/infrastructure/utils/query-encoded-url';
import { baseQuery } from './base.api';
import { NotificationResponseType } from '~/src/infrastructure/types/notification.type';


export const notificationsApi = createApi({
   reducerPath: 'notification-api',
   baseQuery: baseQuery,
   tagTypes: ['Notifications'],
   endpoints: (builder) => ({
      getNotificationsAsync: builder.query<NotificationResponseType, PaginationType>({
        query: (queries: PaginationType) =>
          createQueryEncodedUrl('/api/v1/notifications/user', queries),
        providesTags: (result) =>
          result?.data?.items
              ? [
                  ...result.data.items.map(({ _id }) => ({
                      type: 'Notifications' as const,
                      _id,
                  })),
                  { type: 'Notifications', id: 'LIST' },
                ]
              : [{ type: 'Notifications', id: 'LIST' }],
      }),
   }),
});

export const {
   useGetNotificationsAsyncQuery,
} = notificationsApi;
