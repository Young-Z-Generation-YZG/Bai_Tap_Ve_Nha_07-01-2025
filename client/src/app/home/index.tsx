import {
   FlatList,
   Image,
   ScrollView,
   StyleSheet,
   Text,
   View,
} from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetPostsAsyncQuery } from '~/src/infrastructure/redux/apis/post.api';
import { logger } from 'react-native-logs';
import { router } from 'expo-router';
import HomeLayout from '~/components/layouts/home.layout';
import { Carousel } from 'react-native-ui-lib';
import { images, svgIcons } from '~/constants';
import Icons from '@constants/svg-icons';

// Explain how component is rendered
/**
 * state 1: At first mount, the HomeScreen component will call the useGetPostsAsyncQuery hook to fetch posts from the server. (automatically called by the hook under the hood)
 *  so at the first render, data will be undefined, but "View" is still rendered.
 * state 2: The component will render a View component. (still no data)
 * state 3: data is fetched from the server and the component will re-render with the fetched data. (data is now available)
 */
const HomeScreen = () => {
   var log = logger.createLogger();

   // useEffect(() => {
   //    setTimeout(() => {
   //       router.push('/products');
   //    }, 1000);
   // }, []);

   const {
      data: posts,
      isLoading,
      isFetching,
      isError,
      refetch,
   } = useGetPostsAsyncQuery({});

   if (isLoading) {
      log.debug('Loading data...');
      return (
         <View>
            <Text className="mt-5 text-xl text-center font-TenorSans-Regular">
               Loading...
            </Text>
         </View>
      );
   }

   if (isError) {
      log.error('Error loading data...');
      return (
         <View>
            <Text className="mt-5 text-xl text-center font-TenorSans-Regular">
               Error loading data...
            </Text>
         </View>
      );
   }

   return (
      <SafeAreaView className="w-full">
         <ScrollView>
            <HomeLayout>
               {/* <Text className="mt-5 text-xl text-center font-TenorSans-Regular">
            Home Screen
            </Text> */}
               <View className="w-full my-10 h-fit">
                  <Image
                     source={images.home01}
                     className="w-full h-[600px]"
                     resizeMode="contain"
                  />
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
                        <View
                           key={index}
                           className="h-[300px] w-full bg-red-300"
                        >
                           <Text>Card: {index}</Text>
                           {/* <ProductItemCard/> */}
                        </View>
                     ))}
                  </Carousel>
               </View>
               {/* <FlatList
              className="h-full px-5 mt-5"
              data={posts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View className="mb-3 bg-primary">
                  <Text className="mb-2 font-Poppins-Regular">
                    Title: {item.title}
                  </Text>
                  <Text className="font-TenorSans-Regular">Content: {item.body}</Text>
                </View>
              )}
            /> */}

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
                           source={images.footer01}
                           className="w-[180px] h-[180px]"
                           resizeMode="contain"
                        />
                        <Image
                           source={images.footer02}
                           className="w-[180px] h-[180px]"
                           resizeMode="contain"
                        />
                     </View>
                     <View className="flex flex-row justify-center gap-4">
                        <Image
                           source={images.footer03}
                           className="w-[180px] h-[180px]"
                           resizeMode="contain"
                        />
                        <Image
                           source={images.footer04}
                           className="w-[180px] h-[180px]"
                           resizeMode="contain"
                        />
                     </View>
                  </View>
               </View>
            </HomeLayout>
         </ScrollView>
      </SafeAreaView>
   );
};

export default HomeScreen;

const styles = StyleSheet.create({});
