import { ScrollView, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthLayout from '@components/layouts/auth.layout';
import { useForm } from 'react-hook-form';
import { InputField } from '~/components/ui/input-field';
import Button from '~/components/ui/Button';
import { Link, router, Stack } from 'expo-router';
import { Image } from 'react-native';
import { images, svgIcons } from '~/constants';
import {
   ProfileFormType,
   ProfileResolver,
} from '~/src/domain/schemas/auth.schema';

const defaultValues: ProfileFormType = {
   first_name: 'Tran',
   last_name: 'Phuong',
};

const ProfileScreen = () => {
   const form = useForm<ProfileFormType>({
      resolver: ProfileResolver,
      defaultValues: defaultValues,
   });

   const onSubmit = (data: any) => console.log(data);
   return (
      <AuthLayout className="">
         <SafeAreaView>
            <ScrollView
               contentContainerStyle={{
                  height: '100%',
               }}
            >
               <View className="h-screen w-full flex justify-start items-center px-7">
                  <View className="w-full flex justify-center items-center my-7">
                     <Image
                        source={images.profile}
                        className="w-auto h-[150px]"
                        resizeMode="contain"
                     />
                  </View>
                  <Text className="w-full text-center text-3xl font-Poppins-SemiBold">
                     PROFILE
                  </Text>
                  <View className="w-full flex gap-6 mt-5">
                     <View className="flex flex-col gap-5">
                        <InputField<ProfileFormType>
                           name="first_name"
                           form={form}
                           type="text"
                           required
                           placeholder="First Name"
                           className="font-TenorSans-Regular"
                           errorStyles="text-sm"
                           Icon={svgIcons.MailIcon}
                        />
                        <InputField<ProfileFormType>
                           name="last_name"
                           form={form}
                           type="text"
                           required
                           placeholder="Last Name"
                           className="font-TenorSans-Regular"
                           errorStyles="text-sm"
                           Icon={svgIcons.MailIcon}
                        />
                     </View>
                     {/* <InputField
                name="email"
                control={control}
                placeholder="Email"
                placeholderTextColor="#999"
                containerStyles="border-0 border-b-2 border-gray-200 rounded-none"
                className="text-xl font-TenorSans-Regular"
                errorStyles="text-sm"
              /> */}
                  </View>
                  <View className="w-full flex gap-6 mt-10">
                     <Button
                        title="Update Profile"
                        className="bg-black"
                        textStyles="text-white text-center text-xl font-TenorSans-Regular m-2"
                        onPress={form.handleSubmit(onSubmit)}
                     />
                     <Button
                        title="wishlist"
                        className="bg-gray-400"
                        textStyles="text-white text-center text-xl font-TenorSans-Regular m-2"
                        onPress={() => router.push('wishlist')}
                     />
                     <Button
                        title="invoices"
                        className="bg-gray-400"
                        textStyles="text-white text-center text-xl font-TenorSans-Regular m-2"
                        onPress={() => router.push('profile/invoices')}
                     />
                     <Button
                        title="Change Address Info"
                        className="bg-gray-400"
                        textStyles="text-white text-center text-xl font-TenorSans-Regular m-2"
                        onPress={form.handleSubmit(onSubmit)}
                     />
                  </View>
               </View>
            </ScrollView>
         </SafeAreaView>
      </AuthLayout>
   );
};

export default ProfileScreen;
