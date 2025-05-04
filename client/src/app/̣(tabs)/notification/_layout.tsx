import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import Header from '@components/Header';
import { Dimensions } from 'react-native';
import DrawerContent from '@components/ui/drawer-content';

// Get screen width
const { width } = Dimensions.get('window');

const NotificationLayout = () => {
   return (
      <GestureHandlerRootView style={{ flex: 1, marginBottom: 50}}>
         <Drawer
            screenOptions={{
               headerShown: true,
               header: (props) => (
                  <Header
                     {...props}
                     containerStyles="bg-[#FFF]"
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
            drawerContent={(props) => <DrawerContent {...props} />}
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

export default NotificationLayout;
