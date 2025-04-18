import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { VoucherItemType } from '~/src/infrastructure/types/voucher.type';

const VoucherItem = ({ item }: { item: VoucherItemType }) => {
   const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
   };

   const isExpired = () => {
      return new Date(item.endDate) < new Date();
   };

   const formatValue = () => {
      if (item.type === 'PERCENTAGE') {
         return `${item.value}% OFF`;
      } else if (item.type === 'AMOUNT') {
         return `$${item.value} OFF`;
      }
      return `${item.value} OFF`;
   };

   return (
      <TouchableOpacity
         key={item.id}
         // onPress={onPress}
         activeOpacity={0.8}
         className="mb-4 mx-2 rounded-xl overflow-hidden"
         style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
         }}
      >
         {/* Top voucher details */}
         <View
            className={'bg-secondary p-4 flex-row justify-between items-center'}
         >
            <View className="flex-1 flex-row items-center">
               <MaterialCommunityIcons
                  name="ticket-percent"
                  size={24}
                  color="white"
               />
               <View className="ml-3 flex-1 pr-2">
                  <Text
                     className="text-white text-xl font-TenorSans-Regular uppercase"
                     numberOfLines={1}
                  >
                     {item.name}
                  </Text>
                  <Text
                     className="text-white font-TenorSans-Regular opacity-80"
                     numberOfLines={1}
                  >
                     {item.description}
                  </Text>
               </View>
            </View>
            <View className="bg-white px-3 py-2 rounded-lg">
               <Text
                  className={'font-TenorSans-Regular text-secondary text-lg'}
               >
                  {formatValue()}
               </Text>
            </View>
         </View>

         {/* Bottom voucher details */}
         <View className="bg-white p-4">
            {/* code and max discount */}
            <View className="flex-row justify-between mb-3">
               <View>
                  <Text className="text-gray-500 text-xs font-TenorSans-Regular">
                     CODE
                  </Text>
                  <Text className="font-TenorSans-Regular tracking-wider">
                     {item.code}
                  </Text>
               </View>
               {item.type === 'PERCENTAGE' && (
                  <View>
                     <Text className="font-TenorSans-Regular text-gray-500 text-xs text-right">
                        MAX DISCOUNT
                     </Text>
                     <Text className="font-TenorSans-Regular text-right">
                        {/* ${(item.maxDiscount / 1000).toFixed(1)}K */}$
                        {item.maxDiscount}
                     </Text>
                  </View>
               )}
            </View>

            {/* Dates */}
            <View className="flex-row justify-between pb-3 border-b border-gray-100">
               <View>
                  <Text className="font-TenorSans-Regular text-gray-500 text-xs">
                     VALID FROM
                  </Text>
                  <Text className="font-TenorSans-Regular">
                     {formatDate(item.startDate)}
                  </Text>
               </View>
               <View>
                  <Text className="font-TenorSans-Regular text-gray-500 text-xs text-right">
                     VALID UNTIL
                  </Text>
                  <Text
                     className={`font-TenorSans-Regular ${
                        isExpired() ? 'text-red-500' : 'text-green-600'
                     }`}
                  >
                     {formatDate(item.endDate)}
                  </Text>
               </View>
            </View>

            {/* Status row */}
            <View className="flex-row justify-between items-center mt-3">
               <View className="flex-row items-center">
                  <Text className="font-TenorSans-Regular text-gray-800 mr-1">
                     Status:
                  </Text>
                  {!item.isValid || isExpired() ? (
                     <View className="flex-row items-center">
                        <Text className="text-red-500 font-TenorSans-Regular">
                           {isExpired() ? 'Expired' : 'Invalid'}
                        </Text>
                        <Ionicons
                           name="close-circle"
                           size={16}
                           color="#EF4444"
                           style={{ marginLeft: 4 }}
                        />
                     </View>
                  ) : (
                     <View className="flex-row items-center">
                        <Text className="text-green-600 font-TenorSans-Regular">
                           Active
                        </Text>
                        <Ionicons
                           name="checkmark-circle"
                           size={16}
                           color="#10B981"
                           style={{ marginLeft: 4 }}
                        />
                     </View>
                  )}
               </View>

               {/* Use button */}
               {item.isValid && !isExpired() && (
                  <TouchableOpacity
                     className={'bg-secondary py-2 px-4 rounded-lg'}
                     // onPress={onPress}
                  >
                     <Text className="text-white font-TenorSans-Regular text-center">
                        USE NOW
                     </Text>
                  </TouchableOpacity>
               )}
            </View>
         </View>

         {/* Decorative circles for ticket effect */}
         <View className="absolute top-[68px] left-[-8px] w-4 h-4 bg-gray-100 rounded-full" />
         <View className="absolute top-[68px] right-[-8px] w-4 h-4 bg-gray-100 rounded-full" />
      </TouchableOpacity>
   );
};

export default VoucherItem;
