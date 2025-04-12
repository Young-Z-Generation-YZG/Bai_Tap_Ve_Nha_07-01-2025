import { Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthLayout from '~/components/layouts/auth.layout';
import { Link } from 'expo-router';

const ForgetPasswordScreen = () => {
   return (
      <AuthLayout className="">
         <SafeAreaView>
            <View className="h-screen w-full flex justify-start items-center px-7">
               <Text>FORGET PASSWORD SCREEN</Text>
               <Link href={'profile'}>GO TO PROFILE</Link>
               <Link href={'verify'}>GO TO VERIFY</Link>
            </View>
         </SafeAreaView>
      </AuthLayout>
   );
};

export default ForgetPasswordScreen;
