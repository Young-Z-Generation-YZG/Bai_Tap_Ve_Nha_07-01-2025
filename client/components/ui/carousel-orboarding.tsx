import {
   View,
   ScrollView,
   StyleSheet,
   Dimensions,
   TouchableOpacity,
   Text,
} from 'react-native';
import React, { useRef, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

type CarouselItemsProps = {
   items: React.ReactNode[];
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH; // Same as card width in styles

const CarouselOnboarding = ({ items }: CarouselItemsProps) => {
   const [activeIndex, setActiveIndex] = useState(0);
   const scrollViewRef = useRef<ScrollView>(null);

   const handleScroll = (event: any) => {
      const contentOffsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(contentOffsetX / CARD_WIDTH);
      setActiveIndex(index);
   };

   const goToSlide = (index: number) => {
      if (index >= 0 && index < items.length) {
         scrollViewRef.current?.scrollTo({
            x: index * CARD_WIDTH,
            animated: true,
         });
         setActiveIndex(index);
      }
   };

   return (
      <View style={styles.container}>
         <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}
            snapToInterval={CARD_WIDTH}
            decelerationRate="fast"
            onScroll={handleScroll}
            scrollEventThrottle={100}
         >
            {items.map((item, index) => (
               <View key={index} style={styles.card}>
                  {item}
               </View>
            ))}
         </ScrollView>

         {/* Indicators */}
         <View style={styles.indicatorContainer}>
            {items.map((_, index) => (
               <View
                  key={index}
                  style={[
                     styles.indicator,
                     activeIndex === index ? styles.activeIndicator : null,
                  ]}
               />
            ))}
         </View>

         {/* Navigation Buttons */}
         <View className="absolute bottom-3 right-3">
            {/*  */}
            {activeIndex === items.length - 1 ? (
               <></>
            ) : (
               <TouchableOpacity
                  onPress={() => goToSlide(activeIndex + 1)}
                  style={[
                     styles.button,
                     activeIndex === items.length - 1 && styles.disabledTouch,
                  ]}
                  // disabled={activeIndex === items.length - 1}
               >
                  <Text className="text-black font-TenorSans-Regular text-xl">
                     Next
                  </Text>
               </TouchableOpacity>
            )}
         </View>
      </View>
   );
};

// Tailwind-like styles
const styles = StyleSheet.create({
   container: {
      flex: 1,
      width: SCREEN_WIDTH, // Fits screen width
      position: 'relative',
   },
   scrollView: {
      width: SCREEN_WIDTH,
   },
   card: {
      width: CARD_WIDTH, // w-72
   },
   indicatorContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 12, // mt-3
      marginBottom: 12,
   },
   indicator: {
      width: 8, // w-2
      height: 8, // h-2
      borderRadius: 4, // rounded-full
      backgroundColor: '#000', // bg-gray-300
      marginHorizontal: 8, // mx-1
   },
   activeIndicator: {
      backgroundColor: '#fff', // bg-gray-800
      width: 12, // w-3
   },
   button: {
      backgroundColor: '#fff',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
   },
   disabledTouch: {
      backgroundColor: '#ccc',
   },
});

export default CarouselOnboarding;
