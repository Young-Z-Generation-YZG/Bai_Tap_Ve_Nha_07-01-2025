import { BaseResponseType } from '~/src/infrastructure/types/base-response.type';

export type UserAddressItemType = {
   address_addressLine: string;
   address_district: string;
   address_province: string;
   address_country: string;
};

export type UserProfileItemType = {
   profile_firstName: string;
   profile_lastName: string;
   profile_phoneNumber: string;
};

export type UserAddressResponseType = BaseResponseType<UserAddressItemType>;
export type UserProfileResponseType = BaseResponseType<UserProfileItemType>;
