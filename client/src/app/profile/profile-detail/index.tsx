import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
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
} from '~/src/domain/schemas/profile.schema';
import CommonLayout from '@components/layouts/common.layout';
import {
   Ionicons,
   MaterialIcons,
   FontAwesome,
   MaterialCommunityIcons,
   FontAwesome5,
} from '@expo/vector-icons';


const defaultValues: ProfileFormType = {
   first_name: 'Tran',
   last_name: 'Phuong',
   phone_number: '092345321',
};

const ProfileScreen = () => {
   const form = useForm<ProfileFormType>({
      resolver: ProfileResolver,
      defaultValues: defaultValues,
   });

   const onSubmit = (data: any) => console.log(data);
   return (
      <SafeAreaProvider>
         <SafeAreaView className="flex-1 bg-white">
            <CommonLayout title="Profile Detail">
               <View className="flex-1 justify-start items-center gap-10 px-7">
                  {/* IMAGE PROFILE */}
                  <View className="w-full mt-5 flex justify-center items-center gap-5">
                     <View className="rounded-lg overflow-hidden w-[100px] h-[100px]">
                        <Image
                           source={images.profile}
                           className="w-[100%] h-[100%]"
                           resizeMode="contain"
                        />
                     </View>
                     <Text className="w-full text-center text-xl font-Poppins-SemiBold">
                        Upload image
                     </Text>
                  </View>

                  {/* FORM PROFILE */}
                  <View className="w-full flex gap-6">
                     <View className="flex flex-col gap-5">
                        <View className="flex flex-row h-[40px] items-center justify-between">
                           <Text className="font-TenorSans-Regular text-xl">
                              First name
                           </Text>
                           <InputField<ProfileFormType>
                              name="first_name"
                              form={form}
                              required
                              variant="outline"
                              className="h-[100%] w-[220px] font-TenorSans-Regular m-0 p-0 "
                              errorStyles="text-sm"
                           />
                        </View>
                        <View className="flex flex-row h-[40px] items-center justify-between">
                           <Text className="font-TenorSans-Regular text-xl">
                              Last name
                           </Text>
                           <InputField<ProfileFormType>
                              name="last_name"
                              form={form}
                              required
                              variant="outline"
                              className="h-[100%] w-[220px] font-TenorSans-Regular m-0 p-0 "
                              errorStyles="text-sm"
                           />
                        </View>
                        <View className="flex flex-row h-[40px] items-center justify-between">
                           <Text className="font-TenorSans-Regular text-xl">
                              Phone number
                           </Text>
                           <InputField<ProfileFormType>
                              name="phone_number"
                              form={form}
                              required
                              variant="outline"
                              className="h-[100%] w-[220px] font-TenorSans-Regular m-0 p-0 "
                              errorStyles="text-sm"
                           />
                        </View>
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

                  {/* Menu Options */}
                  <View className="w-full bg-white rounded-2xl border-2 border-gray-300">
                     <TouchableOpacity
                        className="flex-row items-center p-4 border-b border-gray-100"
                        onPress={() => router.push('/profile/profile-detail')}
                     >
                        <View className="w-10 h-10 bg-gray-100 rounded-lg items-center justify-center mr-4">
                           <Ionicons name="person" size={22} color="black" />
                        </View>
                        <Text className="flex-1 text-base font-medium">
                           Personal Details
                        </Text>
                        <Ionicons
                           name="chevron-forward"
                           size={20}
                           color="black"
                        />
                     </TouchableOpacity>
                     <TouchableOpacity
                        className="flex-row items-center p-4 border-b border-gray-100"
                        onPress={() => router.push('/profile/profile-detail')}
                     >
                        <View className="w-10 h-10 bg-gray-100 rounded-lg items-center justify-center mr-4">
                           <Ionicons name="person" size={22} color="black" />
                        </View>
                        <Text className="flex-1 text-base font-medium">
                           Personal Details
                        </Text>
                        <Ionicons
                           name="chevron-forward"
                           size={20}
                           color="black"
                        />
                     </TouchableOpacity>
                     <TouchableOpacity
                        className="flex-row items-center p-4 border-b border-gray-100"
                        onPress={() => router.push('/profile/profile-detail')}
                     >
                        <View className="w-10 h-10 bg-gray-100 rounded-lg items-center justify-center mr-4">
                           <Ionicons name="person" size={22} color="black" />
                        </View>
                        <Text className="flex-1 text-base font-medium">
                           Personal Details
                        </Text>
                        <Ionicons
                           name="chevron-forward"
                           size={20}
                           color="black"
                        />
                     </TouchableOpacity>
                  </View>
               </View>
            </CommonLayout>
         </SafeAreaView>
      </SafeAreaProvider>
   );
};

export default ProfileScreen;
