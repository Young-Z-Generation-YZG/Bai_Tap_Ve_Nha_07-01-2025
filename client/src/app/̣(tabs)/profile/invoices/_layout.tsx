import 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import React from 'react';

export default function InvoicesLayout() {
   return (
      <Stack
         screenOptions={{
            headerShown: false,
         }}
      ></Stack>
   );
}
