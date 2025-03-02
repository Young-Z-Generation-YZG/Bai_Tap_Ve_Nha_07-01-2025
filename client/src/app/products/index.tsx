import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import ProductLayout from '~/components/layouts/product.layout';
import ProductItem from '@components/ui/product-item';
import { router } from 'expo-router';
import { useGetProductsAsyncQuery } from '~/src/infrastructure/redux/apis/product.api';
import { logger } from 'react-native-logs';
import { ProductItemType } from '~/src/infrastructure/types/product.type';
import LoadingOverlay from '@components/ui/LoadingOverlay';
import IoniIcons from 'react-native-vector-icons/Ionicons';
import AppDropdown from '@components/ui/AppDropdown';

var log = logger.createLogger();

const dropdownItems = [
   {
      id: '1',
      content: <Text style={{ color: '#1f2937' }}>New</Text>,
      onPress: () => console.log('Selected Option 1'),
   },
   {
      id: '2',
      content: <Text style={{ color: '#1f2937' }}>Sales</Text>,
      onPress: () => console.log('Selected Option 2'),
   },
];

const ProductScreen = () => {
   const [productsData, setProductsData] = useState<ProductItemType[]>([]);

   const {
      data: productsResponse,
      isLoading,
      isFetching,
      isError,
      refetch,
   } = useGetProductsAsyncQuery();

   // Log the API response for debugging
   React.useEffect(() => {
      if (productsResponse) {
         setProductsData(productsResponse.data);
      }
   }, [productsResponse]);

   return (
      <ProductLayout>
         <View className="flex flex-row items-center justify-between px-6 py-5">
            <View>
               <Text className="text-base uppercase font-TenorSans-Regular">
                  8 Result of Dress
               </Text>
            </View>
            <View className="flex flex-row gap-2">
               {/* <AppDropdown */}
               <View className="w-[80px]">
                  <AppDropdown
                     items={dropdownItems}
                     placeholder="New"
                     containerStyles="rounded-full"
                     TextStyles="text-base"
                     iconSize={20}
                  />
               </View>
               <TouchableOpacity className="p-3 w-[42px] bg-[#F9F9F9] rounded-full">
                  <IoniIcons name="list-outline" size={22} color="#83838F" />
               </TouchableOpacity>
               <TouchableOpacity className="p-3 w-[42px] bg-[#F9F9F9] rounded-full">
                  <IoniIcons name="filter-outline" size={22} color="#DD8560" />
               </TouchableOpacity>
            </View>
         </View>

         <View>
            <View className="flex-row flex-wrap items-center justify-center gap-6 ">
               {productsData.map((item, index) => {
                  return (
                     <TouchableOpacity
                        key={index}
                        onPress={() => {
                           router.push('/products/lamerei');
                        }}
                     >
                        <ProductItem
                           title="lamerei"
                           description="reversible angora cardigan"
                           price={120}
                           imageUrl="https://res.cloudinary.com/djiju7xcq/image/upload/v1729839380/Sunflower-Jumpsuit-1-690x875_dibawa.webp"
                        />
                     </TouchableOpacity>
                  );
               })}
            </View>
         </View>

         <LoadingOverlay isLoading={isLoading || isFetching} />
      </ProductLayout>
   );
};

export default ProductScreen;
