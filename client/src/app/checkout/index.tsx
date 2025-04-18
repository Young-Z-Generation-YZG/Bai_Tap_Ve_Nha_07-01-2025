import { View, Text, ScrollView, Dimensions } from 'react-native';
import React, { useState } from 'react';
import CommonLayout from '@components/layouts/common.layout';
import CartItem from '@components/ui/cart-item';
import Icons from '@constants/svg-icons';
import AppButton from '@components/ui/AppButton';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { router } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '~/src/infrastructure/redux/store';

const { height: SCREEN_HEIGH } = Dimensions.get('window');
const HEADER_HEIGHT = 200;

const CheckoutScreen = () => {
   const [items, setItems] = useState([1, 2, 3]);

   const CONTENT_HEIGHT = SCREEN_HEIGH - HEADER_HEIGHT;

   // console.log("CONTENT_HEIGHT", CONTENT_HEIGHT);
   const cart = useAppSelector((state) => state.cart);

   return (
      <SafeAreaProvider style={{ flex: 1 }}>
         <SafeAreaView style={{ flex: 1 }}>
            <CommonLayout title="Checkout" className="h-full bg-white">
               <View className={`flex flex-1 justify-between`}>
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

                     <View className="mt-5">
                        <View className="w-full h-[2px] bg-slate-300/50"></View>
                        <View className="flex flex-row items-center pb-5 m-5 border-b-2 border-slate-300/50">
                           <Icons.VoucherIcon width={28} height={28} />
                           <Text className="ml-5 text-lg text-slate-600 font-TenorSans-Regular">
                              Add promo code
                           </Text>
                        </View>
                     </View>
                     <View>
                        {/* <View className="w-full h-[2px] bg-slate-300/50"></View> */}
                        <View className="flex flex-row items-center justify-between pb-5 m-5 border-b-2 border-slate-300/50">
                           <View className="flex flex-row items-center">
                              <Icons.DoorToDoorIcon width={28} height={28} />
                              <Text className="ml-5 text-lg text-slate-600 font-TenorSans-Regular">
                                 Delivery
                              </Text>
                           </View>

                           <Text className="mr-5 text-lg font-TenorSans-Regular text-slate-600">
                              Free
                           </Text>
                        </View>
                        {/* <View className="w-full h-[2px] bg-slate-300/50 px-2"></View> */}
                     </View>
                  </View>

                  <View>
                     <View className="flex flex-row items-center justify-between p-5">
                        <Text className="text-xl font-TenorSans-Regular">
                           EST. TOTAL
                        </Text>
                        <Text className="text-2xl font-TenorSans-Regular text-secondary">
                           ${cart.total}
                        </Text>
                     </View>
                     <AppButton
                        title="Checkout"
                        onPress={() => {
                           router.push('checkout/address');
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
         </SafeAreaView>
      </SafeAreaProvider>
   );
};

export default CheckoutScreen;
