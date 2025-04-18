import { View, Text } from 'react-native';
import React, { ReactNode } from 'react';
import Footer from '~/components/Footer';

const HomeLayout = ({
   className,
   children,
}: {
   children: React.ReactNode;
   className?: string;
}) => {
   return (
      <View className={`flex-1 bg-white ${className}`}>
         {children}
         <Footer />
      </View>
   );
};

export default HomeLayout;
