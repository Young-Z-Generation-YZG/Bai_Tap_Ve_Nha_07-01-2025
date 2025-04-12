import { View, Text, TouchableOpacity, ScrollView, Button } from 'react-native';
import React, { useState } from 'react';
import CommonLayout from '@components/layouts/common.layout';
import AppButton from '@components/ui/AppButton';
import { router } from 'expo-router';
import FeatherIcon from 'react-native-vector-icons/Feather';
import CartItem from '@components/ui/cart-item';
import AppPopupModal from '@components/ui/AppModel';
import Icons from '@constants/svg-icons';

const PlaceOrderScreen = () => {
   const [items, setItems] = useState([1, 2, 3]);

   const [modalVisible, setModalVisible] = useState(false);

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
                  <View className="w-[200px]">
                     <Text className="text-xl font-TenorSans-Regular">
                        Iris Watson
                     </Text>
                     <Text className="font-TenorSans-Regular text-[#333]/80 text-wrap mt-2 text-base">
                        606-3727 Ullamcorper. Street Roseville NH 11523
                     </Text>
                     <Text className="font-TenorSans-Regular text-[#333]/80 mt-1 text-base">
                        (786) 713-8616
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
                        {items.map((item, index) => (
                           <CartItem
                              key={index}
                              title="lamerei"
                              price={120}
                              imageUrl="https://res.cloudinary.com/djiju7xcq/image/upload/v1729839380/Sunflower-Jumpsuit-1-690x875_dibawa.webp"
                              checkout
                              quantity={1}
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
                     $240
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
