import {
   View,
   Text,
   ScrollView,
   TouchableOpacity,
   Button,
   Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import FeatherIcon from 'react-native-vector-icons/Feather';
import CartItem from '@components/ui/cart-item';
import { router, useNavigation } from 'expo-router';
import CommonLayout from '@components/layouts/common.layout';
import { useAppSelector } from '~/src/infrastructure/redux/store';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import {
   addWishList,
   clearWishList,
   removeWishList,
} from '~/src/infrastructure/redux/features/app/wishlist.slice';

const WishListScreen = () => {
   const wishlist = useAppSelector((state) => state.wishlist);

   const dispatch = useDispatch();

   const handleAddWishList = () => {
      dispatch(
         addWishList({
            id: '66468e5e529494b708d5909a',
            product_img:
               'https://res.cloudinary.com/djiju7xcq/image/upload/v1729839380/Sunflower-Jumpsuit-1-690x875_dibawa.webp',
            product_name: 'sunflower jumpsuit',
            category_name: 'test',
            product_brand: 'test',
            product_price: 200,
            product_slug: 'test',
         }),
      );
      dispatch(
         addWishList({
            id: '6646a5eb529494b708d5a0ab',
            product_img:
               'https://res.cloudinary.com/djiju7xcq/image/upload/v1729839883/Dust-Lightweight-Jacket-1-690x884_lyplkn.jpg',
            product_name: 'dust lightweight jacket',
            category_name: 'test',
            product_brand: 'test',
            product_price: 200,
            product_slug: 'test',
         }),
      );
   };

   const handleClearWishList = () => {
      dispatch(clearWishList());
   };

   const handleRemoveItem = (id: string) => {
      dispatch(removeWishList(id));
   };

   const navigation = useNavigation();

   return (
      <SafeAreaProvider>
         <SafeAreaView className="flex-1 bg-white">
            <CommonLayout title="Wish List">
               <View className="justify-between flex-1 py-2">
                  {/* <Button title='ADD' onPress={handleAddWishList}/> */}
                  {/* <Button title='REMOVE'/> */}
                  {/* <Button title='CLEAR' onPress={handleClearWishList}/> */}
                  {wishlist.items.length === 0 ? (
                     <View className="w-max flex-1 justify-center items-center">
                        {/* // <MaterialCommunityIcons name='cart-off' size={35} color={'#000'}/> */}
                        <Text className="text-2xl font-TenorSans-Regular">
                           EMPTY WISHLIST
                        </Text>
                     </View>
                  ) : (
                     <ScrollView
                        showsVerticalScrollIndicator={false}
                        className="flex-1"
                     >
                        <View className="flex-1 flex flex-col py-5">
                           {wishlist.items.map((item) => (
                              <TouchableOpacity
                                 onPress={() =>
                                    router.push(
                                       `/products/${item.product_slug}`,
                                    )
                                 }
                                 key={item.id}
                                 className="flex-1 bg-[#f3f3f3] flex flex-row overflow-hidden rounded-lg mb-4 mx-[16px]"
                                 style={{
                                    shadowColor: '#000',
                                    elevation: 15,
                                    shadowOffset: {
                                       width: 0,
                                       height: 30,
                                    },
                                    shadowOpacity: 0.27,
                                    shadowRadius: 4.65,
                                 }}
                              >
                                 <Image
                                    src={item.product_img}
                                    className="h-[120px] w-[90px]"
                                 />
                                 <View className="relative flex-1 px-5 py-3 flex flex-col justify-evenly">
                                    <Text className="text-[15px] font-TenorSans-Regular uppercase">
                                       {item.product_name}
                                    </Text>
                                    <View className="flex flex-row justify-between">
                                       <Text className="text-[14px] font-TenorSans-Regular">
                                          Category: {item.category_name}
                                       </Text>
                                       <Text className="text-[14px] font-TenorSans-Regular">
                                          Brand: {item.product_brand}
                                       </Text>
                                    </View>
                                    <Text className="text-[17px] font-TenorSans-Regular uppercase text-secondary">
                                       ${item.product_price}
                                    </Text>
                                    <TouchableOpacity
                                       onPress={() => handleRemoveItem(item.id)}
                                       className="absolute bottom-3 right-3 px-3 py-2 bg-secondary rounded-lg flex justify-center items-center "
                                    >
                                       <Text className="text-white text-[12px] font-TenorSans-Regular">
                                          Remove
                                       </Text>
                                    </TouchableOpacity>
                                 </View>
                              </TouchableOpacity>
                           ))}
                        </View>
                     </ScrollView>
                  )}
               </View>
            </CommonLayout>
         </SafeAreaView>
      </SafeAreaProvider>
   );
};

export default WishListScreen;
