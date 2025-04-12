import {
   StyleSheet,
   Text,
   TextInput,
   TouchableOpacity,
   View,
} from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerHeaderProps } from '@react-navigation/drawer';
import Icons from '@constants/svg-icons';
import { router } from 'expo-router';
import { cn } from '~/lib/utils';
import { useAppSelector } from '~/src/infrastructure/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchOpened } from '~/src/infrastructure/redux/features/app/search.slice';

export type HeaderProps = DrawerHeaderProps & {
   containerStyles?: string;
   handleToggleDrawer?: () => void;
};

const Header = (props: HeaderProps) => {
   const { top, bottom } = useSafeAreaInsets();
   const [searchQuery, setSearchQuery] = useState('');
   // const [isOpened, setIsOpened] = useState(false);

   const cart = useAppSelector((state) => state.cart);

   const dispatch = useDispatch();
   const isOpened = useAppSelector((state) => state.search.isOpened);

   return (
      <View
         className={cn(
            'pt-[59px] pb-3 bg-white h-[100px] flex items-center justify-center',
            props.containerStyles,
         )}
      >
         <View className="flex flex-row items-center justify-between w-full px-5">
            <TouchableOpacity onPress={props.handleToggleDrawer}>
               <Icons.MenuIcon />
            </TouchableOpacity>

            <Icons.LogoIcon width={100} height={30} />

            <View className="flex flex-row gap-4">
               <TouchableOpacity
                  onPress={() => {
                     dispatch(setSearchOpened(!isOpened));
                  }}
               >
                  <Icons.SearchIcon />
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => {
                     router.push('cart');
                  }}
                  className=" relative"
               >
                  {cart.totalQuantity > 0 ? (
                     <View className="absolute z-10 w-5 h-5 -right-3 -top-1 rounded-full bg-red-600 justify-center items-center  ">
                        <Text className="text-white text-sm">
                           {cart.totalQuantity}
                        </Text>
                     </View>
                  ) : (
                     ''
                  )}
                  <Icons.ShoppingBagIcon />
               </TouchableOpacity>
            </View>
         </View>
      </View>
   );
};

export default Header;
