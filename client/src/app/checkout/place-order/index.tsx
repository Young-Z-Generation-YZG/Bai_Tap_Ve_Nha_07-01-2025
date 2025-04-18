import { View, Text, TouchableOpacity, ScrollView, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import CommonLayout from '@components/layouts/common.layout';
import AppButton from '@components/ui/AppButton';
import { router } from 'expo-router';
import FeatherIcon from 'react-native-vector-icons/Feather';
import CartItem from '@components/ui/cart-item';
import AppPopupModal from '@components/ui/AppModel';
import Icons from '@constants/svg-icons';
import { useAppSelector } from '~/src/infrastructure/redux/store';
import {
   useGetAddressAsyncQuery,
   useGetProfileAsyncQuery,
} from '~/src/infrastructure/redux/apis/user.api';

const PlaceOrderScreen = () => {
   const [items, setItems] = useState([1, 2, 3]);

   const [modalVisible, setModalVisible] = useState(false);

   const cart = useAppSelector((state) => state.cart);

   const [objCheckout, setObjCheckout] = useState({
      name: '',
      address: '',
      phoneNumber: '',
   });

   const { data: responseAddress } = useGetAddressAsyncQuery();
   const { data: responseProfile } = useGetProfileAsyncQuery();

   useEffect(() => {
      if (responseAddress?.data && responseProfile?.data) {
         const addressData = responseAddress.data;
         const profileData = responseProfile.data;
         setObjCheckout({
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
            <View className="p-5 mt-2">
               {/* Shipping address */}
               <View className="flex flex-row items-center justify-between pb-5 m-3 border-b-2 border-slate-300/50">
                  <View className="w-[200px] bg-red-500">
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
               </View>

               {/* Products */}
               <View>
                  <ScrollView className="w-full mt-5 max-h-[350px]">
                     <View className="flex flex-col gap-6">
                        {cart.items.map((item, index) => (
                           <CartItem
                              key={index}
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
                     EST. TOTAL
                  </Text>
                  <Text className="text-2xl font-TenorSans-Regular text-secondary">
                     ${cart.total}
                  </Text>
               </View>

               <AppButton
                  title="Process Payment"
                  onPress={() => {
                     setModalVisible(true);
                  }}
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
