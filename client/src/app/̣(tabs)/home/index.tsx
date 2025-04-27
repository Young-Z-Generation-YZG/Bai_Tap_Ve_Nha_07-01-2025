import {
   FlatList,
   Image,
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from 'react-native';
import React, { useEffect } from 'react';
import { logger } from 'react-native-logs';
import { router } from 'expo-router';
import HomeLayout from '~/components/layouts/home.layout';
import { Carousel } from 'react-native-ui-lib';
import { images, svgIcons } from '~/constants';
import Icons from '@constants/svg-icons';
import Button from '@components/ui/Button';
import { useAppSelector } from '~/src/infrastructure/redux/store';

const HomeScreen = () => {
   var log = logger.createLogger();

   const { accessToken, isAuthenticated, user } = useAppSelector(
      (state) => state.auth,
   );

   useEffect(() => {
      console.log('============================================');
      log.debug('[HomeScreen]::accessToken', accessToken);
      log.debug('[HomeScreen]::isAuthenticated', isAuthenticated);
   }, [accessToken, isAuthenticated]);

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
                  // autoplay
                  // animated
                  pageWidth={300}
                  itemSpacings={10}
                  containerMarginHorizontal={40}
                  initialPage={0}
                  pageControlPosition={Carousel.pageControlPositions.UNDER}
               // allowAccessibleLayout
               // className="bg-green-200"
               >
                  {Array.from({ length: 10 }).map((_, index) => (
                     <View key={index} className="h-[300px] w-full bg-red-300">
                        <Text>Card: {index}</Text>
                        {/* <ProductItemCard/> */}
                     </View>
                  ))}
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
