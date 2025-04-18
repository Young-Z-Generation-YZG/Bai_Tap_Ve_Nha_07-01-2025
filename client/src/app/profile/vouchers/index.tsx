import {
   View,
   Text,
   FlatList,
   TouchableOpacity,
   StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CommonLayout from '@components/layouts/common.layout';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import VoucherItem from '@components/ui/voucher-item';
import { useGetVouchersByUserIdAsyncQuery } from '~/src/infrastructure/redux/apis/voucher.api';
import { VoucherItemType } from '~/src/infrastructure/types/voucher.type';

export default function VouchersScreen() {
   const [activeTab, setActiveTab] = useState('Available');

   const {
      data: vouchersResponse,
      isLoading,
      isFetching,
      isError,
      refetch,
   } = useGetVouchersByUserIdAsyncQuery();

   // if (vouchersResponse?.data) {
   //    setVouchers(vouchersResponse.data);
   // }

   // console.log('VOUCHERS::', vouchersResponse?.data);

   return (
      <SafeAreaProvider>
         <SafeAreaView className="flex-1 bg-gray-50">
            <CommonLayout title="My Vouchers">
               <FlatList
                  data={vouchersResponse?.data}
                  renderItem={({ item }) => <VoucherItem item={item} />}
                  contentContainerStyle={{ paddingVertical: 10 }}
               />
               {/* <Text>dsfasd</Text> */}
            </CommonLayout>
         </SafeAreaView>
      </SafeAreaProvider>
   );
}
