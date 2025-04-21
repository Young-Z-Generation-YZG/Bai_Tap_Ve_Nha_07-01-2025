import React, { useState } from 'react';
import {
   FlatList,
   ScrollView,
   Text,
   TouchableOpacity,
   View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useGetInvoicesAsyncQuery } from '~/src/infrastructure/redux/apis/invoice.api';
import Icons from '@constants/svg-icons';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import { cn } from '~/lib/utils';
import { router } from 'expo-router';
import InvoiceItem from '@components/ui/InvoiceItem';
import CommonLayout from '@components/layouts/common.layout';

export default function InvoicesScreen() {
   const arrayStatus = [
      'ALL',
      'PENDING',
      'CONFIRMED',
      'CANCELLED',
      'PREPARING',
      'DELIVERING',
      'DELIVERED',
   ];
   const { data: invoicesResponse } = useGetInvoicesAsyncQuery({
      _page: 1,
      _limit: 10,
   });

   const [selectedStatus, setSelectedStatus] = useState(arrayStatus[0]);

   return (
      <SafeAreaProvider>
         <SafeAreaView className="flex-1 bg-white">
            <CommonLayout title="My invoices">
               <FlatList
                  horizontal
                  data={arrayStatus}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({
                     item,
                     index,
                  }: {
                     item: string;
                     index: number;
                  }) => (
                     <TouchableOpacity
                        onPress={() => setSelectedStatus(item)}
                        className={cn(
                           'mr-2 w-[200px] justify-center items-center rounded-xl',
                           selectedStatus === item ? 'bg-black' : 'bg-gray-200',
                        )}
                     >
                        <Text
                           className={cn(
                              'font-TenorSans-Regular',
                              selectedStatus === item
                                 ? ' text-white'
                                 : ' text-black',
                           )}
                        >
                           {item}
                        </Text>
                     </TouchableOpacity>
                  )}
                  className="basis-[4%] mt-5 mx-5"
               />

               <ScrollView className="basis-[96%] px-5 pt-5 flex">
                  {invoicesResponse?.data.items ? (
                     invoicesResponse?.data?.items.map((item, index) => (
                        <InvoiceItem key={index} item={item} />
                     ))
                  ) : (
                     <View
                        className="h-[600px] justify-center items-center gap-2"
                        style={{ flex: 1 }}
                     >
                        <Icons.InvoiceEmptyIcon className="w-10 h-10" />
                        <Text className="font-Poppins-SemiBold text-[24px]">
                           No Orders Yet
                        </Text>
                     </View>
                  )}
               </ScrollView>
            </CommonLayout>
            {/* <SafeAreaView className="flex flex-1"> */}
         </SafeAreaView>
      </SafeAreaProvider>
   );
}
