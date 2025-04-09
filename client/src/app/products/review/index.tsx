import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import FeatherIcon from 'react-native-vector-icons/Feather';
import CartItem from '@components/ui/cart-item';
import { router, useLocalSearchParams } from 'expo-router';
import CommonLayout from '@components/layouts/common.layout';
import { useAppSelector } from "~/src/infrastructure/redux/store";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ProductLayout from '@components/layouts/product.layout';
import Icons from '@constants/svg-icons'

import images from '@constants/images' 
import { useGetReviewsByProductIdAsyncQuery } from '~/src/infrastructure/redux/apis/review.api';
import { skipToken } from '@reduxjs/toolkit/query';
import ReviewItem from '@components/ui/review-item';

const ReviewScreen = () => {
   const { productID } = useLocalSearchParams();

   // console.log('productID: ', productID);

   // const [reviewData, setReviewData] = useState({
   //    total: 100,
   //    averageRating: 4.3,
   // });

   const {
      data: reviewsResponse,
   } = useGetReviewsByProductIdAsyncQuery( 
      typeof productID === 'string' ? 
      productID 
      : 
      skipToken
   );
   
   // console.log(reviewsResponse?.data);

   const renderAverageStars = (value:number) => {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
         if (i <= value) {
            // Ex: index < 4.5 => fill full star with yellow
            stars.push(<Icons.StarReviewIcon key={i} fill="#FFD700" />);
         } else if (i - value < 1) {
            // Ex: 4.5 % 1 => 0.5 => fill 50% star with yellow
            const percentage = (value % 1) * 100;
            stars.push(
               <View key={i} className='relative flex justify-center items-center' >
                  <Icons.StarReviewIcon fill="#E0E0E0" />
                  <View className='absolute top-0 left-0 h-[100%] overflow-hidden'
                     style={{
                        width: `${percentage}%`,
                     }}
                  >
                     <Icons.StarReviewIcon fill="#FFD700" />
                  </View>
               </View>
            );
         } else {
            stars.push(<Icons.StarReviewIcon key={i} fill="#E0E0E0" />);
         }
      }
      return stars;
   };

   const renderStars = (count:number) => {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
         if (i <= count) {
            stars.push(<Icons.StarReviewIcon key={i} fill="#FFD700" width="20px" height="20px"/>);
         } else {
            stars.push(<Icons.StarReviewIcon key={i} fill="#E0E0E0" width="20px" height="20px"/>);
         } 
      }
      return stars;
   };

   return (
      <ProductLayout>
         <View className="flex w-full mt-5 px-5">

            <View className='flex items-center mb-6'>
               <Text className='text-[30px] font-TenorSans-Regular'>REVIEWS</Text>
            </View>

            <View className="flex flex-row gap-5 pl-5 mb-10 ">
               <Text className="text-[50px] font-TenorSans-Regular">{reviewsResponse?.data.metadata.averageRating}</Text>
               <View className="flex flex-col gap-2">
                  <View className="flex flex-row">
                     {renderAverageStars(reviewsResponse?.data.metadata.averageRating ?? 0)}
                  </View>
                  <Text className="text-[16px] font-TenorSans-Regular">{reviewsResponse?.data.metadata.total} Reviews</Text>
               </View>
            </View>

            <View className="flex-1 flex flex-col">
               {reviewsResponse?.data?.reviews && reviewsResponse.data.reviews.length > 0 ? (
                  reviewsResponse.data.reviews.map((review, index) => (
                     <ReviewItem
                        key={review._id}
                        _id={review._id}
                        review_content={review.review_content}
                        review_invoice={review.review_invoice}
                        review_product={review.review_product}
                        review_rating={review.review_rating}
                        review_user={review.review_user}
                     />
                  ))
               ) : (
                  <></>
               )}
            </View>

         </View>
      </ProductLayout>
   );
};

export default ReviewScreen;