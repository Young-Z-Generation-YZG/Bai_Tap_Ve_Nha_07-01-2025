import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AuthLayout from '@components/layouts/auth.layout';
import { useForm } from 'react-hook-form';
import { InputField } from '~/components/ui/input-field';
import Button from '~/components/ui/Button';
import { Link, router } from 'expo-router';
import { Image } from 'react-native';
import { images, icons, svgIcons } from '~/constants';
import {
   ShippingAddressFormType,
   ShippingAddressResolver,
} from '~/src/domain/schemas/profile.schema';
import CommonLayout from '@components/layouts/common.layout';

const defaultValues: ShippingAddressFormType = {
   // first_name: 'Foo',
   // last_name: 'Bar',
   // phone_number: '0912345678',
   // country: 'Việt Nam',
   // province: 'Hồ Chí Minh',
   // district: 'Thủ Đức',
   // address: '106* Kha Van Can, Linh Dong, Thu Duc',
   first_name: '',
   last_name: '',
   phone_number: '',
   country: '',
   province: '',
   district: '',
   address: '',
};

const AddressScreen = () => {
   const form = useForm<ShippingAddressFormType>({
      resolver: ShippingAddressResolver,
      defaultValues: defaultValues,
   });

   const onSubmit = (data: any) => console.log(data);
   return (
      <SafeAreaProvider>
         <SafeAreaView className="flex-1 bg-white">
            <CommonLayout title="shipping address">
               <View className="flex-1 justify-start items-center gap-6 px-7 mt-7">
                  <View className="flex-1 flex flex-col gap-10 ">
                     <View className="flex flex-row h-[40px] items-center gap-10">
                        <InputField<ShippingAddressFormType>
                           name="first_name"
                           form={form}
                           required
                           variant="outline"
                           placeholder="First name"
                           className="h-[100%] flex-1 font-TenorSans-Regular m-0 p-0"
                           errorStyles="text-sm"
                        />
                        <InputField<ShippingAddressFormType>
                           name="last_name"
                           form={form}
                           required
                           variant="outline"
                           placeholder="Last name"
                           className="h-[100%] flex-1 font-TenorSans-Regular m-0 p-0"
                           errorStyles="text-sm"
                        />
                     </View>

                     <View className="flex flex-row h-[40px] items-center justify-between">
                        <InputField<ShippingAddressFormType>
                           name="country"
                           form={form}
                           required
                           variant="outline"
                           placeholder="Country"
                           className="h-[100%] w-[100%] font-TenorSans-Regular m-0 p-0 "
                           errorStyles="text-sm"
                        />
                     </View>

                     <View className="flex flex-row h-[40px] items-center justify-between">
                        <InputField<ShippingAddressFormType>
                           name="province"
                           form={form}
                           required
                           variant="outline"
                           placeholder="Province"
                           className="h-[100%] w-[100%] font-TenorSans-Regular m-0 p-0 "
                           errorStyles="text-sm"
                        />
                     </View>

                     <View className="flex flex-row h-[40px] items-center justify-between">
                        <InputField<ShippingAddressFormType>
                           name="district"
                           form={form}
                           required
                           variant="outline"
                           placeholder="District"
                           className="h-[100%] w-[100%] font-TenorSans-Regular m-0 p-0 "
                           errorStyles="text-sm"
                        />
                     </View>

                     <View className="flex flex-row h-[40px] items-center justify-between">
                        <InputField<ShippingAddressFormType>
                           name="address"
                           form={form}
                           required
                           variant="outline"
                           placeholder="Address line"
                           className="h-[100%] w-[100%] font-TenorSans-Regular m-0 p-0 "
                           errorStyles="text-sm"
                        />
                     </View>

                     <View className="flex flex-row h-[40px] items-center justify-between">
                        <InputField<ShippingAddressFormType>
                           name="phone_number"
                           form={form}
                           required
                           variant="outline"
                           placeholder="Phone number"
                           className="h-[100%] w-[100%] font-TenorSans-Regular m-0 p-0 "
                           errorStyles="text-sm"
                        />
                     </View>
                  </View>
               </View>
            </CommonLayout>
         </SafeAreaView>
      </SafeAreaProvider>
   );
};

export default AddressScreen;
