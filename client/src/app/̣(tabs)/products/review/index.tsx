import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import FeatherIcon from 'react-native-vector-icons/Feather';
import CartItem from '@components/ui/cart-item';
import { router, useLocalSearchParams } from 'expo-router';
import CommonLayout from '@components/layouts/common.layout';
import { useAppSelector } from '~/src/infrastructure/redux/store';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductLayout from '@components/layouts/product.layout';
import Icons from '@constants/svg-icons';

import images from '@constants/images';
import { useGetReviewsByProductIdAsyncQuery } from '~/src/infrastructure/redux/apis/review.api';
import { skipToken } from '@reduxjs/toolkit/query';
import ReviewItem from '@components/ui/ReviewItem';

const ReviewScreen = () => {
   const { productID } = useLocalSearchParams();

   const { data: reviewsResponse } = useGetReviewsByProductIdAsyncQuery(
      typeof productID === 'string'
         ? { productId: productID, _limit: 10, _page: 1 }
         : skipToken,
   );

   const onRenderAverageStars = (value: number) => {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
         if (i <= value) {
            stars.push(<Icons.StarReviewIcon key={i} fill="#FFD700" />);
         } else if (i - value < 1) {
            const percentage = (value % 1) * 100;
            stars.push(
               <View
                  key={i}
                  className="relative flex justify-center items-center"
               >
                  <Icons.StarReviewIcon fill="#E0E0E0" />
                  <View
                     className="absolute top-0 left-0 h-[100%] overflow-hidden"
                     style={{
                        width: `${percentage}%`,
                     }}
                  >
                     <Icons.StarReviewIcon fill="#FFD700" />
                  </View>
               </View>,
            );
         } else {
            stars.push(<Icons.StarReviewIcon key={i} fill="#E0E0E0" />);
         }
      }
      return stars;
   };

   return (
      <ProductLayout>
         <View className="flex w-full mt-5 px-5">
            <View className="flex items-center mb-6">
               <Text className="text-[30px] font-TenorSans-Regular">
                  REVIEWS
               </Text>
            </View>

            <View className="flex flex-row gap-5 pl-5 mb-10 ">
               <Text className="text-[50px] font-TenorSans-Regular">4.5</Text>
               <View className="flex flex-col gap-2">
                  <View className="flex flex-row">
                     {/* {renderAverageStars(reviewsResponse?.data.meta.averageRating ?? 0)} */}
                     {onRenderAverageStars(4.5)}
                  </View>
                  <Text className="text-[16px] font-TenorSans-Regular">
                     {reviewsResponse?.data.meta.totalItems} Reviews
                  </Text>
               </View>
            </View>

            <View className="flex-1 flex flex-col">
               {
                  reviewsResponse?.data?.reviews && reviewsResponse.data.reviews.length > 0 ? (
                  // reviewsResponse.data.reviews.map((review, index) => (
                  //    <ReviewItem
                  //       key={review._id}
                  //       _id={review._id}
                  //       review_content={review.review_content}
                  //       review_invoice={review.review_invoice}
                  //       review_product={review.review_product}
                  //       review_rating={review.review_rating}
                  //       review_user={review.review_user}
                  //    />
                  // ))
                     <FlatList 
                        data={reviewsResponse.data.reviews}
                        renderItem={({item: review}) => (
                           <ReviewItem
                              key={review._id}
                              _id={review._id}
                              review_content={review.review_content}
                              review_invoice={review.review_invoice}
                              review_product={review.review_product}
                              review_rating={review.review_rating}
                              review_user={review.review_user}
                           />
                        )}
                     />
                  ) : (
                     <></>
                  )
               }
            </View>
         </View>
      </ProductLayout>
   );
};

export default ReviewScreen;
