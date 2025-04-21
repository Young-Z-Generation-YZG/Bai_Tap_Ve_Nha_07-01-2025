import {
   View,
   Text,
   ScrollView,
   Dimensions,
   TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import CommonLayout from '@components/layouts/common.layout';
import CartItem from '@components/ui/cart-item';
import Icons from '@constants/svg-icons';
import AppButton from '@components/ui/AppButton';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { router } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '~/src/infrastructure/redux/store';
import { useGetVouchersAsyncQuery } from '~/src/infrastructure/redux/apis/voucher.api';
import VouchersModal from '@components/ui/VouchersModal';
import { VoucherItemType } from '~/src/infrastructure/types/voucher.type';
import { useDispatch } from 'react-redux';

import {
   setTotalDiscount,
   clearTotalDiscount,
} from '~/src/infrastructure/redux/features/app/cart.slice';

const { height: SCREEN_HEIGH } = Dimensions.get('window');
const HEADER_HEIGHT = 200;

const CheckoutScreen = () => {
   const cart = useAppSelector((state) => state.cart);

   const [selectedVoucher, setSelectedVoucher] =
      useState<VoucherItemType | null>(null);
   const dispatch = useDispatch();

   useEffect(() => {
      if (!selectedVoucher) {
         dispatch(clearTotalDiscount());
      }
   }, []);

   // Handle setting the selected voucher
   const handleSelectVoucherItem = (voucher: VoucherItemType) => {
      setSelectedVoucher(voucher);
      console.log('Voucher selected:', voucher);

      if (voucher.type === 'PERCENTAGE') {
         var totalDiscount = cart.total * (1 - voucher.value / 100);
         console.log('totalDiscount', totalDiscount);
         if (totalDiscount > voucher.maxDiscount) {
            dispatch(
               setTotalDiscount({
                  totalDiscount: cart.total - voucher.maxDiscount,
                  voucherCode: voucher.code,
               }),
            );
         } else {
            dispatch(
               setTotalDiscount({
                  totalDiscount: totalDiscount,
                  voucherCode: voucher.code,
               }),
            );
         }
      }
   };

   const [isVisibleModalVouchers, setIsVisibleModalVouchers] = useState(false);

   return (
      <SafeAreaProvider style={{ flex: 1 }}>
         <SafeAreaView style={{ flex: 1 }}>
            <CommonLayout title="Checkout" className="h-full bg-white">
               <View className={`flex flex-1 gap-3`}>
                  <View className="flex-[60%]">
                     <ScrollView className="w-full mt-2">
                        <View className="flex flex-col gap-6 justify-center px-4">
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

                  <View className="flex-[40%] border-t-[2px] border-t-slate-300/50">
                     {/* Voucher Section*/}
                     <View className="h-[25%]">
                        <TouchableOpacity
                           className="flex-1"
                           onPress={() => setIsVisibleModalVouchers(true)}
                        >
                           <View className="flex flex-row items-center py-5 mx-5 border-b-2 border-slate-300/50 gap-5 h-full">
                              <Icons.VoucherIcon width={28} height={28} />

                              {selectedVoucher ? (
                                 <View>
                                    <Text className="font-TenorSans-Regular">
                                       Applied voucher: {selectedVoucher.code}
                                    </Text>
                                    <Text className="font-TenorSans-Regular text-secondary">
                                       Discount:{' '}
                                       {selectedVoucher.type === 'PERCENTAGE'
                                          ? `${selectedVoucher.value}%`
                                          : `$${selectedVoucher.value}`}
                                    </Text>
                                 </View>
                              ) : (
                                 <Text className="text-lg text-slate-600 font-TenorSans-Regular">
                                    Add promo code
                                 </Text>
                              )}
                           </View>
                        </TouchableOpacity>
                     </View>

                     {/* Delivery Section*/}
                     <View className="h-[25%]">
                        <View className="flex flex-row items-center justify-between py-5 mx-5 border-b-2 border-slate-300/50 h-full">
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
                     </View>

                     {/* Total Section*/}
                     <View className="h-[25%] flex flex-row items-center justify-between mx-5">
                        <Text className="text-xl font-TenorSans-Regular">
                           EST. TOTAL
                        </Text>
                        <Text className="text-2xl font-TenorSans-Regular text-secondary">
                           ${cart.discount.totalDiscount}
                        </Text>
                     </View>

                     {/* Button Section*/}
                     <View className="h-[25%]">
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
               </View>
               <VouchersModal
                  onClose={() => setIsVisibleModalVouchers(false)}
                  visible={isVisibleModalVouchers}
                  onSelectVoucherItem={handleSelectVoucherItem}
               />
            </CommonLayout>
         </SafeAreaView>
      </SafeAreaProvider>
   );
};

export default CheckoutScreen;
