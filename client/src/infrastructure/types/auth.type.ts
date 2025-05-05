import { BaseResponseType } from "./base-response.type";

type TLoginResponse = {
  user_id: string;
  email: string;
  access_token: string;
  refresh_token: string;
  verify_type: 'CREDENTIALS_VERIFICATION' | 'EMAIL_VERIFICATION';
  params: TParams;
  expired_in: number;
};

export type TLoginResponseData = BaseResponseType<TLoginResponse>;

export type TRegisterResponse = {
  params: {
    _q: string,
    _verify_type: string
  }
};

export type TRegisterResponseData = BaseResponseType<TRegisterResponse>;

export type TSendEmailResponse = {
  message: string
};

export type TParams = {
  _q: string,
  _verify_type: string
};

export type TSendEmailResponseData = BaseResponseType<TSendEmailResponse>;


export type TVerifyOtpResponseData = BaseResponseType<boolean>;

export type TRefreshTokenResponse = Omit<TLoginResponse, 'refresh_token'>;
