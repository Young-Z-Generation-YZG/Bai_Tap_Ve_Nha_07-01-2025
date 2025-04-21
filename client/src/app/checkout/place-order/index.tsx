import { View, Text, TouchableOpacity, ScrollView, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import CommonLayout from '@components/layouts/common.layout';
import AppButton from '@components/ui/AppButton';
import { router, useLocalSearchParams } from 'expo-router';
import FeatherIcon from 'react-native-vector-icons/Feather';
import CartItem from '@components/ui/cart-item';
import AppPopupModal from '@components/ui/AppModel';
import Icons from '@constants/svg-icons';
import { useAppSelector } from '~/src/infrastructure/redux/store';
import {
   useGetAddressAsyncQuery,
   useGetProfileAsyncQuery,
} from '~/src/infrastructure/redux/apis/user.api';
import { PlaceOrderType } from '~/src/infrastructure/types/invoice.type';
import { usePostInvoicdeAsyncMutation } from '~/src/infrastructure/redux/apis/invoice.api';

const PlaceOrderScreen = () => {
   const { payment_method } = useLocalSearchParams<{
      payment_method: string;
   }>();

   const cart = useAppSelector((state) => state.cart);
   const [modalVisible, setModalVisible] = useState(false);
   const [objPlaceOrder, setObjPlaceOrder] = useState<PlaceOrderType>({
      contact_name: '',
      contact_phone_number: '',
      address_line: '',
      address_district: '',
      address_province: '',
      address_country: '',
      payment_method: payment_method,
      bought_items: cart.items.map((item) => ({
         product_id: item.product_id,
         product_color: item.product_color,
         product_size: item.product_size,
         quantity: item.quantity,
      })),
      voucher_code: cart.discount.voucherCode,
   });

   const { data: responseAddress } = useGetAddressAsyncQuery();
   const { data: responseProfile } = useGetProfileAsyncQuery();

   useEffect(() => {
      if (responseAddress?.data && responseProfile?.data) {
         const addressData = responseAddress.data;
         const profileData = responseProfile.data;
         setObjPlaceOrder((prev) => ({
            ...prev,
            contact_name:
               profileData.profile_firstName +
               ' ' +
               profileData.profile_lastName,
            contact_phone_number: profileData.profile_phoneNumber,
            address_line: addressData.address_addressLine,
            address_district: addressData.address_district,
            address_province: addressData.address_province,
            address_country: addressData.address_country,
            // payment_method: '',
            // bought_items: [],
            // voucher_code: null,
         }));
      }
   }, [responseAddress, responseProfile]);

   const [postInvoice, result] = usePostInvoicdeAsyncMutation();
   const onSubmitPlaceOrder = async () => {
      console.log('objPlaceOrder', objPlaceOrder);

      const res = await postInvoice(objPlaceOrder);
      if (res.data) {
         setModalVisible(true);
      }
      // else {
      //    console.log(res.error);
      // }
      // if (res.data) {
      //    setModalVisible(true);
      // } else {
      //    if ('data' in (res?.error || {})) {
      //       if ('data' in res.error) {
      //          if (
      //             typeof res.error.data === 'object' &&
      //             res.error.data !== null &&
      //             'message' in res.error.data
      //          ) {
      //             console.log((res.error.data as { message: string }).message);
      //          }
      //       }
      //    }
      // }
   };

   return (
      <CommonLayout title="Place Order" className="h-full bg-white">
         <AppPopupModal
            isVisible={modalVisible}
            onClose={() => setModalVisible(false)}
         >
            <View>
               <View className="flex items-center justify-center">
                  <Text className="mb-5 text-xl text-center uppercase font-TenorSans-Regular">
                     Payment Success
                  </Text>
                  <Icons.SuccessPaymentIcon />
                  <Text className="mt-5 text-xl font-TenorSans-Regular">
                     Your payment was success
                  </Text>
                  <Text className="mt-3 text-lg font-TenorSans-Regular">
                     Payment ID 15263541
                  </Text>
                  <Icons.SeparateLine
                     style={{
                        padding: 20,
                     }}
                  />
                  <Text className="mb-2 text-xl font-TenorSans-Regular">
                     Rate your purchase
                  </Text>
                  <View className="flex flex-row">
                     <Icons.SadIcon />
                     <Icons.HappyIcon />
                     <Icons.LoveIcon />
                  </View>

                  <View className="flex flex-row justify-between gap-5 mt-6 mb-3">
                     <AppButton
                        title="Submit"
                        containerStyles="py-1 px-4"
                        textStyles="text-base tracking-widest"
                        onPress={() => {
                           setModalVisible(false);
                           router.push('/home');
                        }}
                     />

                     <AppButton
                        title="Back to Home"
                        onPress={() => {
                           setModalVisible(false);
                           router.push('/home');
                        }}
                        containerStyles="bg-white border border-black py-1 px-4"
                        textStyles="text-black text-base"
                     />
                  </View>
               </View>
            </View>
         </AppPopupModal>

         <View className="flex justify-between flex-1">
            <View className="px-5 mt-2">
               {/* Shipping address */}
               <View className="flex flex-row items-center justify-between pb-2 m-3 border-b-2 border-slate-300/50 gap-5">
                  <View className="flex-1">
                     <Text className="text-xl font-TenorSans-Regular">
                        {objPlaceOrder.contact_name}
                     </Text>
                     <Text className="font-TenorSans-Regular text-[#333]/80 text-wrap mt-2 text-base">
                        {objPlaceOrder.address_line +
                           ' ' +
                           objPlaceOrder.address_district +
                           ' ' +
                           objPlaceOrder.address_province}
                     </Text>
                     <Text className="font-TenorSans-Regular text-[#333]/80 mt-1 text-base">
                        {objPlaceOrder.contact_phone_number}
                     </Text>
                  </View>
                  <TouchableOpacity>
                     <FeatherIcon name="edit" size={26} color="#3338" />
                  </TouchableOpacity>
               </View>

               {/* Products */}
               <View>
                  <ScrollView className="w-full mt-1 max-h-[350px]">
                     <View className="flex flex-col gap-6">
                        {cart.items.map((item, index) => (
                           <CartItem
                              key={index}
                              product_id={item.product_id}
                              product_slug={item.product_slug}
                              product_img={item.product_img}
                              product_name={item.product_name}
                              product_color={item.product_color}
                              product_size={item.product_size}
                              product_price={item.product_price}
                              quantity={item.quantity}
                           />
                        ))}
                     </View>
                  </ScrollView>
               </View>
            </View>

            <View>
               <View className="flex flex-row items-center justify-between p-5 border-t border-slate-300/50">
                  <Text className="text-xl font-TenorSans-Regular">
                     Payment Method
                  </Text>
                  <Text className="text-2xl font-TenorSans-Regular text-secondary">
                     {payment_method}
                  </Text>
               </View>

               <View className="flex flex-row items-center justify-between p-5 border-t border-slate-300/50">
                  <Text className="text-xl font-TenorSans-Regular">
                     EST. TOTAL
                  </Text>
                  <Text className="text-2xl font-TenorSans-Regular text-secondary">
                     ${cart.discount.totalDiscount}
                  </Text>
               </View>

               <AppButton
                  title="Process Payment"
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
      </CommonLayout>
   );
};

export default PlaceOrderScreen;
