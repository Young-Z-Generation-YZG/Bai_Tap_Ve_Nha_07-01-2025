import { BaseResponseType } from '~/src/infrastructure/types/base-response.type';

export type VoucherItemType = {
   id: string;
   code: string;
   name: string;
   description: string;
   value: number;
   type: string;
   maxDiscount: number;
   startDate: string;
   endDate: string;
   isValid: boolean;
   source: string;
};

export type VoucherResponseType = BaseResponseType<VoucherItemType[]>;
