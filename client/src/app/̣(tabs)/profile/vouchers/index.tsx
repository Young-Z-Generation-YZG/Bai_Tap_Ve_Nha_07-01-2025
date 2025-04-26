import {
   View,
   Text,
   FlatList,
   TouchableOpacity,
   StyleSheet,
   Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CommonLayout from '@components/layouts/common.layout';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import VoucherItem from '@components/ui/VoucherItem';
import { useGetVouchersAsyncQuery } from '~/src/infrastructure/redux/apis/voucher.api';
import { VoucherItemType } from '~/src/infrastructure/types/voucher.type';
import VouchersModal from '@components/ui/VouchersModal';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('screen');

export default function VouchersScreen() {
   const { data: vouchersResponse } = useGetVouchersAsyncQuery();
   // const [isVisibleModalVouchers, setIsVisibleModalVouchers] = useState(false);
   return (
      <SafeAreaProvider>
         <SafeAreaView className="flex-1 bg-gray-50">
            <CommonLayout title="My Vouchers">
               <View className="flex-1 py-5 bg-white rounded-lg justify-center items-center">
                  <FlatList
                     showsVerticalScrollIndicator={false}
                     data={vouchersResponse?.data}
                     renderItem={({ item }) => <VoucherItem item={item} />}
                     contentContainerStyle={{
                        gap: 20,
                        width: SCREEN_WIDTH,
                        paddingHorizontal: 10,
                     }}
                  />
               </View>

            </CommonLayout>
         </SafeAreaView>
      </SafeAreaProvider>
   );
}
