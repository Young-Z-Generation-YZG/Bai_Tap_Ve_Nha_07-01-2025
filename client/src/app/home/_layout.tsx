import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import Header from '@components/Header';
import { Dimensions } from 'react-native';
import CustomDrawerContent from '@components/ui/custom-drawer-content';

// Get screen width
const { width } = Dimensions.get('window');

const HomeLayout = () => {
   return (
      <GestureHandlerRootView style={{ flex: 1 }}>
         <Drawer
            screenOptions={{
               headerShown: true,
               header: (props) => (
                  <Header
                     {...props}
                     containerStyles="bg-[#E7EBF0]"
                     handleToggleDrawer={() => {
                        props.navigation.toggleDrawer();
                     }}
                  />
               ),
               drawerStyle: {
                  backgroundColor: '#fff',
                  width: width,
               },
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
         >
            <Drawer.Screen
               name="index" // This is the name of the page and must match the url from root
               options={{
                  drawerLabel: 'Home',
                  title: 'overview',
                  headerShown: true,
               }}
            />
         </Drawer>
      </GestureHandlerRootView>
   );
};

export default HomeLayout;
