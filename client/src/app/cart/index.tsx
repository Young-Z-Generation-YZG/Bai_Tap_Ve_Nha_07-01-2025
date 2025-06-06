'use client';

import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import FeatherIcon from 'react-native-vector-icons/Feather';
import CartItem from '@components/ui/cart-item';
import { router } from 'expo-router';
import CommonLayout from '@components/layouts/common.layout';
import { useAppSelector } from '~/src/infrastructure/redux/store';
import socketService from '~/src/infrastructure/socket';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CartScreen = () => {
   const cart = useAppSelector((state) => state.cart);
   
   return (
      <SafeAreaProvider>
         <SafeAreaView className="h-full bg-white">
            <View className="justify-between flex-1 px-3 py-2">
               {cart.totalQuantity == 0 ? (
                  <View className="w-max flex-1 justify-center items-center">
                     <MaterialCommunityIcons
                        name="cart-off"
                        size={35}
                        color={'#000'}
                     />
                     <Text className="text-2xl font-TenorSans-Regular">
                        EMPTY CART
                     </Text>
                     <View className="mt-3 px-20 bg-black">
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
                     </View>

                  </View>
               ) : (
                  <ScrollView className="w-full mt-5 h-[500px]">
                     <View className="flex flex-col gap-6">
                        {cart.items.map((item) => (
                           <CartItem
                              key={
                                 item.product_slug +
                                 item.product_size +
                                 item.product_color
                              }
                              product_id={item.product_id}
                              product_slug={item.product_slug}
                              product_img={item.product_img}
                              product_name={item.product_name}
                              product_color={item.product_color}
                              product_size={item.product_size}
                              product_price={item.product_price}
                              quantity={item.quantity}
                           // onChangeTotal={setTotal}
                           />
                        ))}
                     </View>
                  </ScrollView>
               )}
               <View>
                  {cart.items.length ? (
                     <View className="mt-3">
                        <View className="w-full h-[1.5px] bg-slate-400/50"></View>
                        <View className="flex flex-row justify-center px-10">
                           <Text className="w-full mt-5 text-xl uppercase font-TenorSans-Regular">
                              Sub Total
                           </Text>

                           <Text className="mt-5 text-2xl font-TenorSans-Regular text-secondary">
                              ${cart.total}
                           </Text>
                        </View>
                        <Text className="mt-2 ml-4 text-base font-TenorSans-Regular text-slate-400">
                           *shipping charges, taxes and discount codesare
                           calculated at the time of accounting.
                        </Text>
                     </View>
                  ) : (
                     <View></View>
                  )}
                  <View className="mt-3 bg-black">
                     {
                        cart.items.length && (
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
                        )
                     }
                  </View>
               </View>
            </View>
         </SafeAreaView>
      </SafeAreaProvider>
   );
};

export default CartScreen;
