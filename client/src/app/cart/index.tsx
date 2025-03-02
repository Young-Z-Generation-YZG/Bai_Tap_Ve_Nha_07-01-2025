import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FeatherIcon from 'react-native-vector-icons/Feather';
import CartItem from '@components/ui/cart-item';
import { router } from 'expo-router';
import CommonLayout from '@components/layouts/common.layout';

const CartScreen = () => {
   const [items, setItems] = useState([1]);

   return (
      <SafeAreaView className="h-full bg-white">
         <CommonLayout title="Cart">
            <View className="justify-between flex-1 px-3 py-2">
               <ScrollView className="w-full mt-5 h-[500px]">
                  <View className="flex flex-col gap-6">
                     {items.map((item, index) => (
                        <CartItem
                           key={index}
                           title="lamerei"
                           price={120}
                           imageUrl="https://res.cloudinary.com/djiju7xcq/image/upload/v1729839380/Sunflower-Jumpsuit-1-690x875_dibawa.webp"
                        />
                     ))}
                  </View>
               </ScrollView>

               <View>
                  {items.length ? (
                     <View className="mt-3">
                        <View className="w-full h-[1.5px] bg-slate-400/50"></View>
                        <View className="flex flex-row justify-center px-10">
                           <Text className="w-full mt-5 text-xl uppercase font-TenorSans-Regular">
                              Sub Total
                           </Text>

                           <Text className="mt-5 text-2xl font-TenorSans-Regular text-secondary">
                              $120
                           </Text>
                        </View>
                        <Text className="mt-2 ml-4 text-base font-TenorSans-Regular text-slate-400">
                           *shipping charges, taxes and discount codes  are
                           calculated at the time of accounting.
                        </Text>
                     </View>
                  ) : (
                     <View></View>
                  )}
                  <View className="mt-3 bg-black">
                     {items.length ? (
                        <TouchableOpacity
                           onPress={() => {
                              router.push('/checkout');
                           }}
                        >
                           <View className="flex flex-row items-center justify-center py-3">
                              <FeatherIcon
                                 name="shopping-bag"
                                 size={24}
                                 color="#ccc"
                              />
                              <Text className="ml-2 text-xl text-white uppercase font-TenorSans-Regular">
                                 Checkout
                              </Text>
                           </View>
                        </TouchableOpacity>
                     ) : (
                        <TouchableOpacity
                           onPress={() => {
                              router.push('/products');
                           }}
                        >
                           <View className="flex flex-row items-center justify-center py-3">
                              <FeatherIcon
                                 name="shopping-bag"
                                 size={24}
                                 color="#ccc"
                              />
                              <Text className="ml-2 text-xl text-white uppercase font-TenorSans-Regular">
                                 Continue to shopping
                              </Text>
                           </View>
                        </TouchableOpacity>
                     )}
                  </View>
               </View>
            </View>
         </CommonLayout>
      </SafeAreaView>
   );
};

export default CartScreen;
