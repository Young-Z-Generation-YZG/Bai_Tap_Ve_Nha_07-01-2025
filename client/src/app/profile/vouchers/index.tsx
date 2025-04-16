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

const sampleVouchers = [
   {
      _id: '1',
      promotion_name: 'Summer Sale',
      promotion_value: 20, // 20% off
      promotion_start_date: '2025-05-01',
      promotion_end_date: '2025-06-30',
      category_id: 'Seasonal',
   },
   {
      _id: '2',
      promotion_name: 'New User Welcome',
      promotion_value: 15, // $15 off
      promotion_start_date: '2025-04-01',
      promotion_end_date: '2025-07-15',
      category_id: 'Welcome',
   },
   {
      _id: '3',
      promotion_name: 'Holiday Special',
      promotion_value: 25, // 25% off
      promotion_start_date: '2025-12-01',
      promotion_end_date: '2025-12-25',
      category_id: 'Holiday',
   },
   {
      _id: '4',
      promotion_name: 'Flash Sale',
      promotion_value: 30, // 30% off
      promotion_start_date: '2025-08-15',
      promotion_end_date: '2025-08-17',
      category_id: 'Limited',
   },
   {
      _id: '5',
      promotion_name: 'Weekend Discount',
      promotion_value: 10, // 10% off
      promotion_start_date: '2025-06-05',
      promotion_end_date: '2025-06-07',
      category_id: 'Weekend',
   },
   {
      _id: '6',
      promotion_name: 'Birthday Special',
      promotion_value: 50, // $50 off
      promotion_start_date: '2025-04-10',
      promotion_end_date: '2025-05-10',
      category_id: 'Birthday',
   },
   {
      _id: '7',
      promotion_name: 'Back to School',
      promotion_value: 15, // 15% off
      promotion_start_date: '2025-07-15',
      promotion_end_date: '2025-09-01',
      category_id: 'Seasonal',
   },
   {
      _id: '8',
      promotion_name: 'Loyalty Reward',
      promotion_value: 25, // $25 off
      promotion_start_date: '2025-01-01',
      promotion_end_date: '2025-12-31',
      category_id: 'Loyalty',
   },
   {
      _id: '9',
      promotion_name: 'Winter Clearance',
      promotion_value: 40, // 40% off
      promotion_start_date: '2025-01-15',
      promotion_end_date: '2025-02-15',
      category_id: 'Clearance',
   },
   {
      _id: '10',
      promotion_name: 'App-Exclusive Deal',
      promotion_value: 35, // 35% off
      promotion_start_date: '2025-03-01',
      promotion_end_date: '2025-03-31',
      category_id: 'Exclusive',
   },
];

export default function VouchersScreen() {
   const [activeTab, setActiveTab] = useState('Available');

   const {
      data: vouchersResponse,
      isLoading,
      isFetching,
      isError,
      refetch,
   } = useGetVouchersByUserIdAsyncQuery('67ef97148a53ddabeb422b6e');

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
