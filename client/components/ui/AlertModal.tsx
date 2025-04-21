import {
   View,
   Text,
   TouchableOpacity,
   Modal,
   TouchableWithoutFeedback,
} from 'react-native';
import React, { useState } from 'react';
import {
   AntDesign,
   Ionicons,
   MaterialCommunityIcons,
} from '@expo/vector-icons';

type AlertModalProps = {
   message: string;
   visible: boolean;
   onClose: () => void;
   type: 'SUCCESS' | 'ERROR' | 'WARNING';
};

const AlertModal = (props: AlertModalProps) => {
   let iconName:
      | 'checkcircle'
      | 'closecircle'
      | 'exclamationcircle'
      | undefined = undefined;
   let iconColor = '';
   switch (props.type) {
      case 'SUCCESS': {
         iconName = 'checkcircle';
         iconColor = '#A0C878';
         break;
      }
      case 'ERROR': {
         iconName = 'closecircle';
         iconColor = '#FF6B6B';
         break;
      }
      case 'WARNING': {
         iconName = 'exclamationcircle';
         iconColor = '#FFA500';
         break;
      }
      default: {
         iconName = 'checkcircle';
         iconColor = '#A0C878';
      }
   }

   return (
      <Modal
         animationType="fade"
         transparent={true}
         visible={props.visible}
         onRequestClose={props.onClose}
      >
         <TouchableWithoutFeedback onPress={props.onClose}>
            <View className="w-[100%] h-[100%] bg-[#000000ab] flex justify-center items-center">
               <TouchableWithoutFeedback onPress={() => {}}>
                  <View className="w-[380px] h-auto py-5 bg-white rounded-lg justify-center items-center gap-3">
                     <AntDesign name={iconName} size={36} color={iconColor} />
                     <Text className="text-lg font-TenorSans-Regular first-letter:uppercase text-center">
                        {props.message}
                     </Text>
                  </View>
               </TouchableWithoutFeedback>
            </View>
         </TouchableWithoutFeedback>
      </Modal>
   );
};

export default AlertModal;
