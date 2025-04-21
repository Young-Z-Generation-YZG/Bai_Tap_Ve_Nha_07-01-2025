import VoucherItem from '@components/ui/VoucherItem';
import React from 'react';
import { Dimensions, Text, TouchableOpacity } from 'react-native';
import { View, Modal, TouchableWithoutFeedback } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { cn } from '~/lib/utils';
import { useGetVouchersAsyncQuery } from '~/src/infrastructure/redux/apis/voucher.api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { VoucherItemType } from '~/src/infrastructure/types/voucher.type';
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('screen');

type ModalProps = {
   visible: boolean;
   onClose: () => void;
   onSelectVoucherItem: (voucher: VoucherItemType) => void;
};

export default function VouchersModal(props: ModalProps) {
   const { data: vouchersResponse } = useGetVouchersAsyncQuery();

   const handleVoucherSelect = (voucher: VoucherItemType) => {
      props.onSelectVoucherItem(voucher);
      props.onClose(); // Close the modal after selection
   };

   return (
      <Modal
         animationType="fade"
         transparent={true}
         visible={props.visible}
         onRequestClose={props.onClose}
      >
         <TouchableWithoutFeedback onPress={props.onClose}>
            <View className="flex-1 bg-[#000000ab] justify-center items-center">
               <TouchableWithoutFeedback onPress={() => {}}>
                  <View
                     className="h-[80%] py-5 bg-white rounded-lg justify-center items-center"
                     style={{ width: SCREEN_WIDTH - 20 }}
                  >
                     <Text className="font-TenorSans-Regular text-2xl mb-5">
                        YOUR VOUCHERS
                     </Text>
                     <FlatList
                        showsVerticalScrollIndicator={false}
                        data={vouchersResponse?.data}
                        renderItem={({ item }) => (
                           <VoucherItem
                              item={item}
                              onSelect={handleVoucherSelect}
                           />
                        )}
                        contentContainerStyle={{
                           gap: 20,
                           width: SCREEN_WIDTH - 30,
                           paddingHorizontal: 10,
                        }}
                     />
                     <TouchableOpacity
                        className="absolute top-4 right-4 "
                        onPress={props.onClose}
                     >
                        <MaterialCommunityIcons name="close-box" size={30} />
                     </TouchableOpacity>
                  </View>
               </TouchableWithoutFeedback>
            </View>
         </TouchableWithoutFeedback>
      </Modal>
   );
}
