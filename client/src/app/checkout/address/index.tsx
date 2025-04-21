import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import CommonLayout from '@components/layouts/common.layout';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AppDropdown from '@components/ui/AppDropdown';
import AppButton from '@components/ui/AppButton';
import { router, useNavigation } from 'expo-router';
import {
   useGetAddressAsyncQuery,
   useGetProfileAsyncQuery,
} from '~/src/infrastructure/redux/apis/user.api';
import AlertModal from '@components/ui/AlertModal';

const dropdownItems = [
   {
      id: '1',
      content: <Text style={{ color: '#1f2937' }}>Cash on delivery</Text>,
      onPress: () => console.log('Selected Option 1'),
   },
   {
      id: '2',
      content: <Text style={{ color: '#1f2937' }}>VNpay</Text>,
      onPress: () => console.log('Selected Option 2'),
   },
];

const CheckoutAddressScreen = () => {
   const [objProfile, setObjProfile] = useState({
      name: '',
      address: '',
      phoneNumber: '',
   });
   const [txtPaymentMethod, setTxtPaymentMethod] = useState('');
   const [isVisibleAlertModal, setIsVisibleAlertModal] = useState(false);

   const { data: responseAddress } = useGetAddressAsyncQuery();
   const { data: responseProfile } = useGetProfileAsyncQuery();

   useEffect(() => {
      if (responseAddress?.data && responseProfile?.data) {
         const addressData = responseAddress.data;
         const profileData = responseProfile.data;
         setObjProfile({
            name:
               profileData.profile_firstName +
               ' ' +
               profileData.profile_lastName,
            address:
               addressData.address_addressLine +
               ' ' +
               addressData.address_district +
               ' ' +
               addressData.address_province +
               ' ' +
               addressData.address_country,
            phoneNumber: profileData.profile_phoneNumber,
         });
      }
   }, [responseAddress, responseProfile]);

   const onSubmitPlaceOrder = () => {
      if (txtPaymentMethod) {
         router.push(`checkout/place-order?payment_method=${txtPaymentMethod}`);
      } else {
         setIsVisibleAlertModal(true);
      }
   };

   const onSelectDropdow = (id: string | null) => {
      console.log(id);
      if (id === '1') {
         setTxtPaymentMethod('COD');
      } else if (id === '2') {
         setTxtPaymentMethod('VNpay');
      } else {
         setTxtPaymentMethod('');
      }
   };

   return (
      <CommonLayout
         title="Checkout Address"
         titleStyles="text-lg"
         className="h-full bg-white"
      >
         <View className="flex justify-between flex-1">
            <View className="p-5 mt-2">
               <View>
                  <Text className="text-xl font-TenorSans-Regular uppercase text-[#888888]">
                     Shipping address
                  </Text>

                  {/* <View className="flex flex-row items-center justify-between p-3">
                     <View className="w-[200px]">
                        <Text className="text-xl font-TenorSans-Regular">
                           {objCheckout.name}
                        </Text>
                        <Text className="font-TenorSans-Regular text-[#333]/80 text-wrap mt-2 text-base">
                           {objCheckout.address}
                        </Text>
                        <Text className="font-TenorSans-Regular text-[#333]/80 mt-1 text-base">
                           {objCheckout.phoneNumber}
                        </Text>
                     </View>
                     <TouchableOpacity>
                        <FeatherIcon name="edit" size={26} color="#3338" />
                     </TouchableOpacity>
                  </View> */}

                  <View className="flex flex-row items-center justify-between pb-5 m-3 border-b-2 border-slate-300/50 gap-5">
                     <View className="flex-1">
                        <Text className="text-xl font-TenorSans-Regular">
                           {objProfile.name}
                        </Text>
                        <Text className="font-TenorSans-Regular text-[#333]/80 text-wrap mt-2 text-base">
                           {objProfile.address}
                        </Text>
                        <Text className="font-TenorSans-Regular text-[#333]/80 mt-1 text-base">
                           {objProfile.phoneNumber}
                        </Text>
                     </View>
                     <TouchableOpacity>
                        <FeatherIcon name="edit" size={26} color="#3338" />
                     </TouchableOpacity>
                  </View>
               </View>

               <View className="mt-5">
                  <Text className="text-xl font-TenorSans-Regular uppercase text-[#888888]">
                     Payment method
                  </Text>

                  <View className="p-3">
                     <AppDropdown
                        items={dropdownItems}
                        onSelect={(item) =>
                           item?.id
                              ? onSelectDropdow(item.id)
                              : onSelectDropdow(null)
                        }
                        placeholder="Select payment method"
                     />
                  </View>
               </View>
            </View>

            <View>
               <AppButton
                  title="Place order"
                  onPress={onSubmitPlaceOrder}
                  containerStyles="bg-black py-3"
                  icon={
                     <FeatherIcon
                        name="chevrons-right"
                        size={24}
                        color="#ccc"
                     />
                  }
                  iconPosition="right"
               />
            </View>
         </View>
         <AlertModal
            message="Please choose your payment method"
            visible={isVisibleAlertModal}
            onClose={() => setIsVisibleAlertModal(false)}
            type="ERROR"
         />
      </CommonLayout>
   );
};

export default CheckoutAddressScreen;
