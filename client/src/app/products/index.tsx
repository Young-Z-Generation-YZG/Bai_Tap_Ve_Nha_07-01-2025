import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import ProductLayout from '~/components/layouts/product.layout';
import ProductItem from '@components/ui/product-item';
import { router } from 'expo-router';
import { useGetProductsAsyncQuery } from '~/src/infrastructure/redux/apis/product.api';
import { logger } from 'react-native-logs';
import { ProductItemType } from '~/src/infrastructure/types/product.type';
import LoadingOverlay from '@components/ui/LoadingOverlay';

var log = logger.createLogger();

// Reusable Loading Component
const LoadingState = () => (
   <View style={styles.stateContainer}>
      <Text style={styles.stateText}>Loading...</Text>
   </View>
);

// Reusable Error Component
const ErrorState = () => (
   <View style={styles.stateContainer}>
      <Text style={styles.errorText}>Error loading data...</Text>
   </View>
);

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

   // Handle loading state (initial load or refetching)
   if (isLoading || isFetching) {
      log.debug('Loading data...');
      return <LoadingState />;
   }

   // Handle error state
   if (isError) {
      log.error('Error loading data...');
      return <ErrorState />;
   }

   return (
      <ProductLayout className="">
         <Text className="mb-10">Product Screen</Text>
         <View className="flex flex-row flex-wrap items-center justify-center gap-6">
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
         <LoadingOverlay isLoading={isLoading || isFetching} />
      </ProductLayout>
   );
};

// Tailwind-like styles
const styles = StyleSheet.create({
   layout: {
      flex: 1,
      paddingHorizontal: 16, // px-4
      paddingVertical: 20, // py-5
      backgroundColor: '#f9fafb', // bg-gray-50
   },
   title: {
      fontSize: 24, // text-2xl
      fontWeight: '600', // font-semibold
      color: '#1f2937', // text-gray-800
      marginBottom: 40, // mb-10
      textAlign: 'center',
   },
   productGrid: {
      flexDirection: 'row', // flex flex-row
      flexWrap: 'wrap', // flex-wrap
      justifyContent: 'center', // justify-center
      gap: 24, // gap-6 (approximated with margin)
   },
   productItem: {
      width: '45%', // w-[45%] for two columns
      marginBottom: 24, // mb-6
      backgroundColor: '#ffffff', // bg-white
      borderRadius: 8, // rounded-lg
      shadowColor: '#000', // shadow
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
   },
   stateContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   stateText: {
      fontSize: 20, // text-xl
      color: '#1f2937', // text-gray-800
      fontFamily: 'TenorSans-Regular',
      marginTop: 20, // mt-5
   },
   errorText: {
      fontSize: 20, // text-xl
      color: '#ef4444', // text-red-500
      fontFamily: 'TenorSans-Regular',
      marginTop: 20, // mt-5
   },
   noDataText: {
      fontSize: 16, // text-base
      color: '#6b7280', // text-gray-500
      textAlign: 'center',
      marginTop: 20, // mt-5
   },
});

export default ProductScreen;
