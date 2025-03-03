import { View, Text, TouchableOpacity } from 'react-native';
import React, { useCallback, useState } from 'react';
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
   const [page, setPage] = useState(1);
   const [limit, setLimit] = useState(4);
   const [totalItems, setTotalItems] = useState<number | null>(null); // Store totalItems from meta

   const {
      data: productsResponse,
      isLoading,
      isFetching,
      isError,
      refetch,
   } = useGetProductsAsyncQuery({ _page: page, _limit: limit });

   React.useEffect(() => {
      if (productsResponse?.data?.items) {
         // Append new items to existing products
         setProductsData((prev) => [...prev, ...productsResponse.data.items]);
         // Set totalItems from meta on first load or when it changes
         if (productsResponse.data.meta?.totalItems !== undefined) {
            setTotalItems(productsResponse.data.meta.totalItems);
         }
      }
   }, [productsResponse]);

   // Handle loading more products when scrolling near the end
   const loadMoreProducts = useCallback(() => {
      if (
         !isFetching &&
         !isError &&
         totalItems !== null &&
         productsData.length < totalItems
      ) {
         setPage((prev) => prev + 1); // Increment page to fetch next set
      }
   }, [isFetching, isError, totalItems, productsData.length]);

   // Handle scroll event to detect end of content
   const handleScroll = useCallback(
      (event: any) => {
         const { layoutMeasurement, contentOffset, contentSize } =
            event.nativeEvent;
         const paddingToBottom = 20; // Trigger slightly before the very end

         // Check if scrolled to the bottom
         if (
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom
         ) {
            loadMoreProducts();
         }
      },
      [loadMoreProducts],
   );

   return (
      <ProductLayout onScroll={handleScroll}>
         <View className="flex flex-row items-center justify-between px-6 py-5">
            <View>
               <Text className="text-base uppercase font-TenorSans-Regular">
                  {totalItems !== null
                     ? `${totalItems} Result of Dress`
                     : 'Loading...'}
               </Text>
            </View>
            <View className="flex flex-row gap-2">
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
            <View className="flex-row flex-wrap items-center justify-center gap-6">
               {productsData.map((item, index) => (
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
               ))}
            </View>
         </View>

         <LoadingOverlay isLoading={isLoading || isFetching} />
      </ProductLayout>
   );
};

export default ProductScreen;
