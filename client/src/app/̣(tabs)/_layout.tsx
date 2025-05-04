import '~/global.css';
import React, { useEffect } from 'react';
import { Tabs } from "expo-router";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { useAppSelector } from '~/src/infrastructure/redux/store';

export default function RootLayout() {
   const { total } = useAppSelector( state => state.notification);
   
   return (
      <Tabs
         initialRouteName='home'
         screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#DD8560",
            tabBarInactiveTintColor: "#888",
            tabBarStyle: {
               backgroundColor: "#f3f4f6",
               // marginHorizontal: 10,
               // marginVertical: 5,
               // borderRadius: 10,
               borderTopLeftRadius: 10,
               borderTopRightRadius: 10,
               height: 50,
               position:"absolute",
               paddingTop:5
            },
         }}
      >
         <Tabs.Screen
            name="home"
            options={{
               headerShown: false,
               tabBarIcon: ({ color, focused }) => (
                  <MaterialCommunityIcons name="home" color={color} size={24} />
               ),
            }}
         />
         <Tabs.Screen
            name="products"
            options={{
               headerShown: false,
               tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="tshirt-crew" color={color} size={24} />
               ),
            }}
         />
         <Tabs.Screen
            name="notification"
            options={{
               headerShown: false,
               tabBarIcon: ({ color }) => (
                  <View>
                     <MaterialCommunityIcons name="bell" color={color} size={24} />
                     <View className='absolute -top-1 -right-2 w-5 h-5 rounded-full bg-red-500 justify-center items-center'>
                        <Text className='text-xs text-white'>{total}</Text>
                     </View>
                  </View>
                 
               ),
            }}
         />
         <Tabs.Screen
            name="profile"
            options={{
               headerShown: false,
               tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="account-circle" color={color} size={24} />
               ),
            }}
         />
         
      </Tabs>
   );
}
