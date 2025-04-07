import { BaseResponseType } from "./base-response.type";

type TLoginResponse = {
  access_token: string;
  refresh_token: string;
  expired_in: number;
};

export type TLoginResponseData = BaseResponseType<TLoginResponse>;

export type TRefreshTokenResponse = Omit<TLoginResponse, 'refresh_token'>;
