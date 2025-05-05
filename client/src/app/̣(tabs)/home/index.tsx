import {
   Image,
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import HomeLayout from '~/components/layouts/home.layout';
import { Carousel } from 'react-native-ui-lib';
import { images, svgIcons } from '~/constants';
import Icons from '@constants/svg-icons';
import { useGetProductsAsyncQuery } from '~/src/infrastructure/redux/apis/product.api';
import { ProductItemType } from '~/src/infrastructure/types/product.type';
import ProductItem from '@components/ui/product-item';
import { useGetNotificationsAsyncQuery } from '~/src/infrastructure/redux/apis/notification.api';
import { InvoiceNotificationType, ReviewNotificationType } from '~/src/infrastructure/types/notification.type';
import { addNotification } from '~/src/infrastructure/redux/features/app/notification.slice';
import { useDispatch } from 'react-redux';

const HomeScreen = () => {

   const dispatch = useDispatch();
   
   const { data: productsResponse } = useGetProductsAsyncQuery({_page: 1, _limit: 10,});
   
   const [products, setProducts] = useState<ProductItemType[]>()

   useEffect(() => {
      if (productsResponse?.data.items) {
         setProducts(productsResponse.data.items)
      }
   },[])

   const { data: notificationsData } = useGetNotificationsAsyncQuery({ _page: 1, _limit: 100 });

   useEffect(() => {
      if (notificationsData?.data?.items) {
         console.log('[HomeScreen]::notificationsData::',notificationsData)
         notificationsData.data.items.forEach(notification => {
            if (notification.type === 'INVOICE' && notification.invoice_info) {
               const data: InvoiceNotificationType = {
                  id: notification._id,
                  recipient: notification.recipient,
                  sender: notification.sender,
                  type: notification.type,
                  isRead: notification.isRead || false,
                  readAt: notification.readAt || null,
                  isDeleted: notification.isDeleted || false,
                  createdAt: notification.createdAt,
                  invoice_info: {
                     label: notification.invoice_info.label,
                     message: notification.invoice_info.message,
                     invoice_id: notification.invoice_info.invoice_id,
                     invoice_code: notification.invoice_info.invoice_code,
                     customer_id: notification.invoice_info.customer_id,
                     customer_name: notification.invoice_info.customer_name,
                     amount: notification.invoice_info.amount,
                     unit: notification.invoice_info.unit,
                     status: notification.invoice_info.status,
                  }
               };
               dispatch(addNotification(data));
            }
            if (notification.type === 'REVIEW' && notification.review_info) {
               const data: ReviewNotificationType = {
                  id: notification._id,
                  recipient: notification.recipient,
                  sender: notification.sender,
                  type: notification.type,
                  isRead: notification.isRead,
                  readAt: notification.readAt,
                  isDeleted: notification.isDeleted,
                  createdAt: notification.createdAt,
                  review_info: {
                     label: notification.review_info.label,
                     message: notification.review_info.message,
                     content: notification.review_info.content,
                     customer_name: notification.review_info.customer_name,
                     invoice_code: notification.review_info.invoice_code,
                     product_id: notification.review_info.product_id,
                     product_image: notification.review_info.product_image,
                     product_name: notification.review_info.product_name,
                     rating: notification.review_info.rating,
                     review_id: notification.review_info.review_id,
                     user_id: notification.review_info.user_id,
                  }
               };
               dispatch(addNotification(data));
            }
         });
      }
   }, [notificationsData])
            

   return (
      <ScrollView>
         <HomeLayout>
            <View className="w-full h-fit relative">
               <Image
                  source={images.home01}
                  className="w-full h-[656px]"
                  resizeMode="contain"
               />
               <View className="w-full absolute bottom-5 flex items-center">
                  <TouchableOpacity
                     onPress={() => router.push('/products')}
                     className="w-[250px] px-5 py-5 bg-[#8B8D90] opacity-80"
                  >
                     <Text className="text-lg font-TenorSans-Regular text-white text-center">
                        EXPLORE COLLECTION
                     </Text>
                  </TouchableOpacity>
               </View>
            </View>

            <View className="w-full my-10 h-fit">
               <Text className="text-2xl text-center uppercase font-TenorSans-Regular">
                  Just for you
               </Text>
               <View className="border-b border-gray-400 mx-[120px] mt-3 mb-10" />

               <Carousel
                  autoplay
                  animated
                  pageWidth={300}
                  itemSpacings={10}
                  containerMarginHorizontal={40}
                  initialPage={0}
                  pageControlPosition={Carousel.pageControlPositions.UNDER}
               >
                  {
                     products && products.length > 0 &&
                     products.map((item, index) => (
                        <TouchableOpacity
                           key={index}
                           onPress={() => {
                              router.push(`/products/${item.product_slug}`);
                           }}
                        >
                           <ProductItem
                              id={item._id}
                              title={item.product_name}
                              description="description"
                              price={item.product_price}
                              imageUrl={item.product_imgs[0].secure_url}
                              slug={item.product_slug}
                              category={item.product_category.category_name}
                              brand={item.product_brand}
                           />
                        </TouchableOpacity>
                     ))
                  }
               </Carousel>
            </View>

            <View className="bg-[#F7F7F7] py-6 flex flex-col items-center gap-4">
               <View className="w-full flex items-center px-[45px]">
                  <svgIcons.LogoIcon width={120} height={60} />
                  <Text className="mt-3 text-lg leading-7 tracking-tighter text-center font-TenorSans-Regular">
                     Making a luxurious lifestyle accessible for a generous
                     group of women is our daily drive.
                  </Text>
               </View>

               <Icons.SeparateLine />

               <View className="flex flex-col w-full gap-5 px-4">
                  <View className="flex flex-row w-full gap-5">
                     <View className="flex flex-col items-center flex-1">
                        <svgIcons.ShippingIcon width={60} height={60} />
                        <Text className="text-base text-center font-TenorSans-Regular">
                           Fast shipping. Free on orders over $25.
                        </Text>
                     </View>
                     <View className="flex flex-col items-center flex-1">
                        <svgIcons.SustainableIcon width={60} height={60} />
                        <Text className="text-base text-center font-TenorSans-Regular">
                           Sustainable process from start to finish.
                        </Text>
                     </View>
                  </View>
                  <View className="flex flex-row w-full gap-5">
                     <View className="flex flex-col items-center flex-1">
                        <svgIcons.UniqueDesignIcon width={60} height={60} />
                        <Text className="text-base text-center font-TenorSans-Regular">
                           Unique designs and high-quality materials.
                        </Text>
                     </View>
                     <View className="flex flex-col items-center flex-1">
                        <svgIcons.FastShippingIcon width={60} height={60} />
                        <Text className="text-base text-center font-TenorSans-Regular">
                           Fast shipping. Free on orders over $25.
                        </Text>
                     </View>
                  </View>
               </View>
            </View>

            <View className="w-full mt-10">
               <Text className="text-3xl text-center font-TenorSans-Regular">
                  FOLLOW US
               </Text>
               {/* 4 pictures */}
               <View className="flex flex-col w-full gap-4 mt-4">
                  <View className="flex flex-row justify-center gap-4">
                     <Image
                        source={images.followUs01}
                        className="w-[180px] h-[180px]"
                        resizeMode="contain"
                     />
                     <Image
                        source={images.followUs02}
                        className="w-[180px] h-[180px]"
                        resizeMode="contain"
                     />
                  </View>
                  <View className="flex flex-row justify-center gap-4">
                     <Image
                        source={images.followUs03}
                        className="w-[180px] h-[180px]"
                        resizeMode="contain"
                     />
                     <Image
                        source={images.followUs04}
                        className="w-[180px] h-[180px]"
                        resizeMode="contain"
                     />
                  </View>
               </View>
            </View>
         </HomeLayout>
      </ScrollView>
   );
};

export default HomeScreen;

const styles = StyleSheet.create({});
