import '~/global.css';
import React from 'react';
import { Tabs } from "expo-router";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export default function RootLayout() {
   
   return (
      <Tabs
         initialRouteName='home'
         screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "#888",
            tabBarStyle: {
               backgroundColor: "#000",
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
            name="cart"
            options={{
               headerShown: false,
               tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="bell" color={color} size={24} />
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
