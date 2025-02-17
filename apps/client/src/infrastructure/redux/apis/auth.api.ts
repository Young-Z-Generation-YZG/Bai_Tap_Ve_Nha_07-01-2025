import { baseApi } from "~/infrastructure/redux/apis/base.api";
import logger from "react-native-logger";
import { setAccessToken } from "~/infrastructure/redux/slices/auth/auth.slice";
import {
  loginPayloadType,
  loginResponseType,
} from "~/infrastructure/types/auth.type";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginAsync: builder.mutation({
      query: (payload: loginPayloadType) => ({
        url: "api/v1/auth/login",
        method: "POST",
        body: payload,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data }: { data: loginResponseType } = await queryFulfilled;

          // Dispatch the action to set the access token (to store it in the Redux store)
          dispatch(setAccessToken(data.accessToken));
        } catch (error) {
          logger.error(error);
        }
      },
    }),
  }),
});

export const { useLoginAsyncMutation } = authApi;
