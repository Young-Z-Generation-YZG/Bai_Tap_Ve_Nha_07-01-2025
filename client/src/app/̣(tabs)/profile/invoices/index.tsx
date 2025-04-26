import React, { useEffect, useState } from 'react';
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
import { InvoiceItemType } from '~/src/infrastructure/types/invoice.type';

export default function InvoicesScreen() {
   const arrStatus = [
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
      _limit: 100,
   });

   const [arrInvoices, setarrInvoices] = useState<InvoiceItemType[]>([])
   const [arrInvoicesFull, setarrInvoicesFull] = useState<InvoiceItemType[]>([])

   useEffect(() => {
      if (invoicesResponse?.data){
         setarrInvoices(invoicesResponse.data.items)
         setarrInvoicesFull(invoicesResponse.data.items)
      }
   },[invoicesResponse?.data])

   const [selectedStatus, setSelectedStatus] = useState(arrStatus[0]);

   const filterInvoices = (index: number) => {
      setSelectedStatus(arrStatus[index])
      if (arrStatus[index] === "ALL"){
         setarrInvoices(arrInvoicesFull)
         return
      }
      let arrNew = arrInvoicesFull.filter((item) => item.invoice_status===arrStatus[index])
      setarrInvoices(arrNew)
   }

   return (
      <SafeAreaProvider>
         <SafeAreaView className="flex-1 bg-white mb-4">
            <CommonLayout title="My invoices">
               <View className='h-16 py-4'>
                  <FlatList
                     horizontal
                     data={arrStatus}
                     showsHorizontalScrollIndicator={false}
                     renderItem={({
                        item,
                        index,
                     }: {
                        item: string;
                        index: number;
                     }) => (
                        <TouchableOpacity
                           onPress={() => filterInvoices(index)}
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
                     className="basis-[4%] mx-5"
                  />
               </View>

               <ScrollView className="flex-1 px-5 py-25 flex">
                  { arrInvoices.length > 0 ? (
                     arrInvoices.map((item, index) => (
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
         </SafeAreaView>
      </SafeAreaProvider>
   );
}
