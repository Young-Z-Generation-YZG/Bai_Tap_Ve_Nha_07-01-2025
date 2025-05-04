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

export interface AlertModalProps {
   message: string;
   isVisible: boolean;
   onClose: () => void;
   type: 'SUCCESS' | 'ERROR' | 'WARNING';
   onSubmit?: () => void;
   visibleSubmit?: boolean;
   visibleClose?: boolean;
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
         visible={props.isVisible}
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
                        
                     <View className='w-[80%] flex-row justify-end mx-10 gap-2'>
                        {
                           props.visibleClose &&
                           <TouchableOpacity onPress={props.onClose} className=' border px-5 py-1 rounded-lg'>
                              <Text className='text-lg font-TenorSans-Regular uppercase'>NO</Text>
                           </TouchableOpacity>
                        }
                        {
                           props.visibleSubmit &&
                           <TouchableOpacity onPress={props.onSubmit} className=' border px-5 py-1 rounded-lg'>
                              <Text className='text-lg font-TenorSans-Regular uppercase'>YES</Text>
                           </TouchableOpacity>
                        }

                     </View>
                             
                  </View>
               </TouchableWithoutFeedback>
            </View>
         </TouchableWithoutFeedback>
      </Modal>
   );
};

export default AlertModal;
