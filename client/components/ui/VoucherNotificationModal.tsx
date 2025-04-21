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
   item: VoucherItemType;
};

export default function VoucherNotificationModal(props: ModalProps) {
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
                        YOU HAVE NEW VOUCHER
                     </Text>
                     <VoucherItem item={props.item} />
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
