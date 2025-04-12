import images from '@constants/images';
import Icons from '@constants/svg-icons';
import React from 'react';
import { Image, Text } from 'react-native';
import { View } from 'react-native';
import { ReviewItemType } from '~/src/infrastructure/types/review.type';

export default function ReviewItem(props: ReviewItemType) {
   console.log('props', props.review_content);

   const renderStars = (count: number) => {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
         if (i <= count) {
            stars.push(
               <Icons.StarReviewIcon
                  key={i}
                  fill="#FFD700"
                  width="20px"
                  height="20px"
               />,
            );
         } else {
            stars.push(
               <Icons.StarReviewIcon
                  key={i}
                  fill="#E0E0E0"
                  width="20px"
                  height="20px"
               />,
            );
         }
      }
      return stars;
   };

   return (
      <View
         key={props._id}
         className="h-[100px] w-[100%] flex flex-row gap-4 pr-3 mb-10 bg-white px-3 py-2 rounded-lg"
         style={{
            shadowColor: '#000',
            elevation: 15,
            shadowOffset: {
               width: 1,
               height: 30,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
         }}
      >
         <View>
            <Image source={images.profile} className="h-12 w-12 rounded-xl" />
         </View>

         <View className="flex-1 flex flex-col gap-2">
            <View className="flex flex-row justify-between ">
               <View className="flex flex-col gap-1">
                  <Text className="text-[20px] font-TenorSans-Regular">
                     {props.review_user.email}
                  </Text>
                  <Text className="text-[14px] font-TenorSans-Regular text-[#888]">
                     DD/MM/YYYY
                  </Text>
               </View>
               <View className="flex flex-row pt-1">
                  {renderStars(props.review_rating)}
               </View>
            </View>

            <View>
               <Text className="text-[14px] font-TenorSans-Regular">
                  {props.review_content}
               </Text>
            </View>
         </View>
      </View>
   );
}
