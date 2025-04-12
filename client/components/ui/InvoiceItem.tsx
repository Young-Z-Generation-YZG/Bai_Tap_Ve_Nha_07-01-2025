import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icons from '@constants/svg-icons';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import { router } from 'expo-router';
import { InvoiceItemType } from '~/src/infrastructure/types/invoice.type';

export default function InvoiceItem({ item }: { item: InvoiceItemType }) {
   const quatityTotal = item.invoice_products.reduce(
      (total, product) => (total += product.quantity),
      0,
   );

   var color = '';

   switch (item.invoice_status) {
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
      <TouchableOpacity
         key={item._id}
         onPress={() =>
            router.push(`/profile/invoices/invoice-detail?_id=${item._id}`)
         }
         className="bg-gray-200 px-2 py-5 mb-3 rounded-[5px] flex flex-row gap-2 items-center"
      >
         <View className="self-start">
            <Icons.BillIcon width={50} height={50} />
         </View>
         <View className="flex-1 flex gap-5">
            <Text
               numberOfLines={1}
               ellipsizeMode="tail"
               className="font-TenorSans-Regular text-[16px] w-[200px]"
            >
               Order - #{item._id}
            </Text>
            <View className="flex flex-row gap-14">
               <Text className="font-TenorSans-Regular text-[15px]">
                  {quatityTotal} items
               </Text>
               <Text className="font-TenorSans-Regular text-[15px]">
                  Total: ${item.invoice_total}
               </Text>
            </View>
            <View
               className={`w-[100px] border rounded-lg items-center py-1`}
               style={{
                  backgroundColor: `#${color}`,
               }}
            >
               <Text className="font-Poppins-Medium text-[11px]">
                  {item.invoice_status}
               </Text>
            </View>
         </View>
         <View>
            <AntDesignIcons name="right" size={20} />
         </View>
      </TouchableOpacity>
   );
}
