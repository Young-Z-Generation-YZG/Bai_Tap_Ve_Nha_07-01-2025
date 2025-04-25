import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const VouchersLayout = () => {
   return (
      <Stack
         screenOptions={{
            headerShown: false,
         }}
      ></Stack>
   );
};

export default VouchersLayout;
