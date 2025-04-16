import CommonLayout from '@components/layouts/common.layout';
import ProductInvoiceItem from '@components/ui/ProductInvoiceItem';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useGetInvoicesAsyncQuery } from '~/src/infrastructure/redux/apis/invoice.api';
import { InvoiceProductItemType } from '~/src/infrastructure/types/invoice.type';

export default function InvoiceDetailScreen() {
   const { _id } = useLocalSearchParams();
   const { data: invoicesResponse } = useGetInvoicesAsyncQuery({
      _page: 1,
      _limit: 10,
   });

   const detailInvoice = invoicesResponse?.data.items.find(
      (item) => item._id === _id,
   );
   var color = '';

   switch (detailInvoice?.invoice_status) {
      case 'PENDING':
         color = 'FFC107';
         break;
      case 'CONFIRMED':
         color = '4CAF50';
         break;
      case 'REQUEST_CANCEL':
         color = 'FF9800';
         break;
      case 'CANCELLED':
         color = 'F44336';
         break;
      case 'ON_PREPARING':
         color = '2196F3';
         break;
      case 'ON_DELIVERING':
         color = '9C27B0';
         break;
      case 'DELIVERED':
         color = '4CAF50';
         break;
      default:
         color = 'CCCCCC';
         break;
   }

   return (
      <SafeAreaProvider>
         <SafeAreaView className="flex-1 bg-white">
            <CommonLayout title="Detail Invoice">
               <View className='flex-1 px-6 py-5 gap-5'>
                  <View className="flex flex-col gap-3">
                     <Text className="text-[18px] font-TenorSans-Regular">
                        Order ID: {detailInvoice?._id}
                     </Text>
                     <View className="flex flex-row gap-2 items-center">
                        <Text className="text-[14px] font-TenorSans-Regular text-gray-700">
                           Status:
                        </Text>
                        <View
                           style={{ backgroundColor: `#${color}` }}
                           className="px-2 py-1 rounded-lg"
                        >
                           <Text className="font-TenorSans-Regular">
                              {detailInvoice?.invoice_status}
                           </Text>
                        </View>
                     </View>

                     <Text className="text-[14px] font-TenorSans-Regular text-gray-700">
                        Total Price: ${detailInvoice?.invoice_total}
                     </Text>
                     <Text
                        className="text-[14px] font-TenorSans-Regular text-gray-700"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                     >
                        Address: {detailInvoice?.shipping_address_line},{' '}
                        {detailInvoice?.shipping_address_district},{' '}
                        {detailInvoice?.shipping_address_province},{' '}
                        {detailInvoice?.shipping_address_country}
                     </Text>
                  </View>
                  <ScrollView
                     showsVerticalScrollIndicator={false}
                     className="bg-transparent flex-1 flex flex-col gap-5"
                  >
                     {detailInvoice?.invoice_products.map((item, index) => (
                        <ProductInvoiceItem key={item.product_id} item={item} />
                     ))}
                  </ScrollView>
               </View>
            </CommonLayout>
         </SafeAreaView>
      </SafeAreaProvider>
   );
}
