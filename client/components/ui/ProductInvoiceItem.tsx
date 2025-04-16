import React, { useState } from 'react';
import {
   Alert,
   Image,
   Modal,
   Text,
   TouchableOpacity,
   TouchableWithoutFeedback,
} from 'react-native';
import { View } from 'react-native-ui-lib';
import { InvoiceProductItemType } from '~/src/infrastructure/types/invoice.type';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { TextInput } from 'react-native';
import { usePostReviewAsyncMutation } from '~/src/infrastructure/redux/apis/review.api';
import AlertModal from '@components/ui/AlertModal';

export default function ProductInvoiceItem({
   item,
}: {
   item: InvoiceProductItemType;
}) {
   const [modalVisible, setModalVisible] = useState(false);
   const [starsSelected, setStarsSelected] = useState(0);
   const [reviewText, setReviewText] = useState('');
   const [isVisibleSuccess, setIsVisibleSuccess] = useState(false);
   const [isVisibleError, setIsVisibleError] = useState(false);
   const [txtErrorMessage, setTxtErrorMessage] = useState('');

   const [postReview, result] = usePostReviewAsyncMutation();

   const onHandleReview = async () => {
      const res = await postReview({
         productId: item.product_id,
         content: reviewText,
         review_rating: starsSelected,
      });
      if (res.data) {
         setIsVisibleSuccess(true);
      } else {
         if ('data' in (res?.error || {})) {
            if ('data' in res.error) {
               if (
                  typeof res.error.data === 'object' &&
                  res.error.data !== null &&
                  'message' in res.error.data
               ) {
                  setTxtErrorMessage(
                     (res.error.data as { message: string }).message,
                  );
               }
            }
            // else {
            //    console.log('ERROR:::', res.error);
            // }
         }
         // else {
         // console.log('ERROR:::', res?.error);
         // }
         setIsVisibleError(true);
      }
      onResetModal();
      console.log('RESULT:::', res);
   };

   const onResetModal = () => {
      setModalVisible(false);
      setStarsSelected(0);
      setReviewText('');
   };

   return (
      <View
         key={item.product_id}
         className="mb-[20px] rounded-xl bg-white px-6 py-4 gap-5"
      >
         <View className="flex flex-row">
            <Image src={item.product_image} className="w-20 h-24 rounded-xl" />
            <View className="flex-1 ml-6 flex flex-col gap-2 justify-between">
               <Text className="font-TenorSans-Regular text-[18px]">
                  {item.product_name}
               </Text>
               <View className="flex flex-row justify-between">
                  <Text className="font-TenorSans-Regular text-[16px]">
                     ${item.product_price}
                  </Text>
                  <Text className="font-TenorSans-Regular text-[16px]">
                     Quantity: {item.quantity}
                  </Text>
               </View>
               <View className="flex flex-row justify-between">
                  <Text className="font-TenorSans-Regular text-[16px]">
                     Color: {item.product_color}
                  </Text>
                  <Text className="font-TenorSans-Regular text-[16px]">
                     Size: {item.product_size}
                  </Text>
               </View>
            </View>
         </View>
         <View>
            <TouchableOpacity
               className="rounded-lg bg-secondary py-3"
               onPress={() => setModalVisible(true)}
            >
               <Text className="text-white text-center uppercase font-TenorSans-Regular ">
                  Write Review
               </Text>
            </TouchableOpacity>
         </View>
         <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
               setModalVisible(false);
            }}
         >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
               <View className="w-[100%] h-[100%] bg-[#000000ab] flex justify-center items-center">
                  <TouchableWithoutFeedback onPress={() => {}}>
                     <View className="w-[380px] h-auto bg-white px-4 py-5 flex gap-5 rounded-lg">
                        {/* title */}
                        <View className="mb-2">
                           <Text className="text-center text-[28px] font-TenorSans-Regular">
                              Write a Review
                           </Text>
                        </View>
                        {/* product review */}
                        <View className="rounded-md bg-gray-200 flex flex-row p-2 gap-4">
                           <Image
                              src={item.product_image}
                              className="w-20 h-24 rounded-xl"
                           />
                           <View className="flex-1 flex flex-col justify-between">
                              <Text className="text-[20px] font-TenorSans-Regular">
                                 {item.product_name}
                              </Text>
                              <View className="flex flex-row justify-between">
                                 <Text className="text-[14px] font-TenorSans-Regular text-gray-500">
                                    Size: {item.product_size}
                                 </Text>
                                 <Text className="text-[14px] font-TenorSans-Regular text-gray-500">
                                    Color: {item.product_color}
                                 </Text>
                              </View>
                              <Text className="text-[16px] font-TenorSans-Regular">
                                 ${item.product_price}
                              </Text>
                           </View>
                        </View>
                        {/* stars review */}
                        <View className="flex flex-row items-center gap-10">
                           <Text className="text-[20px] font-TenorSans-Regular">
                              Stars:
                           </Text>
                           <View className="flex flex-row">
                              {Array.from({ length: 5 }).map((_, index) => (
                                 <TouchableOpacity
                                    key={index}
                                    onPress={() => setStarsSelected(index + 1)}
                                 >
                                    {index + 1 > starsSelected ? (
                                       <AntDesignIcon
                                          key={index}
                                          name="staro"
                                          size={30}
                                       />
                                    ) : (
                                       <AntDesignIcon
                                          key={index}
                                          name="star"
                                          size={30}
                                          color={'#FFB22C'}
                                       />
                                    )}
                                 </TouchableOpacity>
                              ))}
                           </View>
                        </View>
                        <View className="flex flex-col gap-2">
                           <Text className="text-[20px] font-TenorSans-Regular">
                              Write your Review
                           </Text>
                           <View className="h-[122px] border border-gray-400 rounded-lg px-2">
                              <TextInput
                                 multiline
                                 numberOfLines={6}
                                 value={reviewText}
                                 onChangeText={setReviewText}
                                 placeholder="Write something about this product"
                              />
                           </View>
                        </View>
                        <TouchableOpacity onPress={onHandleReview}>
                           <View className="bg-secondary/70 py-5 rounded-lg">
                              <Text className="text-center text-white text-[18px] font-TenorSans-Regular uppercase">
                                 Submit
                              </Text>
                           </View>
                        </TouchableOpacity>
                     </View>
                  </TouchableWithoutFeedback>
               </View>
            </TouchableWithoutFeedback>
         </Modal>
         <AlertModal
            type="SUCCESS"
            message="Review successfully"
            onClose={() => setIsVisibleSuccess(false)}
            visible={isVisibleSuccess}
         />
         <AlertModal
            type="ERROR"
            message={txtErrorMessage}
            onClose={() => setIsVisibleError(false)}
            visible={isVisibleError}
         />
         {/* <AlertComponent message='' onClose={} visible /> */}
      </View>
   );
}
