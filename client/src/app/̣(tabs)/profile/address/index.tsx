import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
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
import {
   useGetAddressAsyncQuery,
   useGetProfileAsyncQuery,
   usePutAddressAsyncMutation,
   usePutProfileAsyncMutation,
} from '~/src/infrastructure/redux/apis/user.api';
import AlertModal from '@components/ui/AlertModal';

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
   const [isEditing, setIsEditing] = useState(false);
   const [isVisibleAlertModal, setIsVisibleAlertModal] = useState(false);
   const form = useForm<ShippingAddressFormType>({
      resolver: ShippingAddressResolver,
      defaultValues: defaultValues,
   });

   // PUT ADDRESS DATA
   const [putNewAddress] = usePutAddressAsyncMutation();
   const [putNewProfile] = usePutProfileAsyncMutation();
   const onSubmit = async (data: ShippingAddressFormType) => {
      const resAddress = await putNewAddress({
         address_addressLine: data.address,
         address_country: data.country,
         address_district: data.district,
         address_province: data.province,
      });

      const resProfile = await putNewProfile({
         profile_firstName: data.first_name,
         profile_lastName: data.last_name,
         profile_phoneNumber: data.phone_number,
      });
      if (resAddress.data && resProfile.data) {
         // console.log('data', data);
         setIsVisibleAlertModal(true);
         setIsEditing(false);
      }
   };

   // GET ADDRESS DATA
   const { data: responseAddress } = useGetAddressAsyncQuery();
   const { data: responseProfile } = useGetProfileAsyncQuery();
   useEffect(() => {
      if (responseAddress?.data && responseProfile?.data) {
         const addressData = responseAddress.data;
         const profileData = responseProfile.data;
         form.reset({
            first_name: profileData.profile_firstName || '',
            last_name: profileData.profile_lastName || '',
            phone_number: profileData.profile_phoneNumber || '',
            country: addressData.address_country || '',
            province: addressData.address_province || '',
            district: addressData.address_district || '',
            address: addressData.address_addressLine || '',
         });
      }
   }, [responseAddress, responseProfile]);

   return (
      <SafeAreaProvider>
         <SafeAreaView className="flex-1 bg-white">
            <CommonLayout title="shipping address">
               <View className="justify-start items-center gap-10 px-7 mt-7">
                  <View className="flex flex-row h-[40px] items-center gap-10">
                     <InputField<ShippingAddressFormType>
                        name="first_name"
                        editable={isEditing}
                        form={form}
                        required
                        variant="outline"
                        placeholder="First name"
                        className="h-[100%] flex-1 font-TenorSans-Regular m-0 p-0"
                        errorStyles="text-sm"
                     />
                     <InputField<ShippingAddressFormType>
                        name="last_name"
                        editable={isEditing}
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
                        editable={isEditing}
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
                        editable={isEditing}
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
                        editable={isEditing}
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
                        editable={isEditing}
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
                        editable={isEditing}
                        required
                        variant="outline"
                        placeholder="Phone number"
                        className="h-[100%] w-[100%] font-TenorSans-Regular m-0 p-0 "
                        errorStyles="text-sm"
                     />
                  </View>
               </View>

               {/* BUTTONS */}
               <View className="items-end mt-10 px-4">
                  {!isEditing ? (
                     <TouchableOpacity
                        className="w-[50%] bg-black rounded-lg py-3 px-5"
                        onPress={() => setIsEditing(true)}
                     >
                        <Text className="text-white text-center font-TenorSans-Regular text-lg">
                           EDIT ADDRESS
                        </Text>
                     </TouchableOpacity>
                  ) : (
                     <View className="flex-row gap-5">
                        <TouchableOpacity
                           className="bg-gray-300 w-[22%] py-3 rounded-lg"
                           onPress={() => {
                              setIsEditing(false);
                              // form.reset(defaultValues);
                           }}
                        >
                           <Text className="text-gray-800 text-center font-TenorSans-Regular text-lg">
                              CANCEL
                           </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                           className="bg-black w-[22%] py-3 rounded-lg"
                           onPress={form.handleSubmit(onSubmit)}
                        >
                           <Text className="text-white text-center font-TenorSans-Regular text-lg">
                              SAVE
                           </Text>
                        </TouchableOpacity>
                     </View>
                  )}
               </View>
               <AlertModal
                  visible={isVisibleAlertModal}
                  message="Update successfully"
                  type="SUCCESS"
                  onClose={() => setIsVisibleAlertModal(false)}
               />
            </CommonLayout>
         </SafeAreaView>
      </SafeAreaProvider>
   );
};

export default AddressScreen;
