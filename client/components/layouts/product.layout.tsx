import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import Footer from '@components/Footer';
import { cn } from '~/lib/utils';
import { useAppSelector } from '~/src/infrastructure/redux/store';
import Search from '@components/ui/Search';

export default function ProductLayout({
   children,
   className,
}: {
   children: React.ReactNode;
   className?: string;
}) {
   const isOpened = useAppSelector((state) => state.search.isOpened);

   return (
      <View className={cn(' bg-white', className)}>
         <ScrollView>
            {isOpened && <Search />}
            {children}
            <Footer />
         </ScrollView>
      </View>
   );
}
