import 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import React from 'react';

export default function ProfileDetailLayout() {
   return (
      <Stack
         screenOptions={{
            headerShown: false,
         }}
      ></Stack>
   );
}
