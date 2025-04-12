import { View, Text, ScrollView } from 'react-native';
import React, { ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const AuthLayout = ({
   className,
   children,
}: {
   children: React.ReactNode;
   className?: string;
}) => {
   return (
      <View className={`flex-1 bg-white ${className}`}>
         <SafeAreaView>
            <ScrollView>{children}</ScrollView>
         </SafeAreaView>
      </View>
   );
};

export default AuthLayout;
