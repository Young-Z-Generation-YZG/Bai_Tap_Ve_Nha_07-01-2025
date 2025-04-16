import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { VoucherItemType } from '~/src/infrastructure/types/voucher.type';

const VoucherItem = ({ item }: { item: VoucherItemType}) => {
   // Format date to readable format
   const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
         year: 'numeric', 
         month: 'short', 
         day: 'numeric' 
      });
   };

   // Check if voucher is expired
   const isExpired = () => {
      return new Date(item.endDate) < new Date();
   };

   // Format value based on type
   const formatValue = () => {
      if (item.type === "PERCENTAGE") {
         return `${item.value}% OFF`;
      } else if (item.type === "AMOUNT") {
         return `$${item.value} OFF`;
      } else if (item.type === "SHIPPING") {
         return "FREE SHIPPING";
      }
      return `${item.value} OFF`;
   };

   // Get background color based on source
   const getSourceColor = () => {
      switch (item.source) {
         case "REVIEW": return "bg-blue-600";
         case "REFERRAL": return "bg-purple-600";
         case "WELCOME": return "bg-green-600";
         case "BIRTHDAY": return "bg-pink-600";
         case "SEASONAL": return "bg-orange-500";
         case "LOYALTY": return "bg-indigo-600";
         default: return "bg-gray-600";
      }
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
         {/* Top colored section with voucher name and value */}
         <View className={`${getSourceColor()} p-4 flex-row justify-between items-center`}>
            <View className="flex-row items-center">
               <MaterialCommunityIcons
                  name="ticket-percent"
                  size={24}
                  color="white"
               />
               <View className="ml-3 flex-1 pr-2">
                  <Text className="text-white text-lg font-bold uppercase" numberOfLines={1}>
                     {item.name}
                  </Text>
                  <Text className="text-white opacity-80" numberOfLines={1}>
                     {item.description}
                  </Text>
               </View>
            </View>
            <View className="bg-white px-3 py-2 rounded-lg">
               <Text className={`font-bold ${getSourceColor().replace('bg-', 'text-')} text-lg`}>
                  {formatValue()}
               </Text>
            </View>
         </View>

         {/* Bottom section with details */}
         <View className="bg-white p-4">
            {/* Code and max discount */}
            <View className="flex-row justify-between mb-3">
               <View>
                  <Text className="text-gray-500 text-xs">CODE</Text>
                  <Text className="font-bold tracking-wider">{item.code}</Text>
               </View>
               {item.type === "PERCENTAGE" && (
                  <View>
                     <Text className="text-gray-500 text-xs text-right">MAX DISCOUNT</Text>
                     <Text className="font-medium text-right">${(item.maxDiscount/1000).toFixed(1)}K</Text>
                  </View>
               )}
            </View>
            
            {/* Dates */}
            <View className="flex-row justify-between pb-3 border-b border-gray-100">
               <View>
                  <Text className="text-gray-500 text-xs">VALID FROM</Text>
                  <Text className="font-medium">
                     {formatDate(item.startDate)}
                  </Text>
               </View>
               <View>
                  <Text className="text-gray-500 text-xs text-right">
                     VALID UNTIL
                  </Text>
                  <Text
                     className={`font-medium ${
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
                  <Text className="text-gray-800 mr-1">Status:</Text>
                  {!item.isValid || isExpired() ? (
                     <View className="flex-row items-center">
                        <Text className="text-red-500 font-medium">
                           {isExpired() ? "Expired" : "Invalid"}
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
                        <Text className="text-green-600 font-medium">
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
                     className={`${getSourceColor()} py-2 px-4 rounded-lg`}
                     // onPress={onPress}
                  >
                     <Text className="text-white font-bold text-center">
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